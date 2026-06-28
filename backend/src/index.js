export default {
    async fetch(request, env, ctx) {
        const db = env.DB;
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const json = async () => {
            try {
                return await request.json();
            } catch {
                return {};
            }
        };

        const getAdminPwd = async () => {
            const result = await db.prepare("SELECT value FROM settings WHERE key = 'admin_password'").first();
            return result ? result.value : '20041202';
        };

        const verifyAdmin = async (adminPwd) => {
            const correctPwd = await getAdminPwd();
            return adminPwd === correctPwd;
        };

        const response = (data, status = 200) => {
            return new Response(JSON.stringify(data), {
                status,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        };

        const errorResponse = (error, status = 400) => {
            return response({ success: false, error }, status);
        };

        const successResponse = (data = {}) => {
            return response({ success: true, ...data });
        };

        try {
            if (method === 'GET' && path === '/') {
                const matches = await db.prepare(
                    "SELECT g.id, g.player_id as pid, g.player_name as pName, g.goal, g.location, g.time, g.is_admin_added as isAdminAdded, g.status FROM goals g WHERE g.status = 'approved' ORDER BY g.created_at DESC"
                ).all();
                return response({ matches: matches.results });
            }

            if (method === 'GET' && path === '/players') {
                const players = await db.prepare(
                    "SELECT id, name, password, status, total_goals as totalGoals, total_matches as totalMatches FROM players WHERE status = 'approved' ORDER BY name ASC"
                ).all();
                return response(players.results);
            }

            if (method === 'GET' && path === '/allPlayers') {
                const players = await db.prepare(
                    "SELECT id, name, password, status, total_goals as totalGoals, total_matches as totalMatches FROM players ORDER BY created_at DESC"
                ).all();
                return response(players.results);
            }

            if (method === 'GET' && path === '/waitPlayers') {
                const players = await db.prepare(
                    "SELECT id, name, password, status FROM players WHERE status = 'pending' ORDER BY created_at ASC"
                ).all();
                return response(players.results);
            }

            if (method === 'POST' && path === '/addPlayer') {
                const body = await json();
                const { name, password } = body;
                if (!name || !password) {
                    return errorResponse('姓名和密码不能为空');
                }
                const existing = await db.prepare("SELECT id FROM players WHERE name = ?").bind(name).first();
                if (existing) {
                    return errorResponse('该姓名已存在');
                }
                await db.prepare("INSERT INTO players (name, password) VALUES (?, ?)").bind(name, password).run();
                return successResponse();
            }

            if (method === 'GET' && path === '/passPlayer') {
                const id = url.searchParams.get('id');
                if (!id) return errorResponse('缺少参数');
                await db.prepare("UPDATE players SET status = 'approved' WHERE id = ?").bind(id).run();
                return successResponse();
            }

            if (method === 'GET' && path === '/rejectPlayer') {
                const id = url.searchParams.get('id');
                if (!id) return errorResponse('缺少参数');
                await db.prepare("UPDATE players SET status = 'rejected' WHERE id = ?").bind(id).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/deletePlayer') {
                const body = await json();
                const { id, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                await db.prepare("DELETE FROM goals WHERE player_id = ?").bind(id).run();
                await db.prepare("DELETE FROM team_members WHERE player_id = ?").bind(id).run();
                await db.prepare("DELETE FROM votes WHERE player_id = ? OR candidate_id = ?").bind(id, id).run();
                await db.prepare("DELETE FROM signups WHERE player_id = ?").bind(id).run();
                await db.prepare("DELETE FROM teams WHERE captain_id = ?").bind(id).run();
                await db.prepare("DELETE FROM players WHERE id = ?").bind(id).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/revokePlayer') {
                const body = await json();
                const { id, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                await db.prepare("UPDATE players SET status = 'pending' WHERE id = ?").bind(id).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/setPlayerMatches') {
                const body = await json();
                const { id, matches: matchCount, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                await db.prepare("UPDATE players SET total_matches = ? WHERE id = ?").bind(matchCount, id).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/adminAddGoal') {
                const body = await json();
                const { id, add, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                const player = await db.prepare("SELECT name FROM players WHERE id = ?").bind(id).first();
                if (!player) return errorResponse('球员不存在');
                const now = new Date().toISOString();
                if (add > 0) {
                    await db.prepare(
                        "INSERT INTO goals (player_id, player_name, goal, location, time, status, is_admin_added) VALUES (?, ?, ?, ?, ?, 'approved', 1)"
                    ).bind(id, player.name, add, '管理员调整', now).run();
                } else if (add < 0) {
                    await db.prepare(
                        "INSERT INTO goals (player_id, player_name, goal, location, time, status, is_admin_added) VALUES (?, ?, ?, ?, ?, 'approved', 1)"
                    ).bind(id, player.name, add, '管理员调整', now).run();
                }
                return successResponse();
            }

            if (method === 'GET' && path === '/waitMatches') {
                const goals = await db.prepare(
                    "SELECT g.id, g.player_id as pid, g.player_name as pName, g.goal, g.location, g.time, g.status FROM goals g WHERE g.status = 'pending' ORDER BY g.created_at ASC"
                ).all();
                return response(goals.results);
            }

            if (method === 'POST' && path === '/addGoal') {
                const body = await json();
                const { pid, password, goal, location, time } = body;
                const player = await db.prepare("SELECT * FROM players WHERE id = ?").bind(pid).first();
                if (!player) return errorResponse('球员不存在');
                if (player.password !== password) return errorResponse('密码错误');
                if (player.status !== 'approved') return errorResponse('球员未通过审核');
                await db.prepare(
                    "INSERT INTO goals (player_id, player_name, goal, location, time, status) VALUES (?, ?, ?, ?, ?, 'pending')"
                ).bind(pid, player.name, goal, location, time).run();
                return successResponse();
            }

            if (method === 'GET' && path === '/passGoal') {
                const id = url.searchParams.get('id');
                if (!id) return errorResponse('缺少参数');
                const goal = await db.prepare("SELECT * FROM goals WHERE id = ?").bind(id).first();
                if (!goal) return errorResponse('进球记录不存在');
                await db.prepare("UPDATE goals SET status = 'approved' WHERE id = ?").bind(id).run();
                return successResponse();
            }

            if (method === 'GET' && path === '/rejectGoal') {
                const id = url.searchParams.get('id');
                if (!id) return errorResponse('缺少参数');
                await db.prepare("UPDATE goals SET status = 'rejected' WHERE id = ?").bind(id).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/undoGoal') {
                const body = await json();
                const { goalId, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                await db.prepare("DELETE FROM goals WHERE id = ?").bind(goalId).run();
                return successResponse();
            }

            if (method === 'GET' && path === '/getGoalMatchTimes') {
                const times = await db.prepare("SELECT time FROM goal_match_times ORDER BY time DESC").all();
                return response(times.results.map(t => t.time));
            }

            if (method === 'POST' && path === '/setGoalMatchTimes') {
                const body = await json();
                const { adminPwd, time, action } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                if (action === 'add') {
                    try {
                        await db.prepare("INSERT INTO goal_match_times (time) VALUES (?)").bind(time).run();
                    } catch (e) {
                        return errorResponse('该时间已存在');
                    }
                } else if (action === 'remove') {
                    await db.prepare("DELETE FROM goal_match_times WHERE time = ?").bind(time).run();
                }
                return successResponse();
            }

            if (method === 'GET' && path === '/getCurrentMatch') {
                const match = await db.prepare(
                    "SELECT id, time, location, status FROM matches WHERE status = 'active' ORDER BY created_at DESC LIMIT 1"
                ).first();
                return response({ match: match || null });
            }

            if (method === 'POST' && path === '/createMatch') {
                const body = await json();
                const { time, location, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                const existing = await db.prepare("SELECT id FROM matches WHERE status = 'active'").first();
                if (existing) return errorResponse('已有进行中的比赛');
                await db.prepare("INSERT INTO matches (time, location, status) VALUES (?, ?, 'active')").bind(time, location).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/endMatch') {
                const body = await json();
                const { adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                const match = await db.prepare("SELECT id FROM matches WHERE status = 'active'").first();
                if (!match) return errorResponse('没有进行中的比赛');
                await db.prepare("UPDATE matches SET status = 'ended' WHERE id = ?").bind(match.id).run();
                await db.prepare("DELETE FROM signups WHERE match_id = ?").bind(match.id).run();
                return successResponse();
            }

            if (method === 'GET' && path === '/getSignupList') {
                const match = await db.prepare("SELECT id FROM matches WHERE status = 'active'").first();
                if (!match) return response({ signups: [] });
                const signups = await db.prepare(
                    "SELECT s.id, s.player_id as id, s.player_name as name FROM signups s WHERE s.match_id = ? ORDER BY s.created_at ASC"
                ).bind(match.id).all();
                return response({ signups: signups.results });
            }

            if (method === 'POST' && path === '/signupMatch') {
                const body = await json();
                const { pid, password } = body;
                const player = await db.prepare("SELECT * FROM players WHERE id = ?").bind(pid).first();
                if (!player) return errorResponse('球员不存在');
                if (player.password !== password) return errorResponse('密码错误');
                if (player.status !== 'approved') return errorResponse('球员未通过审核');
                const match = await db.prepare("SELECT id FROM matches WHERE status = 'active'").first();
                if (!match) return errorResponse('没有进行中的比赛');
                try {
                    await db.prepare(
                        "INSERT INTO signups (match_id, player_id, player_name) VALUES (?, ?, ?)"
                    ).bind(match.id, pid, player.name).run();
                } catch (e) {
                    return errorResponse('你已经报名了');
                }
                return successResponse();
            }

            if (method === 'POST' && path === '/cancelSignup') {
                const body = await json();
                const { pid, password } = body;
                const player = await db.prepare("SELECT * FROM players WHERE id = ?").bind(pid).first();
                if (!player) return errorResponse('球员不存在');
                if (player.password !== password) return errorResponse('密码错误');
                const match = await db.prepare("SELECT id FROM matches WHERE status = 'active'").first();
                if (!match) return errorResponse('没有进行中的比赛');
                await db.prepare(
                    "DELETE FROM signups WHERE match_id = ? AND player_id = ?"
                ).bind(match.id, pid).run();
                return successResponse();
            }

            if (method === 'GET' && path === '/getApprovedTeams') {
                const teams = await db.prepare(
                    "SELECT * FROM teams WHERE status = 'approved' ORDER BY created_at DESC"
                ).all();
                const result = [];
                for (const team of teams.results) {
                    const members = await db.prepare(
                        "SELECT player_id as id, player_name as name, status FROM team_members WHERE team_id = ? AND status = 'approved' ORDER BY created_at ASC"
                    ).bind(team.id).all();
                    const pending = await db.prepare(
                        "SELECT player_id as id, player_name as name, status FROM team_members WHERE team_id = ? AND status != 'approved' ORDER BY created_at ASC"
                    ).bind(team.id).all();
                    result.push({
                        id: team.id,
                        name: team.name,
                        code: team.code,
                        captainId: team.captain_id,
                        captainName: team.captain_name,
                        status: team.status,
                        members: members.results,
                        pending: pending.results,
                    });
                }
                return response({ teams: result });
            }

            if (method === 'POST' && path === '/createTeam') {
                const body = await json();
                const { captainId, captainPwd, name, code } = body;
                const player = await db.prepare("SELECT * FROM players WHERE id = ?").bind(captainId).first();
                if (!player) return errorResponse('球员不存在');
                if (player.password !== captainPwd) return errorResponse('密码错误');
                if (player.status !== 'approved') return errorResponse('球员未通过审核');
                const existing = await db.prepare("SELECT id FROM teams WHERE name = ?").bind(name).first();
                if (existing) return errorResponse('小队名称已存在');
                const inTeam = await db.prepare(
                    "SELECT tm.id FROM team_members tm JOIN teams t ON tm.team_id = t.id WHERE tm.player_id = ? AND tm.status = 'approved' AND t.status = 'approved'"
                ).bind(captainId).first();
                if (inTeam) return errorResponse('你已经在一个小队中了');
                const info = await db.prepare(
                    "INSERT INTO teams (name, code, captain_id, captain_name, status) VALUES (?, ?, ?, ?, 'pending')"
                ).bind(name, code, captainId, player.name).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/joinTeam') {
                const body = await json();
                const { teamId, playerId, password, code } = body;
                const player = await db.prepare("SELECT * FROM players WHERE id = ?").bind(playerId).first();
                if (!player) return errorResponse('球员不存在');
                if (player.password !== password) return errorResponse('密码错误');
                if (player.status !== 'approved') return errorResponse('球员未通过审核');
                const team = await db.prepare("SELECT * FROM teams WHERE id = ?").bind(teamId).first();
                if (!team) return errorResponse('小队不存在');
                if (team.status !== 'approved') return errorResponse('小队未通过审核');
                if (team.code !== code) return errorResponse('进队码错误');
                const inTeam = await db.prepare(
                    "SELECT tm.id FROM team_members tm JOIN teams t ON tm.team_id = t.id WHERE tm.player_id = ? AND tm.status = 'approved' AND t.status = 'approved'"
                ).bind(playerId).first();
                if (inTeam) return errorResponse('你已经在一个小队中了');
                const existingApp = await db.prepare(
                    "SELECT id, status FROM team_members WHERE team_id = ? AND player_id = ?"
                ).bind(teamId, playerId).first();
                if (existingApp && existingApp.status === 'pending') return errorResponse('你已经申请过了，请等待审核');
                if (existingApp && existingApp.status === 'approved') return errorResponse('你已经是该小队成员了');
                if (existingApp) {
                    await db.prepare(
                        "UPDATE team_members SET status = 'pending' WHERE id = ?"
                    ).bind(existingApp.id).run();
                } else {
                    await db.prepare(
                        "INSERT INTO team_members (team_id, player_id, player_name, status) VALUES (?, ?, ?, 'pending')"
                    ).bind(teamId, playerId, player.name).run();
                }
                return successResponse({ message: '申请已提交，等待队长审核' });
            }

            if (method === 'POST' && path === '/approveJoin') {
                const body = await json();
                const { teamId, playerId, captainPwd } = body;
                const team = await db.prepare("SELECT * FROM teams WHERE id = ?").bind(teamId).first();
                if (!team) return errorResponse('小队不存在');
                const captain = await db.prepare("SELECT password FROM players WHERE id = ?").bind(team.captain_id).first();
                if (!captain || captain.password !== captainPwd) return errorResponse('队长密码错误');
                const inTeam = await db.prepare(
                    "SELECT id FROM team_members WHERE team_id = ? AND player_id = ? AND status = 'approved'"
                ).bind(teamId, playerId).first();
                if (inTeam) return errorResponse('该球员已是成员');
                await db.prepare(
                    "UPDATE team_members SET status = 'approved' WHERE team_id = ? AND player_id = ?"
                ).bind(teamId, playerId).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/rejectJoin') {
                const body = await json();
                const { teamId, playerId, captainPwd } = body;
                const team = await db.prepare("SELECT * FROM teams WHERE id = ?").bind(teamId).first();
                if (!team) return errorResponse('小队不存在');
                const captain = await db.prepare("SELECT password FROM players WHERE id = ?").bind(team.captain_id).first();
                if (!captain || captain.password !== captainPwd) return errorResponse('队长密码错误');
                await db.prepare(
                    "UPDATE team_members SET status = 'rejected' WHERE team_id = ? AND player_id = ?"
                ).bind(teamId, playerId).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/kickMember') {
                const body = await json();
                const { teamId, playerId, captainPwd } = body;
                const team = await db.prepare("SELECT * FROM teams WHERE id = ?").bind(teamId).first();
                if (!team) return errorResponse('小队不存在');
                const captain = await db.prepare("SELECT password FROM players WHERE id = ?").bind(team.captain_id).first();
                if (!captain || captain.password !== captainPwd) return errorResponse('队长密码错误');
                if (team.captain_id == playerId) return errorResponse('不能踢出队长');
                await db.prepare(
                    "DELETE FROM team_members WHERE team_id = ? AND player_id = ?"
                ).bind(teamId, playerId).run();
                return successResponse();
            }

            if (method === 'GET' && path === '/getPendingTeams') {
                const teams = await db.prepare(
                    "SELECT id, name, captain_id as captainId, captain_name as captainName, status FROM teams WHERE status = 'pending' ORDER BY created_at DESC"
                ).all();
                return response({ teams: teams.results });
            }

            if (method === 'POST' && path === '/approveTeam') {
                const body = await json();
                const { teamId, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                const team = await db.prepare("SELECT * FROM teams WHERE id = ?").bind(teamId).first();
                if (!team) return errorResponse('小队不存在');
                await db.prepare("UPDATE teams SET status = 'approved' WHERE id = ?").bind(teamId).run();
                await db.prepare(
                    "INSERT OR IGNORE INTO team_members (team_id, player_id, player_name, status) VALUES (?, ?, ?, 'approved')"
                ).bind(teamId, team.captain_id, team.captain_name).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/rejectTeam') {
                const body = await json();
                const { teamId, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                await db.prepare("UPDATE teams SET status = 'rejected' WHERE id = ?").bind(teamId).run();
                return successResponse();
            }

            if (method === 'GET' && path === '/getMyTeamAndApplications') {
                const playerId = url.searchParams.get('playerId');
                if (!playerId) return errorResponse('缺少参数');
                let team = null;
                const myTeamMember = await db.prepare(
                    "SELECT t.id, t.name, t.code, t.captain_id as captainId, t.captain_name as captainName, t.status FROM team_members tm JOIN teams t ON tm.team_id = t.id WHERE tm.player_id = ? AND tm.status = 'approved' AND t.status = 'approved' LIMIT 1"
                ).bind(playerId).first();
                if (myTeamMember) {
                    const members = await db.prepare(
                        "SELECT player_id as id, player_name as name, status FROM team_members WHERE team_id = ? AND status = 'approved' ORDER BY created_at ASC"
                    ).bind(myTeamMember.id).all();
                    const pending = await db.prepare(
                        "SELECT player_id as id, player_name as name, status FROM team_members WHERE team_id = ? AND status != 'approved' ORDER BY created_at ASC"
                    ).bind(myTeamMember.id).all();
                    team = {
                        ...myTeamMember,
                        members: members.results,
                        pending: pending.results,
                    };
                }
                const applications = await db.prepare(
                    "SELECT t.id as teamId, t.name as teamName, tm.status FROM team_members tm JOIN teams t ON tm.team_id = t.id WHERE tm.player_id = ? AND t.status = 'approved' AND tm.status != 'approved' ORDER BY tm.created_at DESC"
                ).bind(playerId).all();
                return response({ team, applications: applications.results });
            }

            if (method === 'GET' && path === '/vote') {
                const players = await db.prepare(
                    "SELECT id, name FROM players WHERE status = 'approved' ORDER BY name ASC"
                ).all();
                const votes = await db.prepare(
                    "SELECT candidate_id, COUNT(*) as count FROM votes GROUP BY candidate_id"
                ).all();
                const voteMap = {};
                votes.results.forEach(v => {
                    voteMap[v.candidate_id] = v.count;
                });
                const titleResult = await db.prepare("SELECT value FROM settings WHERE key = 'vote_title'").first();
                return response({
                    title: titleResult ? titleResult.value : '最佳球员投票',
                    options: players.results,
                    votes: voteMap,
                });
            }

            if (method === 'POST' && path === '/vote') {
                const body = await json();
                const { playerId, password, candidateId } = body;
                const player = await db.prepare("SELECT * FROM players WHERE id = ?").bind(playerId).first();
                if (!player) return errorResponse('球员不存在');
                if (player.password !== password) return errorResponse('密码错误');
                if (player.status !== 'approved') return errorResponse('球员未通过审核');
                const candidate = await db.prepare("SELECT id FROM players WHERE id = ?").bind(candidateId).first();
                if (!candidate) return errorResponse('候选人不存在');
                const existing = await db.prepare("SELECT id FROM votes WHERE player_id = ?").bind(playerId).first();
                if (existing) {
                    await db.prepare(
                        "UPDATE votes SET candidate_id = ? WHERE player_id = ?"
                    ).bind(candidateId, playerId).run();
                } else {
                    await db.prepare(
                        "INSERT INTO votes (player_id, candidate_id) VALUES (?, ?)"
                    ).bind(playerId, candidateId).run();
                }
                return successResponse();
            }

            if (method === 'POST' && path === '/setVoteTitle') {
                const body = await json();
                const { title, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                await db.prepare(
                    "INSERT INTO settings (key, value) VALUES ('vote_title', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
                ).bind(title).run();
                return successResponse();
            }

            if (method === 'POST' && path === '/resetVote') {
                const body = await json();
                const { adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                await db.prepare("DELETE FROM votes").run();
                return successResponse();
            }

            if (method === 'GET' && path === '/getReward') {
                const result = await db.prepare("SELECT value FROM settings WHERE key = 'reward'").first();
                return response({ content: result ? result.value : '' });
            }

            if (method === 'POST' && path === '/setReward') {
                const body = await json();
                const { content, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                await db.prepare(
                    "INSERT INTO settings (key, value) VALUES ('reward', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
                ).bind(content).run();
                return successResponse();
            }

            if (method === 'GET' && path === '/getCustomTitle') {
                const result = await db.prepare("SELECT value FROM settings WHERE key = 'custom_title'").first();
                return response({ title: result ? result.value : '' });
            }

            if (method === 'POST' && path === '/setCustomTitle') {
                const body = await json();
                const { title, adminPwd } = body;
                if (!(await verifyAdmin(adminPwd))) return errorResponse('管理员密码错误');
                await db.prepare(
                    "INSERT INTO settings (key, value) VALUES ('custom_title', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
                ).bind(title).run();
                return successResponse();
            }

            return errorResponse('接口不存在', 404);
        } catch (error) {
            console.error('Error:', error);
            return errorResponse('服务器内部错误: ' + error.message, 500);
        }
    },
};
