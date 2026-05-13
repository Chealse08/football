// 深鸡蛋坪山公园球王榜 - 投票功能模块

import { api } from './api.js';
import { ADMIN_PWD } from './config.js';
import { showMsg } from './main.js';
import { getGlobalLoginState } from './auth.js';

let selectedVoteOption = null;

export async function renderVote() {
    try {
        const d = await api.getVote();
        if (!d) throw new Error("数据为空");

        document.getElementById("voteTitle").innerText = d.title || "最佳球员投票";

        const { isAdminLoggedIn } = await import('./admin.js');
        document.getElementById("adminVoteControls").classList.toggle("hide", !isAdminLoggedIn);

        const options = d.options || [];
        let h = "";
        if (options.length === 0) {
            h = "<p style='color:#999;'>暂无投票选项</p>";
        } else {
            options.forEach(o => {
                h += `<div class="vote-option" data-id="${o.id}" onclick="selectVoteOption(${o.id})">${o.name}</div>`;
            });
        }
        document.getElementById("voteOptions").innerHTML = h;

        const votes = d.votes || {};
        let total = 0;
        try {
            total = Object.values(votes).reduce((a, b) => a + b, 0);
        } catch (e) {
            total = 0;
        }

        let rs = `<h4>总票：${total}</h4>`;
        options.map(p => ({ ...p, v: votes[p.id] || 0 })).sort((a, b) => b.v - a.v).forEach(x => {
            const per = total ? Math.round(x.v / total * 100) : 0;
            rs += `<div style="margin:6px 0;"><div style="display:flex;justify-content:space-between;"><span>${x.name}</span><span>${x.v}票 ${per}%</span></div><div class="vote-bar"><div class="vote-progress" style="width:${per}%"></div></div></div>`;
        });
        document.getElementById("voteResults").innerHTML = rs;
    } catch (e) {
        console.error("投票加载失败:", e);
        document.getElementById("voteOptions").innerHTML = "<p style='color:red;'>投票加载失败，请刷新重试</p>";
        document.getElementById("voteResults").innerHTML = "";
    }
}

export function selectVoteOption(id) {
    document.querySelectorAll(".vote-option").forEach(o => o.classList.remove("selected"));
    document.querySelector(`.vote-option[data-id="${id}"]`).classList.add("selected");
    selectedVoteOption = id;
}

export async function submitVote() {
    const { currentVotePlayerId, currentVotePlayerPwd } = getGlobalLoginState();
    if (!currentVotePlayerId || !currentVotePlayerPwd) {
        showMsg("请先验证身份", false);
        return;
    }
    if (!selectedVoteOption) {
        showMsg("请先选择候选人", false);
        return;
    }
    try {
        const j = await api.postVote(currentVotePlayerId, currentVotePlayerPwd);
        showMsg(j.success ? "投票成功！" : (j.error || "投票失败"), j.success);
        if (j.success) {
            selectedVoteOption = null;
            renderVote();
        }
    } catch (e) {
        showMsg("投票请求失败，请重试", false);
    }
}

export async function setVoteTitle() {
    const t = document.getElementById("newVoteTitle").value.trim();
    if (!t) return;
    await api.setVoteTitle(t, ADMIN_PWD);
    showMsg("投票题目已修改", true);
    renderVote();
}

export async function resetVote() {
    if (!confirm("确定要重置所有投票吗？")) return;
    await api.resetVote(ADMIN_PWD);
    showMsg("投票已重置", true);
    renderVote();
}

export function resetVoteOption() {
    selectedVoteOption = null;
}
