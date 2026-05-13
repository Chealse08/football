// 深鸡蛋坪山公园球王榜 - 登录认证模块

import { api } from './api.js';
import { showMsg } from './main.js';
import { updatePageAuthStatus } from './main.js';

export let globalLoggedInPlayer = null;
export let currentPlayerId = null;
export let currentPlayerPwd = null;
export let currentVotePlayerId = null;
export let currentVotePlayerPwd = null;

export async function initGlobalLogin() {
    try {
        const list = await api.getPlayers();
        let h = `<option value="">请选择</option>`;
        list.forEach(it => h += `<option value="${it.id}">${it.name}</option>`);
        document.getElementById("globalPlayerSelect").innerHTML = h;

        if (globalLoggedInPlayer) {
            document.getElementById("loginForm").classList.add("hide");
            document.getElementById("loggedInInfo").classList.remove("hide");
            document.getElementById("loggedInPlayerName").innerText = globalLoggedInPlayer.name;
        } else {
            document.getElementById("loginForm").classList.remove("hide");
            document.getElementById("loggedInInfo").classList.add("hide");
        }
    } catch (e) {
        console.error("初始化登录状态失败:", e);
        showMsg("加载球员列表失败", false);
    }
}

export async function globalLogin() {
    try {
        const pid = document.getElementById("globalPlayerSelect").value;
        const pwd = document.getElementById("globalPlayerPwd").value.trim();

        if (!pid || pwd.length !== 2) {
            showMsg("请选择球员并输入正确的2位密码", false);
            return;
        }

        const players = await api.getPlayers();
        const player = players.find(p => p.id == pid);

        if (!player || player.password !== pwd) {
            showMsg("密码错误", false);
            return;
        }

        globalLoggedInPlayer = player;
        currentPlayerId = player.id;
        currentPlayerPwd = player.password;
        currentVotePlayerId = player.id;
        currentVotePlayerPwd = player.password;

        initGlobalLogin();
        updatePageAuthStatus();
        showMsg("登录成功", true);
    } catch (e) {
        console.error("登录失败:", e);
        showMsg("登录失败，请重试", false);
    }
}

export function globalLogout() {
    globalLoggedInPlayer = null;
    currentPlayerId = null;
    currentPlayerPwd = null;
    currentVotePlayerId = null;
    currentVotePlayerPwd = null;
    initGlobalLogin();
    updatePageAuthStatus();
    showMsg("已退出登录", true);
}

export function teamPageLogout() {
    currentPlayerId = null;
    currentPlayerPwd = null;
    globalLogout();
}

export function votePageLogout() {
    currentVotePlayerId = null;
    currentVotePlayerPwd = null;
    globalLogout();
}

export function getGlobalLoginState() {
    return {
        globalLoggedInPlayer,
        currentPlayerId,
        currentPlayerPwd,
        currentVotePlayerId,
        currentVotePlayerPwd
    };
}
