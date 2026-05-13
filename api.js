// 深鸡蛋坪山公园球王榜 - API 调用模块
import { API_URL } from './config.js';

class ApiService {
    async get(endpoint) {
        const response = await fetch(API_URL + endpoint);
        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status}`);
        }
        return await response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(API_URL + endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    // 球员相关
    async getPlayers() {
        return await this.get('/players');
    }

    async getAllPlayers() {
        return await this.get('/allPlayers');
    }

    async getWaitPlayers() {
        return await this.get('/waitPlayers');
    }

    async addPlayer(name, password) {
        return await this.post('/addPlayer', { name, password });
    }

    async passPlayer(id) {
        return await this.get(`/passPlayer?id=${id}`);
    }

    async rejectPlayer(id) {
        return await this.get(`/rejectPlayer?id=${id}`);
    }

    async deletePlayer(id, adminPwd) {
        return await this.post('/deletePlayer', { id, adminPwd });
    }

    async revokePlayer(id, adminPwd) {
        return await this.post('/revokePlayer', { id, adminPwd });
    }

    async setPlayerMatches(id, matches, adminPwd) {
        return await this.post('/setPlayerMatches', { id, matches, adminPwd });
    }

    async adminAddGoal(id, add, adminPwd) {
        return await this.post('/adminAddGoal', { id, add, adminPwd });
    }

    // 进球相关
    async getWaitMatches() {
        return await this.get('/waitMatches');
    }

    async addGoal(pid, password, goal, location, time) {
        return await this.post('/addGoal', { pid, password, goal, location, time });
    }

    async passGoal(id) {
        return await this.get(`/passGoal?id=${id}`);
    }

    async rejectGoal(id) {
        return await this.get(`/rejectGoal?id=${id}`);
    }

    async undoGoal(goalId, adminPwd) {
        return await this.post('/undoGoal', { goalId, adminPwd });
    }

    async getGoalMatchTimes() {
        return await this.get('/getGoalMatchTimes');
    }

    async setGoalMatchTimes(adminPwd, time, action) {
        return await this.post('/setGoalMatchTimes', { adminPwd, time, action });
    }

    // 比赛组队相关
    async getCurrentMatch() {
        return await this.get('/getCurrentMatch');
    }

    async createMatch(time, location, adminPwd) {
        return await this.post('/createMatch', { time, location, adminPwd });
    }

    async endMatch(adminPwd) {
        return await this.post('/endMatch', { adminPwd });
    }

    async getSignupList() {
        return await this.get('/getSignupList');
    }

    async signupMatch(pid, password) {
        return await this.post('/signupMatch', { pid, password });
    }

    async cancelSignup(pid, password) {
        return await this.post('/cancelSignup', { pid, password });
    }

    // 小队相关
    async getApprovedTeams() {
        return await this.get('/getApprovedTeams');
    }

    async createTeam(captainId, captainPwd, name, code) {
        return await this.post('/createTeam', { captainId, captainPwd, name, code });
    }

    async joinTeam(teamId, playerId, password, code) {
        return await this.post('/joinTeam', { teamId, playerId, password, code });
    }

    async approveJoin(teamId, playerId, captainPwd) {
        return await this.post('/approveJoin', { teamId, playerId, captainPwd });
    }

    async rejectJoin(teamId, playerId, captainPwd) {
        return await this.post('/rejectJoin', { teamId, playerId, captainPwd });
    }

    async kickMember(teamId, playerId, captainPwd) {
        return await this.post('/kickMember', { teamId, playerId, captainPwd });
    }

    async getPendingTeams() {
        return await this.get('/getPendingTeams');
    }

    async approveTeam(teamId, adminPwd) {
        return await this.post('/approveTeam', { teamId, adminPwd });
    }

    async rejectTeam(teamId, adminPwd) {
        return await this.post('/rejectTeam', { teamId, adminPwd });
    }

    async getMyTeamAndApplications(playerId) {
        return await this.get(`/getMyTeamAndApplications?playerId=${playerId}`);
    }

    // 投票相关
    async getVote() {
        return await this.get('/vote');
    }

    async postVote(playerId, password, candidateId) {
        return await this.post('/vote', { playerId, password, candidateId });
    }

    async setVoteTitle(title, adminPwd) {
        return await this.post('/setVoteTitle', { title, adminPwd });
    }

    async resetVote(adminPwd) {
        return await this.post('/resetVote', { adminPwd });
    }

    // 奖励规则相关
    async getReward() {
        return await this.get('/getReward');
    }

    async setReward(content, adminPwd) {
        return await this.post('/setReward', { content, adminPwd });
    }

    // 标题相关
    async getCustomTitle() {
        return await this.get('/getCustomTitle');
    }

    async setCustomTitle(title, adminPwd) {
        return await this.post('/setCustomTitle', { title, adminPwd });
    }

    // 射手榜
    async getRankData() {
        return await this.get('/');
    }
}

export const api = new ApiService();
