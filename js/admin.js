import { api } from './api.js';
import { ADMIN_PWD } from './config.js';
import { showMsg } from './main.js';

export let isAdminLoggedIn = false;

export function adminLogin() {
    const p = document.getElementById("adminPwd").value.trim();
    if (p === ADMIN_PWD) {
        isAdminLoggedIn = true;
        document.getElementById("adminPanel").classList.remove("hide");
        document.getElementById("adminRewardEdit").classList.remove("hide");
        showMsg("管理员登录成功", true);
        renderAll();
        renderPendingTeams();
    } else {
        showMsg("密码错误", false);
    }
}

export async function setPlayerMatches(playerId) {
    const v = prompt("请输入该球员的场次：", "0");
    if (v === null || v === "" || isNaN(v)) return;
    const d = await api.setPlayerMatches(playerId, parseInt(v), ADMIN_PWD);
    showMsg(d.success ? "场次设置成功" : "失败", d.success);
    if (d.success) renderAll();
}

// ✅ 修改1：支持管理员加减进球（正数加，负数减）
export async function adminAddGoal(playerId) {
    const add = prompt("请输入要调整的进球数（正数加，负数减）：", "1");
    if (add === null || add === "" || isNaN(add)) return;
    const d = await api.adminAddGoal(playerId, parseInt(add), ADMIN_PWD);
    showMsg(d.success ? "进球调整成功" : "失败", d.success);
    if (d.success) renderAll();
}

export async function passPlayer(id) {
    await api.passPlayer(id);
    showMsg("球员审核通过", true);
    renderAll();
}

export async function rejectPlayer(id) {
    await api.rejectPlayer(id);
    showMsg("球员申请已驳回", true);
    renderAll();
}

export async function deletePlayer(id) {
    if (!confirm("确定删除球员？")) return;
    const d = await api.deletePlayer(id, ADMIN_PWD);
    showMsg(d.success ? "已删除" : "失败", d.success);
    if (d.success) renderAll();
}

export async function revokePlayerApproval(id) {
    if (!confirm("确定撤销认证？")) return;
    const d = await api.revokePlayer(id, ADMIN_PWD);
    showMsg(d.success ? "已撤销" : "失败", d.success);
    if (d.success) renderAll();
}

export async function undoGoal(goalId) {
    if (!confirm("确定撤销该进球？")) return;
    const j = await api.undoGoal(goalId, ADMIN_PWD);
    showMsg(j.success ? "进球已撤销" : j.error, j.success);
    if (j.success) {
        renderPassedGoals();
        renderRank();
    }
}

export async function passGoal(id) {
    await api.passGoal(id);
    showMsg("进球通过", true);
    renderWaitGoal();
    renderPassedGoals();
    renderRank();
}

export async function rejectGoal(id) {
    await api.rejectGoal(id);
    showMsg("进球驳回", true);
    renderWaitGoal();
}

export async function renderAll() {
    renderRegisteredPlayers();
    renderWaitPlayer();
    renderWaitGoal();
    renderPassedGoals();
    renderPlayerSelect();
    renderRank();
}

export async function renderRegisteredPlayers() {
    try {
        const list = await api.getAllPlayers();
        let h = list.length ? "" : "<p>暂无球员</p>";
        list.forEach(it => {
            const st = it.status === "approved" ? "已认证" : "待审核";
            h += `
            <div style="padding:10px;border-bottom:1px solid #eee;">
                ${it.name}｜密码：${it.password}｜进球：${it.totalGoals||0}｜场次：${it.totalMatches||0}｜状态：${st}
                <div style="margin-top:8px;">
                    <button class="btn-blue" onclick="adminAddGoal(${it.id})">调整进球</button>
                    <button class="btn-green" onclick="setPlayerMatches(${it.id})">设置场次</button>
                    ${it.status==="approved"?`<button class="btn-yellow" onclick="revokePlayerApproval(${it.id})">撤销认证</button>`:""}
                    <button class="btn-red" onclick="deletePlayer(${it.id})">删除</button>
                </div>
            </div>`;
        });
        document.getElementById("registeredPlayersList").innerHTML = h;
    } catch (e) {
        document.getElementById("registeredPlayersList").innerHTML = "<p>加载失败</p>";
    }
}

export async function renderPlayerSelect() {
    try {
        const list = await api.getPlayers();
        let h = `<option value="">请选择</option>`;
        list.forEach(it => h += `<option value="${it.id}">${it.name}</option>`);
        document.getElementById("playerSelect").innerHTML = h;
    } catch (e) {}
}

export async function renderWaitPlayer() {
    try {
        const list = await api.getWaitPlayers();
        let h = list.length ? "" : "<p>暂无</p>";
        list.forEach(it => {
            h += `<div style="padding:8px;border-bottom:1px solid #eee;">${it.name}
                <button class="btn-green" onclick="passPlayer(${it.id})">通过</button>
                <button class="btn-red" onclick="rejectPlayer(${it.id})">驳回</button>
            </div>`;
        });
        document.getElementById("waitPlayerList").innerHTML = h;
    } catch (e) {
        document.getElementById("waitPlayerList").innerHTML = "<p>暂无</p>";
    }
}

export async function renderWaitGoal() {
    try {
        const list = await api.getWaitMatches();
        let h = list.length ? "" : "<p>暂无待审核进球</p>";
        list.forEach(it => {
            const t = new Date(it.time).toLocaleString();
            h += `<div style="padding:8px;border-bottom:1px solid #eee;">${it.pName} ${it.goal}球 ${t}
                <button class="btn-green" onclick="passGoal(${it.id})">通过</button>
                <button class="btn-red" onclick="rejectGoal(${it.id})">驳回</button>
            </div>`;
        });
        document.getElementById("waitGoalList").innerHTML = h;
    } catch (e) {
        document.getElementById("waitGoalList").innerHTML = "<p>暂无</p>";
    }
}

export async function renderPassedGoals() {
    try {
        const data = await api.getRankData();
        const list = data.matches || [];
        let h = list.length ? "" : "<p>暂无已通过进球</p>";
        list.slice(0,60).forEach(it=>{
            let txt = `${it.pName} ${it.goal}球 ${new Date(it.time).toLocaleString()}`;
            if(it.isAdminAdded) txt += " <span style='color:orange;font-size:12px'>管理员调整</span>";
            h += `<div style="padding:6px;border-bottom:1px solid #eee;">
                ${txt}
                ${isAdminLoggedIn?`<button class="btn-red" onclick="undoGoal(${it.id})">撤销</button>`:""}
            </div>`;
        });
        document.getElementById("passedGoalsList").innerHTML = h;
    } catch (e) {
        document.getElementById("passedGoalsList").innerHTML = "<p>加载失败</p>";
    }
}

// ✅ 修改2：射手榜去掉场次，显示总进球（含管理员调整）
export async function renderRank() {
    try {
        const data = await api.getRankData();
        const allPlayers = await api.getPlayers();
        const matches = data.matches || [];

        // 统计所有进球（包括管理员调整的）
        const playerGoals = {};
        allPlayers.forEach(player => {
            playerGoals[player.name] = 0;
        });

        matches.forEach(it => {
            if (playerGoals.hasOwnProperty(it.pName)) {
                playerGoals[it.pName] += it.goal;
            }
        });

        // 按进球数降序排序
        const sorted = Object.entries(playerGoals)
            .map(([name, goals]) => ({ name, goals }))
            .sort((a, b) => b.goals - a.goals);

        let h = "";
        sorted.forEach((p, i) => {
            const rankClass = i === 0 ? "rank-1" : i === 1 ? "rank-2" : i === 2 ? "rank-3" : "";
            h += `<div style="padding:8px 0;border-bottom:1px solid #eee;">
                <span class="${rankClass}">${i + 1}. ${p.name}</span>
                <span style="float:right;">进球：${p.goals}</span>
            </div>`;
        });

        document.getElementById("rankList").innerHTML = h || "<p>暂无数据</p>";
    } catch (e) {
        document.getElementById("rankList").innerHTML = "<p>加载失败</p>";
    }
}

export async function renderPendingTeams() {
    try {
        const d = await api.getPendingTeams();
        let h = "";
        d.teams.forEach(team=>{
            h += `<div style="padding:8px 0;border-bottom:1px solid #eee;">
                ${team.name} 队长:${team.captainName}
                <button class="btn-green" onclick="approveTeam(${team.id})">通过</button>
                <button class="btn-red" onclick="rejectTeam(${team.id})">拒绝</button>
            </div>`;
        });
        document.getElementById("pendingTeamsList").innerHTML = h||"<p>暂无</p>";
    } catch (e) {
        document.getElementById("pendingTeamsList").innerHTML = "<p>暂无</p>";
    }
}

export async function approveTeam(teamId) {
    const d = await api.approveTeam(teamId,ADMIN_PWD);
    showMsg(d.success?"小队已通过":d.error,d.success);
    if(d.success) renderPendingTeams();
}
export async function rejectTeam(teamId) {
    const d = await api.rejectTeam(teamId,ADMIN_PWD);
    showMsg(d.success?"已拒绝":d.error,d.success);
    if(d.success) renderPendingTeams();
}
