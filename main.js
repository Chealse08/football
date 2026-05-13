// 深鸡蛋坪山公园球王榜 - 主入口模块

import { api } from './api.js';
import { initGlobalLogin, globalLogin, globalLogout, teamPageLogout, votePageLogout, getGlobalLoginState } from './auth.js';
import { loadTeamContent, signupMatch, cancelSignup, createMatch, endMatch, openCreateTeamModal, submitCreateTeam, submitJoinTeam, approveJoin, rejectJoin, kickMember } from './team.js';
import { renderVote, submitVote, setVoteTitle, resetVote, selectVoteOption } from './vote.js';
import { adminLogin, isAdminLoggedIn, renderAll, renderPendingTeams, renderRank, renderPlayerSelect, renderPassedGoals, renderWaitGoal, renderWaitPlayer, passPlayer, rejectPlayer, deletePlayer, revokePlayerApproval, passGoal, rejectGoal, undoGoal, setPlayerMatches, adminAddGoal, approveTeam, rejectTeam } from './admin.js';

export function showMsg(text, isOk) {
    const msgText = document.getElementById("msgText");
    msgText.innerText = text;
    msgText.className = isOk ? "msg-text msg-success" : "msg-text msg-error";
    document.getElementById("msgModal").classList.remove("hide");
}

export function closeMsgModal() {
    document.getElementById("msgModal").classList.add("hide");
}

export function closeModal(id) {
    document.getElementById(id).classList.add("hide");
}

export function closeModalAll() {
    document.querySelectorAll(".modal").forEach(m => m.classList.add("hide"));
}

export function openModal(id) {
    closeModalAll();
    document.getElementById(id).classList.remove("hide");
}

export function updatePageAuthStatus() {
    const { globalLoggedInPlayer } = getGlobalLoginState();
    
    const teamLoggedInSection = document.getElementById("teamLoggedInSection");
    const teamLoggedInPlayerName = document.getElementById("teamLoggedInPlayerName");
    const teamContentSection = document.getElementById("teamContentSection");
    const teamNotLoggedInSection = document.getElementById("teamNotLoggedInSection");
    
    if (teamLoggedInSection && globalLoggedInPlayer) {
        teamLoggedInSection.classList.remove("hide");
        if (teamLoggedInPlayerName) teamLoggedInPlayerName.innerText = globalLoggedInPlayer.name;
    }
    
    const voteLoggedInSection = document.getElementById("voteLoggedInSection");
    const voteLoggedInPlayerName = document.getElementById("voteLoggedInPlayerName");
    const voteContentSection = document.getElementById("voteContentSection");
    const voteNotLoggedInSection = document.getElementById("voteNotLoggedInSection");
    
    if (voteLoggedInSection && globalLoggedInPlayer) {
        voteLoggedInSection.classList.remove("hide");
        if (voteLoggedInPlayerName) voteLoggedInPlayerName.innerText = globalLoggedInPlayer.name;
    }
}

export async function showPage(pageName) {
    document.getElementById("mainPage").classList.add("hide");
    document.getElementById("rankPage").classList.add("hide");
    document.getElementById("teamPage").classList.add("hide");
    document.getElementById("rewardPage").classList.add("hide");
    document.getElementById("votePage").classList.add("hide");
    document.getElementById("adminPage").classList.add("hide");
    document.querySelectorAll(".nav button").forEach(b => b.className = "btn-gray");
    document.querySelectorAll(".nav button").forEach(b => {
        if (b.getAttribute("data-page") === pageName) {
            b.className = "btn-blue active";
        }
    });
    document.getElementById(pageName + "Page").classList.remove("hide");

    const { globalLoggedInPlayer } = getGlobalLoginState();

    if (pageName === "rank") {
        renderRank();
    }
    if (pageName === "reward") {
        loadReward();
    }
    if (pageName === "vote") {
        if (globalLoggedInPlayer) {
            document.getElementById("voteNotLoggedInSection").classList.add("hide");
            document.getElementById("voteLoggedInSection").classList.remove("hide");
            document.getElementById("voteLoggedInPlayerName").innerText = globalLoggedInPlayer.name;
            document.getElementById("voteContentSection").classList.remove("hide");
            await renderVote();
        } else {
            document.getElementById("voteNotLoggedInSection").classList.remove("hide");
            document.getElementById("voteLoggedInSection").classList.add("hide");
            document.getElementById("voteContentSection").classList.add("hide");
        }
    }
    if (pageName === "admin") {
        renderAll();
        renderPendingTeams();
    }
    if (pageName === "team") {
        if (globalLoggedInPlayer) {
            document.getElementById("teamNotLoggedInSection").classList.add("hide");
            document.getElementById("teamLoggedInSection").classList.remove("hide");
            document.getElementById("teamLoggedInPlayerName").innerText = globalLoggedInPlayer.name;
            document.getElementById("teamContentSection").classList.remove("hide");
            await loadTeamContent();
        } else {
            document.getElementById("teamNotLoggedInSection").classList.remove("hide");
            document.getElementById("teamLoggedInSection").classList.add("hide");
            document.getElementById("teamContentSection").classList.add("hide");
        }
    }
}

export async function loadCustomTitle() {
    try {
        const d = await api.getCustomTitle();
        if (d.title) {
            document.getElementById("pageTitle").innerText = d.title;
            document.getElementById("mainTitle").innerText = "⚽ " + d.title;
        }
    } catch (e) { }
}

export async function saveCustomTitle() {
    const t = document.getElementById("customTitleInput").value.trim();
    if (!t) {
        showMsg("请输入标题", false);
        return;
    }
    const d = await api.setCustomTitle(t, "20041202");
    showMsg(d.success ? "标题已修改" : d.error, d.success);
    if (d.success) loadCustomTitle();
}

export async function loadReward() {
    try {
        const d = await api.getReward();
        document.getElementById("rewardContent").innerText = d.content || "暂无奖励规则";
        document.getElementById("rewardInput").value = d.content || "";
        if (isAdminLoggedIn) {
            document.getElementById("adminRewardEdit").classList.remove("hide");
        }
    } catch (e) {
        document.getElementById("rewardContent").innerText = "加载失败";
    }
}

export async function saveReward() {
    const content = document.getElementById("rewardInput").value.trim();
    const d = await api.setReward(content, "20041202");
    showMsg(d.success ? "奖励规则已保存" : d.error, d.success);
    if (d.success) loadReward();
}

export function openRegisterModal() {
    openModal("registerModal");
}

export async function loadGoalMatchTimes() {
    try {
        const list = await api.getGoalMatchTimes();
        const sel = document.getElementById("matchTimeSelect");
        sel.innerHTML = '<option value="">请选择比赛时间</option>';
        list.forEach(t => {
            const s = new Date(t).toLocaleString();
            sel.innerHTML += `<option value="${t}">${s}</option>`;
        });
    } catch (e) {
        console.error("加载比赛时间失败:", e);
    }
}

export function openGoalModal() {
    const selectedPlayerId = document.getElementById("playerSelect").value;
    if (!selectedPlayerId) {
        showMsg("请先选择球员", false);
        return;
    }
    const name = document.getElementById("playerSelect").selectedOptions[0].text.split(" ")[0];
    document.getElementById("selectedPlayerName").innerText = "球员：" + name;
    loadGoalMatchTimes();
    openModal("goalModal");
}

export async function addGoalMatchTime() {
    const t = document.getElementById("goalMatchTimeInput").value;
    if (!t) {
        showMsg("请选择时间", false);
        return;
    }
    const j = await api.setGoalMatchTimes("20041202", t, "add");
    showMsg(j.success ? "添加成功" : j.error, j.success);
    renderGoalMatchTimeList();
    loadGoalMatchTimes();
}

export async function removeGoalMatchTime(t) {
    const j = await api.setGoalMatchTimes("20041202", t, "remove");
    showMsg(j.success ? "删除成功" : j.error, j.success);
    renderGoalMatchTimeList();
    loadGoalMatchTimes();
}

export async function renderGoalMatchTimeList() {
    try {
        const list = await api.getGoalMatchTimes();
        const dom = document.getElementById("goalMatchTimeList");
        let h = "";
        list.forEach(t => {
            const s = new Date(t).toLocaleString();
            h += `<div style="padding:6px 0;">${s} <button class="btn-red" onclick="removeGoalMatchTime('${t}')">删除</button></div>`;
        });
        dom.innerHTML = h || "<p>未设置时间</p>";
    } catch (e) {
        document.getElementById("goalMatchTimeList").innerHTML = "<p>加载失败</p>";
    }
}

export async function submitNewPlayer() {
    const n = document.getElementById("registerName").value.trim();
    const p = document.getElementById("registerPwd").value.trim();
    if (!n || p.length !== 2 || !/^\d\d$/.test(p)) {
        showMsg("请输入姓名和2位数字密码", false);
        return;
    }
    const j = await api.addPlayer(n, p);
    showMsg(j.success ? "注册成功，等待管理员审核！" : j.error, j.success);
    if (j.success) {
        closeModal("registerModal");
        document.getElementById("registerName").value = "";
        document.getElementById("registerPwd").value = "";
    }
}

export async function submitGoalRecord() {
    const pwd = document.getElementById("playerPwd").value.trim();
    const g = parseInt(document.getElementById("goalNum").value);
    const loc = document.getElementById("matchLocation").value.trim() || "未填写";
    const t = document.getElementById("matchTimeSelect").value;
    if (pwd.length !== 2 || !/^\d\d$/.test(pwd)) {
        showMsg("请输入正确的2位密码", false);
        return;
    }
    if (!g || g < 1 || !t) {
        showMsg("进球数和比赛时间为必填项", false);
        return;
    }
    const selectedPlayerId = document.getElementById("playerSelect").value;
    const j = await api.addGoal(selectedPlayerId, pwd, g, loc, t);
    showMsg(j.success ? "提交成功，等待审核！" : j.error, j.success);
    if (j.success) {
        closeModal("goalModal");
        document.getElementById("playerPwd").value = "";
        document.getElementById("goalNum").value = "1";
        document.getElementById("matchLocation").value = "";
        document.getElementById("matchTimeSelect").value = "";
    }
}

function initEventListeners() {
    document.querySelectorAll(".nav button").forEach(btn => {
        btn.addEventListener("click", () => {
            const page = btn.getAttribute("data-page");
            showPage(page);
        });
    });

    document.getElementById("globalLoginBtn").addEventListener("click", globalLogin);
    document.getElementById("globalLogoutBtn").addEventListener("click", globalLogout);
    document.getElementById("openRegisterBtn").addEventListener("click", openRegisterModal);
    document.getElementById("openGoalBtn").addEventListener("click", openGoalModal);
    document.getElementById("closeRegisterModalBtn").addEventListener("click", () => closeModal("registerModal"));
    document.getElementById("closeGoalModalBtn").addEventListener("click", () => closeModal("goalModal"));
    document.getElementById("submitNewPlayerBtn").addEventListener("click", submitNewPlayer);
    document.getElementById("submitGoalRecordBtn").addEventListener("click", submitGoalRecord);

    document.getElementById("teamPageLogoutBtn").addEventListener("click", teamPageLogout);
    document.getElementById("signupMatchBtn").addEventListener("click", signupMatch);
    document.getElementById("cancelSignupBtn").addEventListener("click", cancelSignup);
    document.getElementById("createMatchBtn").addEventListener("click", createMatch);
    document.getElementById("endMatchBtn").addEventListener("click", endMatch);
    document.getElementById("openCreateTeamBtn").addEventListener("click", openCreateTeamModal);
    document.getElementById("submitCreateTeamBtn").addEventListener("click", submitCreateTeam);
    document.getElementById("closeCreateTeamModalBtn").addEventListener("click", () => closeModal("createTeamModal"));
    document.getElementById("submitJoinTeamBtn").addEventListener("click", submitJoinTeam);
    document.getElementById("closeJoinTeamModalBtn").addEventListener("click", () => closeModal("joinTeamModal"));

    document.getElementById("votePageLogoutBtn").addEventListener("click", votePageLogout);
    document.getElementById("submitVoteBtn").addEventListener("click", submitVote);
    document.getElementById("setVoteTitleBtn").addEventListener("click", setVoteTitle);
    document.getElementById("resetVoteBtn").addEventListener("click", resetVote);

    document.getElementById("adminLoginBtn").addEventListener("click", adminLogin);
    document.getElementById("saveCustomTitleBtn").addEventListener("click", saveCustomTitle);
    document.getElementById("addGoalMatchTimeBtn").addEventListener("click", addGoalMatchTime);
    document.getElementById("saveRewardBtn").addEventListener("click", saveReward);

    document.getElementById("closeMsgModalBtn").addEventListener("click", closeMsgModal);
}

window.showPage = showPage;
window.showMsg = showMsg;
window.closeMsgModal = closeMsgModal;
window.closeModal = closeModal;
window.closeModalAll = closeModalAll;
window.openModal = openModal;
window.openRegisterModal = openRegisterModal;
window.openGoalModal = openGoalModal;
window.submitNewPlayer = submitNewPlayer;
window.submitGoalRecord = submitGoalRecord;
window.globalLogout = globalLogout;
window.teamPageLogout = teamPageLogout;
window.votePageLogout = votePageLogout;
window.adminLogin = adminLogin;
window.loadGoalMatchTimes = loadGoalMatchTimes;
window.addGoalMatchTime = addGoalMatchTime;
window.removeGoalMatchTime = removeGoalMatchTime;
window.renderGoalMatchTimeList = renderGoalMatchTimeList;
window.saveCustomTitle = saveCustomTitle;
window.saveReward = saveReward;
window.initGlobalLogin = initGlobalLogin;
window.globalLogin = globalLogin;
window.signupMatch = signupMatch;
window.cancelSignup = cancelSignup;
window.createMatch = createMatch;
window.endMatch = endMatch;
window.openCreateTeamModal = openCreateTeamModal;
window.submitCreateTeam = submitCreateTeam;
window.submitJoinTeam = submitJoinTeam;
window.approveJoin = approveJoin;
window.rejectJoin = rejectJoin;
window.kickMember = kickMember;
window.renderVote = renderVote;
window.submitVote = submitVote;
window.setVoteTitle = setVoteTitle;
window.resetVote = resetVote;
window.selectVoteOption = selectVoteOption;
window.passPlayer = passPlayer;
window.rejectPlayer = rejectPlayer;
window.deletePlayer = deletePlayer;
window.revokePlayerApproval = revokePlayerApproval;
window.passGoal = passGoal;
window.rejectGoal = rejectGoal;
window.undoGoal = undoGoal;
window.setPlayerMatches = setPlayerMatches;
window.adminAddGoal = adminAddGoal;
window.approveTeam = approveTeam;
window.rejectTeam = rejectTeam;

window.onload = async function () {
    initEventListeners();
    await loadCustomTitle();
    await loadReward();
    renderPlayerSelect();
    renderGoalMatchTimeList();
    initGlobalLogin();
};
