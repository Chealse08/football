// 深鸡蛋坪山公园球王榜 - 组队功能模块

import { api } from './api.js';
import { ADMIN_PWD, TEAM_MAX_MEMBERS } from './config.js';
import { showMsg, closeModalAll, closeModal } from './main.js';
import { getGlobalLoginState } from './auth.js';

let currentTeamId = null;

export async function loadTeamContent() {
    await loadCurrentMatch();
    await loadSignupList();
    await loadTeamList();
    await loadMyTeamAndApplications();

    const { isAdminLoggedIn } = await import('./admin.js');
    if (isAdminLoggedIn) {
        document.getElementById("adminMatchControls").classList.remove("hide");
    }
}

export async function loadCurrentMatch() {
    try {
        const d = await api.getCurrentMatch();
        if (d.match) {
            const time = new Date(d.match.time).toLocaleString();
            document.getElementById("currentMatch").innerHTML = `
                <p><strong>时间：</strong>${time}</p>
                <p><strong>地点：</strong>${d.match.location}</p>
                <p><strong>状态：</strong>进行中</p>
            `;
        } else {
            document.getElementById("currentMatch").innerHTML = "<p>暂无进行中的比赛</p>";
        }
    } catch (e) {
        document.getElementById("currentMatch").innerHTML = "<p>加载失败</p>";
    }
}

export async function createMatch() {
    const time = document.getElementById("matchTimeInput").value;
    const location = document.getElementById("matchLocationInput").value.trim();
    if (!time || !location) {
        showMsg("请填写时间和地点", false);
        return;
    }
    const d = await api.createMatch(time, location, ADMIN_PWD);
    showMsg(d.success ? "比赛创建成功" : d.error, d.success);
    if (d.success) loadTeamContent();
}

export async function endMatch() {
    if (!confirm("确定结束当前比赛？所有报名和小队将清空")) return;
    const d = await api.endMatch(ADMIN_PWD);
    showMsg(d.success ? "比赛已结束" : d.error, d.success);
    if (d.success) loadTeamContent();
}

export async function loadSignupList() {
    try {
        const d = await api.getSignupList();
        document.getElementById("signupCount").innerText = `已报名：${d.signups.length}/${TEAM_MAX_MEMBERS}人`;
        let h = "";
        const { currentPlayerId } = getGlobalLoginState();
        d.signups.forEach((p, i) => {
            h += `<div class="signup-item">${i + 1}. ${p.name} ${p.id == currentPlayerId ? "(我)" : ""}</div>`;
        });
        document.getElementById("signupList").innerHTML = h || "<p>暂无报名</p>";
    } catch (e) {
        document.getElementById("signupList").innerHTML = "<p>加载失败</p>";
    }
}

export async function signupMatch() {
    const { currentPlayerId, currentPlayerPwd } = getGlobalLoginState();
    if (!currentPlayerId) {
        showMsg("请先验证身份", false);
        return;
    }
    const d = await api.signupMatch(currentPlayerId, currentPlayerPwd);
    showMsg(d.success ? "报名成功" : d.error, d.success);
    if (d.success) loadTeamContent();
}

export async function cancelSignup() {
    const { currentPlayerId, currentPlayerPwd } = getGlobalLoginState();
    if (!currentPlayerId) {
        showMsg("请先验证身份", false);
        return;
    }
    const d = await api.cancelSignup(currentPlayerId, currentPlayerPwd);
    showMsg(d.success ? "已取消报名" : d.error, d.success);
    if (d.success) loadTeamContent();
}

export async function loadTeamList() {
    try {
        const d = await api.getApprovedTeams();
        const { currentPlayerId } = getGlobalLoginState();
        let h = "";
        d.teams.forEach(team => {
            let myStatus = "";
            const isMember = team.members.some(m => m.id == currentPlayerId);
            const myApp = team.pending.find(p => p.id == currentPlayerId);

            if (isMember) {
                myStatus = '<span class="status-approved">你已加入该小队</span>';
            } else if (myApp) {
                if (myApp.status === 'pending') {
                    myStatus = '<span class="status-pending">你的申请：审核中</span>';
                } else if (myApp.status === 'rejected') {
                    myStatus = '<span class="status-rejected">你的申请：已被拒绝</span>';
                }
            }

            h += `
            <div class="team-card">
                <div class="team-header">
                    <h4>${team.name}</h4>
                    <span>队长：${team.captainName}</span>
                </div>
                <div class="team-members">
                    <p>成员（${team.members.length}人）：${team.members.map(m => m.name).join("、") || "暂无"}</p>
                    ${team.pending.filter(p => p.status === 'pending').length > 0 ? `
                        <p style="margin-top:5px;color:#666;">待审核：${team.pending.filter(p => p.status === 'pending').map(p => p.name).join("、")}</p>
                    ` : ""}
                </div>
                ${myStatus ? `<p style="margin-top:8px;">${myStatus}</p>` : ""}
                ${!isMember && (!myApp || myApp.status === 'rejected') ? `
                    <button class="btn-blue" onclick="openJoinTeamModal(${team.id})">申请加入</button>
                ` : ""}
            </div>
            `;
        });
        document.getElementById("teamList").innerHTML = h || "<p>暂无已通过的小队</p>";
    } catch (e) {
        document.getElementById("teamList").innerHTML = "<p>加载失败</p>";
    }
}

export function openCreateTeamModal() {
    closeModalAll();
    document.getElementById("createTeamModal").classList.remove("hide");
}

export async function submitCreateTeam() {
    const { currentPlayerId, currentPlayerPwd } = getGlobalLoginState();
    if (!currentPlayerId) {
        showMsg("请先验证身份", false);
        return;
    }
    const name = document.getElementById("teamName").value.trim();
    const code = document.getElementById("teamCode").value.trim();
    if (!name || code.length !== 4) {
        showMsg("请填写小队名称和4位进队码", false);
        return;
    }
    const d = await api.createTeam(currentPlayerId, currentPlayerPwd, name, code);
    showMsg(d.success ? "申请已提交，等待管理员审核" : d.error, d.success);
    if (d.success) {
        closeModal('createTeamModal');
        loadTeamContent();
    }
}

export function openJoinTeamModal(teamId) {
    currentTeamId = teamId;
    closeModalAll();
    document.getElementById("joinTeamModal").classList.remove("hide");
}

export async function submitJoinTeam() {
    const { currentPlayerId, currentPlayerPwd } = getGlobalLoginState();
    if (!currentPlayerId) {
        showMsg("请先验证身份", false);
        return;
    }
    const code = document.getElementById("joinTeamCode").value.trim();
    const d = await api.joinTeam(currentTeamId, currentPlayerId, currentPlayerPwd, code);
    showMsg(d.success ? d.message : d.error, d.success);
    if (d.success) {
        closeModal('joinTeamModal');
        loadTeamContent();
    }
}

export async function loadMyTeamAndApplications() {
    try {
        const { currentPlayerId } = getGlobalLoginState();
        if (!currentPlayerId) {
            document.getElementById("myTeamSection").classList.add("hide");
            return;
        }

        const d = await api.getMyTeamAndApplications(currentPlayerId);
        let html = "";

        if (d.team) {
            html += `<h4>我的小队：${d.team.name}</h4>`;
            html += `<p>进队码：${d.team.code}</p>`;

            let membersHtml = d.team.members.map(m => `
                <div style="padding:5px 0;">
                    ${m.name}
                    ${d.team.captainId !== m.id && d.team.captainId == currentPlayerId ?
                        `<button class="btn-red" onclick="kickMember('${d.team.id}','${m.id}')">踢出</button>` :
                        (m.id == currentPlayerId ? "(我/队长)" : "")}
                </div>
            `).join("");
            html += `<div style="margin-top:10px;"><h5>成员列表</h5>${membersHtml}</div>`;

            if (d.team.captainId == currentPlayerId && d.team.pending.filter(p => p.status === 'pending').length > 0) {
                let pendingHtml = `
                <div style="margin-top:15px;">
                    <h5>待审核申请</h5>
                    ${d.team.pending.filter(p => p.status === 'pending').map(p => `
                        <div style="padding:5px 0;">
                            ${p.name}
                            <button class="btn-green" onclick="approveJoin('${d.team.id}','${p.id}')">通过</button>
                            <button class="btn-red" onclick="rejectJoin('${d.team.id}','${p.id}')">拒绝</button>
                        </div>
                    `).join("")}
                </div>
                `;
                html += pendingHtml;
            }
        }

        if (d.applications && d.applications.length > 0) {
            html += `<div style="margin-top:20px;"><h4>我的申请记录</h4>`;
            d.applications.forEach(app => {
                let statusClass = app.status === 'pending' ? 'status-pending' : 'status-rejected';
                let statusText = app.status === 'pending' ? '审核中' : '已被拒绝';
                html += `<div style="padding:5px 0;">${app.teamName}：<span class="${statusClass}">${statusText}</span></div>`;
            });
            html += `</div>`;
        }

        if (html) {
            document.getElementById("myTeamSection").classList.remove("hide");
            document.getElementById("myTeamInfo").innerHTML = html;
        } else {
            document.getElementById("myTeamSection").classList.add("hide");
        }
    } catch (e) {
        document.getElementById("myTeamSection").classList.add("hide");
    }
}

export async function approveJoin(teamId, playerId) {
    const pwd = prompt("请输入你的球员密码（队长密码）：");
    if (!pwd || pwd.length !== 2) {
        showMsg("密码错误", false);
        return;
    }
    const d = await api.approveJoin(teamId, playerId, pwd);
    showMsg(d.success ? "已通过申请" : d.error, d.success);
    if (d.success) loadTeamContent();
}

export async function rejectJoin(teamId, playerId) {
    const pwd = prompt("请输入你的球员密码（队长密码）：");
    if (!pwd || pwd.length !== 2) {
        showMsg("密码错误", false);
        return;
    }
    const d = await api.rejectJoin(teamId, playerId, pwd);
    showMsg(d.success ? "已拒绝申请" : d.error, d.success);
    if (d.success) loadTeamContent();
}

export async function kickMember(teamId, playerId) {
    if (!confirm("确定踢出该成员？")) return;
    const pwd = prompt("请输入你的球员密码（队长密码）：");
    if (!pwd || pwd.length !== 2) {
        showMsg("密码错误", false);
        return;
    }
    const d = await api.kickMember(teamId, playerId, pwd);
    showMsg(d.success ? "已踢出成员" : d.error, d.success);
    if (d.success) loadTeamContent();
}

export { currentTeamId };
