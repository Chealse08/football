// ==================== 管理员系统 ====================

// 默认数据
const defaultData = {
    adminPassword: 'admin123',
    teams: [
        { id: 1, name: '计算机学院', slogan: '代码写得好，足球踢得棒', icon: '🔵', champions: 2, members: 25 },
        { id: 2, name: '机械工程学院', slogan: '机械机械，永不言败', icon: '🔴', champions: 1, members: 28 },
        { id: 3, name: '经济管理学院', slogan: '经管经管，锐不可当', icon: '🟢', champions: 3, members: 22 },
        { id: 4, name: '电气工程学院', slogan: '电气电气，充满电力', icon: '🟡', champions: 1, members: 26 },
        { id: 5, name: '土木工程学院', slogan: '土木土木，牢不可破', icon: '🟣', champions: 0, members: 24 },
        { id: 6, name: '艺术设计学院', slogan: '艺术足球，赏心悦目', icon: '🟠', champions: 0, members: 20 },
        { id: 7, name: '外国语学院', slogan: '外语外语，世界之窗', icon: '⚫', champions: 0, members: 18 },
        { id: 8, name: '生物医药学院', slogan: '生医生医，健康第一', icon: '⚪', champions: 0, members: 20 }
    ],
    cupYears: ['2025', '2024', '2023'],
    currentCupYear: '2025',
    cupData: {
        '2025': {
            groupA: [
                { team: '经济管理学院', played: 3, win: 2, draw: 1, loss: 0, points: 7 },
                { team: '计算机学院', played: 3, win: 2, draw: 0, loss: 1, points: 6 },
                { team: '艺术设计学院', played: 3, win: 1, draw: 1, loss: 1, points: 4 },
                { team: '生物医药学院', played: 3, win: 0, draw: 0, loss: 3, points: 0 }
            ],
            groupB: [
                { team: '机械工程学院', played: 3, win: 3, draw: 0, loss: 0, points: 9 },
                { team: '土木工程学院', played: 3, win: 1, draw: 1, loss: 1, points: 4 },
                { team: '电气工程学院', played: 3, win: 1, draw: 0, loss: 2, points: 3 },
                { team: '外国语学院', played: 3, win: 0, draw: 1, loss: 2, points: 1 }
            ],
            goals: [
                { name: '阿龙', team: '计算机学院', number: '9', goals: 12 },
                { name: '小杰', team: '经济管理学院', number: '11', goals: 10 },
                { name: '大伟', team: '机械工程学院', number: '10', goals: 8 },
                { name: '阿强', team: '电气工程学院', number: '7', goals: 7 },
                { name: '小飞', team: '经济管理学院', number: '9', goals: 6 }
            ],
            assists: [
                { name: '阿辉', team: '计算机学院', number: '8', assists: 9 },
                { name: '阿文', team: '经济管理学院', number: '10', assists: 8 },
                { name: '小宇', team: '机械工程学院', number: '14', assists: 6 },
                { name: '阿凯', team: '电气工程学院', number: '16', assists: 5 }
            ],
            awards: {
                golden: { name: '阿龙', team: '计算机学院', photo: '' },
                rookie: { name: '小杰', team: '经济管理学院', photo: '' },
                glove: { name: '阿晨', team: '经济管理学院', photo: '' }
            }
        },
        '2024': {
            groupA: [
                { team: '计算机学院', played: 3, win: 2, draw: 1, loss: 0, points: 7 },
                { team: '经济管理学院', played: 3, win: 2, draw: 0, loss: 1, points: 6 },
                { team: '电气工程学院', played: 3, win: 1, draw: 0, loss: 2, points: 3 },
                { team: '外国语学院', played: 3, win: 0, draw: 1, loss: 2, points: 1 }
            ],
            groupB: [
                { team: '机械工程学院', played: 3, win: 2, draw: 1, loss: 0, points: 7 },
                { team: '土木工程学院', played: 3, win: 1, draw: 1, loss: 1, points: 4 },
                { team: '艺术设计学院', played: 3, win: 1, draw: 0, loss: 2, points: 3 },
                { team: '生物医药学院', played: 3, win: 0, draw: 2, loss: 1, points: 2 }
            ],
            goals: [
                { name: '大伟', team: '机械工程学院', number: '10', goals: 11 },
                { name: '阿龙', team: '计算机学院', number: '9', goals: 9 },
                { name: '小飞', team: '经济管理学院', number: '9', goals: 8 }
            ],
            assists: [
                { name: '阿辉', team: '计算机学院', number: '8', assists: 10 },
                { name: '阿文', team: '经济管理学院', number: '10', assists: 7 }
            ],
            awards: {
                golden: { name: '大伟', team: '机械工程学院', photo: '' },
                rookie: { name: '小杰', team: '经济管理学院', photo: '' },
                glove: { name: '阿峰', team: '计算机学院', photo: '' }
            }
        },
        '2023': {
            groupA: [
                { team: '机械工程学院', played: 3, win: 3, draw: 0, loss: 0, points: 9 },
                { team: '计算机学院', played: 3, win: 2, draw: 0, loss: 1, points: 6 },
                { team: '艺术设计学院', played: 3, win: 1, draw: 0, loss: 2, points: 3 },
                { team: '外国语学院', played: 3, win: 0, draw: 0, loss: 3, points: 0 }
            ],
            groupB: [
                { team: '经济管理学院', played: 3, win: 2, draw: 1, loss: 0, points: 7 },
                { team: '电气工程学院', played: 3, win: 1, draw: 1, loss: 1, points: 4 },
                { team: '土木工程学院', played: 3, win: 1, draw: 0, loss: 2, points: 3 },
                { team: '生物医药学院', played: 3, win: 0, draw: 2, loss: 1, points: 2 }
            ],
            goals: [
                { name: '大伟', team: '机械工程学院', number: '10', goals: 13 },
                { name: '小飞', team: '经济管理学院', number: '9', goals: 9 }
            ],
            assists: [
                { name: '阿凯', team: '电气工程学院', number: '16', assists: 8 }
            ],
            awards: {
                golden: { name: '大伟', team: '机械工程学院', photo: '' },
                rookie: { name: '阿龙', team: '计算机学院', photo: '' },
                glove: { name: '阿涛', team: '机械工程学院', photo: '' }
            }
        }
    },
    schoolTeam: {
        name: '深鸡蛋大学校足球队',
        year: '成立于2018年',
        members: '30名',
        coaches: '2名',
        honors: '🥇 市高校联赛冠军 x2\n🥈 省高校联赛季军 x1\n🏅 最佳组织奖 x3'
    },
    coaches: [
        { id: 1, name: '陈指导', title: '主教练', desc: '前职业球员，拥有亚足联A级教练证书，执教经验丰富', photo: '' },
        { id: 2, name: '林指导', title: '助理教练', desc: '体育学院足球专业毕业，专注青训和体能训练', photo: '' },
        { id: 3, name: '王指导', title: '守门员教练', desc: '前职业门将，擅长守门员技术训练', photo: '' },
        { id: 4, name: '赵指导', title: '体能教练', desc: '运动康复专业，负责球队体能训练和康复', photo: '' }
    ],
    menPlayers: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        number: (i + 1).toString(),
        name: '球员' + (i + 1),
        position: i < 3 ? '前锋' : i < 10 ? '中场' : i < 20 ? '后卫' : '守门员',
        photo: ''
    })),
    womenPlayers: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        number: (i + 1).toString(),
        name: '女球员' + (i + 1),
        position: i < 3 ? '前锋' : i < 10 ? '中场' : i < 20 ? '后卫' : '守门员',
        photo: ''
    })),
    activities: [
        { id: 1, name: '2025夏季足球联赛', desc: '八支球队参赛，单循环赛制，争夺联赛冠军奖杯', date: '6月15-30', month: '6月', location: '坪山公园足球场', status: 'ongoing', meta: '8支球队' },
        { id: 2, name: '足球裁判培训营', desc: '邀请国家级裁判授课，学习足球规则和裁判技巧', date: '7月10', month: '7月', location: '协会会议室', status: 'upcoming', meta: '限30人' },
        { id: 3, name: '亲子足球嘉年华', desc: '家庭足球趣味活动，增进亲子感情，培养孩子足球兴趣', date: '7月20', month: '7月', location: '坪山公园足球场', status: 'upcoming', meta: '适合5-12岁' },
        { id: 4, name: '新老会员友谊赛', desc: '新老会员足球交流活动，以球会友，增进感情', date: '5月20', month: '5月', location: '坪山公园足球场', status: 'ended', meta: '40人参与' },
        { id: 5, name: '春季杯足球赛', desc: '16支球队参赛，经过激烈角逐，经管学院夺冠', date: '4月5', month: '4月', location: '坪山公园足球场', status: 'ended', meta: '经管学院冠军' },
        { id: 6, name: '三八节女足友谊赛', desc: '庆祝国际妇女节，女足姑娘们展现风采', date: '3月8', month: '3月', location: '坪山公园足球场', status: 'ended', meta: '20人参与' }
    ],
    referees: [
        { id: 1, name: '张伟', level: '国家级裁判', desc: '执法经验10年，曾执法多场全国性赛事', photo: '' },
        { id: 2, name: '李明', level: '一级裁判', desc: '执法经验8年，擅长控制比赛节奏', photo: '' },
        { id: 3, name: '王强', level: '一级裁判', desc: '执法经验6年，判罚精准果断', photo: '' },
        { id: 4, name: '刘洋', level: '二级裁判', desc: '执法经验4年，年轻有为', photo: '' }
    ],
    refStats: {
        total: '12',
        level1: '8',
        matches: '200+',
        rating: '98%'
    }
};

// 初始化数据
function initData() {
    const savedData = localStorage.getItem('footballAdminData');
    if (!savedData) {
        localStorage.setItem('footballAdminData', JSON.stringify(defaultData));
    } else {
        // 合并数据，确保新字段存在
        try {
            const data = JSON.parse(savedData);
            const merged = mergeData(defaultData, data);
            localStorage.setItem('footballAdminData', JSON.stringify(merged));
        } catch (e) {
            localStorage.setItem('footballAdminData', JSON.stringify(defaultData));
        }
    }
}

// 深度合并数据，以默认值为基础，用已保存的数据覆盖
function mergeData(defaultObj, savedObj) {
    if (typeof savedObj !== 'object' || savedObj === null) {
        return JSON.parse(JSON.stringify(defaultObj));
    }
    const result = {};
    for (const key in defaultObj) {
        if (Array.isArray(defaultObj[key])) {
            result[key] = savedObj[key] !== undefined ? savedObj[key] : JSON.parse(JSON.stringify(defaultObj[key]));
        } else if (typeof defaultObj[key] === 'object' && defaultObj[key] !== null) {
            result[key] = mergeData(defaultObj[key], savedObj[key]);
        } else {
            result[key] = savedObj[key] !== undefined ? savedObj[key] : defaultObj[key];
        }
    }
    return result;
}

// 获取数据
function getData() {
    const data = localStorage.getItem('footballAdminData');
    return data ? JSON.parse(data) : JSON.parse(JSON.stringify(defaultData));
}

// 保存数据
function saveData(data) {
    localStorage.setItem('footballAdminData', JSON.stringify(data));
}

// ==================== 图片上传工具 ====================

function handleImageUpload(input, callback) {
    const file = input.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB！');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

// ==================== 管理员登录 ====================

function openAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'flex';
}

function closeAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

function loginAdmin(password) {
    const data = getData();
    if (password === data.adminPassword) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        closeAdminLogin();
        showAdminPage();
        return true;
    }
    return false;
}

function checkAdminLogin() {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
}

function logoutAdmin() {
    sessionStorage.removeItem('adminLoggedIn');
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    navBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-page="home"]').classList.add('active');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('home').classList.add('active');
}

function showAdminPage() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    navBtns.forEach(b => b.classList.remove('active'));
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('admin').classList.add('active');
    closeMobileMenu();
    loadAdminTabs();
}

// ==================== 页面加载 ====================

document.addEventListener('DOMContentLoaded', () => {
    initData();

    // 管理入口按钮点击
    const adminEntryBtn = document.getElementById('adminEntryBtn');
    if (adminEntryBtn) {
        adminEntryBtn.addEventListener('click', () => {
            if (!checkAdminLogin()) {
                openAdminLogin();
            } else {
                showAdminPage();
            }
        });
    }

    // 登录表单提交
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;
            if (loginAdmin(password)) {
                // 登录成功
            } else {
                alert('密码错误，请重试！');
            }
        });
    }

    // 管理员标签页切换
    const adminTabs = document.querySelectorAll('.admin-tab');
    if (adminTabs.length > 0) {
        adminTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                adminTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.querySelectorAll('.admin-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                document.getElementById('tab-' + targetTab).classList.add('active');
            });
        });
    }

    // 初始化前台页面显示
    initFrontendDisplay();
});

// ==================== 前台页面显示初始化 ====================

function initFrontendDisplay() {
    loadCollegeTeams();
    loadRankingDisplay();
    loadRefereeDisplay();
    loadSchoolTeamDisplay();
    loadActivitiesDisplay();
}

// ==================== 院队前台显示 ====================

function loadCollegeTeams() {
    const data = getData();
    const grid = document.getElementById('collegeTeamsGrid');
    if (!grid) return;

    grid.innerHTML = data.teams.map(team => `
        <div class="team-card">
            <div class="team-logo">${team.icon}</div>
            <h3>${team.name}</h3>
            <p class="team-slogan">${team.slogan}</p>
            <div class="team-info">
                <span>🏆 ${team.champions}次冠军</span>
                <span>👥 ${team.members}人</span>
            </div>
        </div>
    `).join('');
}

// ==================== 校长杯榜单切换 ====================

let currentRankTab = 'ranking';

function switchRankTab(tab) {
    currentRankTab = tab;

    document.querySelectorAll('.rank-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.rank-tab[data-rank="${tab}"]`).classList.add('active');

    document.querySelectorAll('.rank-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('rank-' + tab).classList.add('active');
}

function changeCupYear(year) {
    const data = getData();
    data.currentCupYear = year;
    saveData(data);
    loadRankingDisplay();
    document.getElementById('rankingTitle').textContent = year + '年校长杯积分榜';
}

function loadRankingDisplay() {
    const data = getData();
    const year = data.currentCupYear;
    const cupData = data.cupData[year];
    if (!cupData) return;

    // 兼容旧数据
    if (cupData.ranking && !cupData.groupA) {
        cupData.groupA = cupData.ranking.slice(0, 4);
        cupData.groupB = cupData.ranking.slice(4, 8);
    }

    // 小组积分榜
    const groupABody = document.getElementById('groupABody');
    const groupBBody = document.getElementById('groupBBody');

    function renderGroupTable(body, groupData) {
        if (!body || !groupData) return;
        const sorted = [...groupData].sort((a, b) => b.points - a.points);
        body.innerHTML = sorted.map((item, index) => {
            let rankClass = '';
            if (index === 0) rankClass = 'rank-1';
            else if (index === 1) rankClass = 'rank-2';
            else if (index === 2) rankClass = 'rank-3';

            return `
                <tr>
                    <td><span class="rank-badge ${rankClass}">${index + 1}</span></td>
                    <td>${item.team}</td>
                    <td>${item.played}</td>
                    <td>${item.win}</td>
                    <td>${item.draw}</td>
                    <td>${item.loss}</td>
                    <td><strong>${item.points}</strong></td>
                </tr>
            `;
        }).join('');
    }

    renderGroupTable(groupABody, cupData.groupA);
    renderGroupTable(groupBBody, cupData.groupB);

    // 进球榜
    const goalsBody = document.getElementById('goalsBody');
    if (goalsBody && cupData.goals) {
        const sorted = [...cupData.goals].sort((a, b) => b.goals - a.goals);
        goalsBody.innerHTML = sorted.map((item, index) => {
            let rankClass = '';
            if (index === 0) rankClass = 'rank-1';
            else if (index === 1) rankClass = 'rank-2';
            else if (index === 2) rankClass = 'rank-3';

            return `
                <tr>
                    <td><span class="rank-badge ${rankClass}">${index + 1}</span></td>
                    <td>${item.name}</td>
                    <td>${item.team}</td>
                    <td>${item.number}</td>
                    <td><strong>${item.goals}</strong></td>
                </tr>
            `;
        }).join('');
    }

    // 助攻榜
    const assistsBody = document.getElementById('assistsBody');
    if (assistsBody && cupData.assists) {
        const sorted = [...cupData.assists].sort((a, b) => b.assists - a.assists);
        assistsBody.innerHTML = sorted.map((item, index) => {
            let rankClass = '';
            if (index === 0) rankClass = 'rank-1';
            else if (index === 1) rankClass = 'rank-2';
            else if (index === 2) rankClass = 'rank-3';

            return `
                <tr>
                    <td><span class="rank-badge ${rankClass}">${index + 1}</span></td>
                    <td>${item.name}</td>
                    <td>${item.team}</td>
                    <td>${item.number}</td>
                    <td><strong>${item.assists}</strong></td>
                </tr>
            `;
        }).join('');
    }

    // 奖项
    if (cupData.awards) {
        // 金球奖
        const golden = cupData.awards.golden;
        const goldenEl = document.getElementById('goldenWinner');
        if (goldenEl && golden) {
            goldenEl.innerHTML = `
                <div class="player-photo">${golden.photo ? `<img src="${golden.photo}" alt="${golden.name}">` : '📷'}</div>
                <h4>${golden.name}</h4>
                <p class="player-team">${golden.team}</p>
            `;
        }

        // 最佳新秀
        const rookie = cupData.awards.rookie;
        const rookieEl = document.getElementById('rookieWinner');
        if (rookieEl && rookie) {
            rookieEl.innerHTML = `
                <div class="player-photo">${rookie.photo ? `<img src="${rookie.photo}" alt="${rookie.name}">` : '📷'}</div>
                <h4>${rookie.name}</h4>
                <p class="player-team">${rookie.team}</p>
            `;
        }

        // 金手套
        const glove = cupData.awards.glove;
        const gloveEl = document.getElementById('gloveWinner');
        if (gloveEl && glove) {
            gloveEl.innerHTML = `
                <div class="player-photo">${glove.photo ? `<img src="${glove.photo}" alt="${glove.name}">` : '📷'}</div>
                <h4>${glove.name}</h4>
                <p class="player-team">${glove.team}</p>
            `;
        }
    }

    // 更新年度选择器
    const yearSelect = document.getElementById('cupYearSelect');
    if (yearSelect) {
        yearSelect.value = year;
    }
}

function showCupHistory() {
    const data = getData();
    const historyList = document.getElementById('historyList');
    if (historyList) {
        historyList.innerHTML = data.cupYears.map(year => {
            const cupData = data.cupData[year];
            const champion = cupData && cupData.ranking ? [...cupData.ranking].sort((a, b) => b.points - a.points)[0] : null;
            return `
                <div class="history-item">
                    <div>
                        <h4>${year}年校长杯</h4>
                        <p>冠军：${champion ? champion.team : '待定'}</p>
                    </div>
                    <button class="btn-edit" onclick="selectCupYear('${year}')">查看</button>
                </div>
            `;
        }).join('');
    }
    document.getElementById('cupHistoryModal').style.display = 'flex';
}

function closeCupHistory() {
    document.getElementById('cupHistoryModal').style.display = 'none';
}

function selectCupYear(year) {
    closeCupHistory();
    document.getElementById('cupYearSelect').value = year;
    changeCupYear(year);
}

// ==================== 主裁前台显示 ====================

function loadRefereeDisplay() {
    const data = getData();
    const grid = document.getElementById('refereeGridDisplay');
    if (!grid) return;

    // 更新统计数据
    const statsContainer = document.querySelector('.referee-stats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="ref-stat">
                <div class="ref-number">${data.refStats.total}</div>
                <div class="ref-label">注册主裁</div>
            </div>
            <div class="ref-stat">
                <div class="ref-number">${data.refStats.level1}</div>
                <div class="ref-label">一级裁判</div>
            </div>
            <div class="ref-stat">
                <div class="ref-number">${data.refStats.matches}</div>
                <div class="ref-label">执法场次</div>
            </div>
            <div class="ref-stat">
                <div class="ref-number">${data.refStats.rating}</div>
                <div class="ref-label">好评率</div>
            </div>
        `;
    }

    // 更新裁判卡片
    grid.innerHTML = data.referees.map(ref => `
        <div class="referee-card">
            <div class="ref-avatar">${ref.photo ? `<img src="${ref.photo}" alt="${ref.name}">` : '⚽'}</div>
            <h4>${ref.name}</h4>
            <p class="ref-level">${ref.level}</p>
            <p class="ref-desc">${ref.desc}</p>
        </div>
    `).join('');
}

// ==================== 校队前台显示 ====================

let currentSchoolTeam = 'men';

function switchSchoolTeam(team) {
    currentSchoolTeam = team;

    document.querySelectorAll('.team-switch-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.team-switch-btn[data-team="${team}"]`).classList.add('active');

    document.querySelectorAll('.team-gallery').forEach(g => g.classList.remove('active'));
    document.getElementById(team + '-team').classList.add('active');
}

function loadSchoolTeamDisplay() {
    const data = getData();

    // 校队头部
    const hero = document.getElementById('schoolHeroDisplay');
    if (hero) {
        const honorsHtml = data.schoolTeam.honors.split('\n').filter(h => h.trim()).map(h => `<span>${h}</span>`).join('');
        hero.innerHTML = `
            <div class="school-badge">🏆</div>
            <div class="school-info">
                <h3>${data.schoolTeam.name}</h3>
                <p>${data.schoolTeam.year}，现有队员${data.schoolTeam.members}，教练${data.schoolTeam.coaches}</p>
                <div class="school-honors">${honorsHtml}</div>
            </div>
        `;
    }

    // 男子校队
    const menGallery = document.getElementById('menPlayersGallery');
    if (menGallery) {
        menGallery.innerHTML = data.menPlayers.map(player => `
            <div class="player-card">
                <div class="player-card-photo">
                    ${player.photo ? `<img src="${player.photo}" alt="${player.name}">` : '⚽'}
                    <span class="player-card-number">${player.number}</span>
                </div>
                <div class="player-card-name">${player.name}</div>
                <div class="player-card-pos">${player.position}</div>
            </div>
        `).join('');
    }

    // 女子校队
    const womenGallery = document.getElementById('womenPlayersGallery');
    if (womenGallery) {
        womenGallery.innerHTML = data.womenPlayers.map(player => `
            <div class="player-card">
                <div class="player-card-photo">
                    ${player.photo ? `<img src="${player.photo}" alt="${player.name}">` : '⚽'}
                    <span class="player-card-number">${player.number}</span>
                </div>
                <div class="player-card-name">${player.name}</div>
                <div class="player-card-pos">${player.position}</div>
            </div>
        `).join('');
    }

    // 教练团队
    const coachesGallery = document.getElementById('coachesGallery');
    if (coachesGallery) {
        coachesGallery.innerHTML = data.coaches.map(coach => `
            <div class="coach-card-photo">
                <div class="coach-photo">${coach.photo ? `<img src="${coach.photo}" alt="${coach.name}">` : '👨‍🏫'}</div>
                <h4>${coach.name}</h4>
                <p class="coach-title">${coach.title}</p>
                <p class="coach-desc">${coach.desc}</p>
            </div>
        `).join('');
    }
}

// ==================== 活动前台显示 ====================

function loadActivitiesDisplay() {
    const data = getData();
    const list = document.querySelector('.activity-list');
    if (!list) return;

    const statusMap = { upcoming: '即将开始', ongoing: '进行中', ended: '已结束' };

    list.innerHTML = data.activities.map(activity => `
        <div class="activity-item" data-status="${activity.status}">
            <div class="activity-badge ${activity.status}">${statusMap[activity.status]}</div>
            <div class="activity-date">
                <span class="month">${activity.month}</span>
                <span class="day">${activity.date}</span>
            </div>
            <div class="activity-content">
                <h3>${activity.name}</h3>
                <p>${activity.desc}</p>
                <div class="activity-meta">
                    <span>📍 ${activity.location}</span>
                    ${activity.meta ? `<span>${activity.meta}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== 管理后台标签页 ====================

function loadAdminTabs() {
    loadTeamsList();
    loadCupAdminPanel();
    loadSchoolTeamAdmin();
    loadCoachesAdmin();
    loadPlayersAdmin('men');
    loadActivitiesAdmin();
    loadRefereesAdmin();
    loadRefStatsAdmin();
}

// ==================== 院队管理 ====================

function loadTeamsList() {
    const data = getData();
    const container = document.getElementById('teamsList');
    if (!container) return;

    container.innerHTML = data.teams.map(team => `
        <div class="data-item">
            <div class="data-item-info">
                <h4>${team.icon} ${team.name}</h4>
                <p>${team.slogan} | 🏆 ${team.champions}次冠军 | 👥 ${team.members}人</p>
            </div>
            <div class="data-item-actions">
                <button class="btn-edit" onclick="editTeam(${team.id})">编辑</button>
                <button class="btn-delete" onclick="deleteTeam(${team.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function showAddTeamModal() {
    document.getElementById('teamModalTitle').textContent = '添加院队';
    document.getElementById('teamId').value = '';
    document.getElementById('teamForm').reset();
    document.getElementById('teamModal').style.display = 'flex';
}

function editTeam(id) {
    const data = getData();
    const team = data.teams.find(t => t.id === id);
    if (!team) return;

    document.getElementById('teamModalTitle').textContent = '编辑院队';
    document.getElementById('teamId').value = team.id;
    document.getElementById('teamName').value = team.name;
    document.getElementById('teamSlogan').value = team.slogan;
    document.getElementById('teamIcon').value = team.icon;
    document.getElementById('teamChampions').value = team.champions;
    document.getElementById('teamMembers').value = team.members;
    document.getElementById('teamModal').style.display = 'flex';
}

function closeTeamModal() {
    document.getElementById('teamModal').style.display = 'none';
}

function saveTeam() {
    const data = getData();
    const id = document.getElementById('teamId').value;

    const team = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('teamName').value,
        slogan: document.getElementById('teamSlogan').value,
        icon: document.getElementById('teamIcon').value,
        champions: parseInt(document.getElementById('teamChampions').value) || 0,
        members: parseInt(document.getElementById('teamMembers').value) || 25
    };

    if (id) {
        const index = data.teams.findIndex(t => t.id === parseInt(id));
        if (index !== -1) {
            data.teams[index] = team;
        }
    } else {
        data.teams.push(team);
    }

    saveData(data);
    closeTeamModal();
    loadTeamsList();
    loadCollegeTeams();
    alert('保存成功！');
}

function deleteTeam(id) {
    if (!confirm('确定要删除这个院队吗？')) return;

    const data = getData();
    data.teams = data.teams.filter(t => t.id !== id);
    saveData(data);
    loadTeamsList();
    loadCollegeTeams();
    alert('删除成功！');
}

// ==================== 校长杯管理 ====================

let currentAdminCupYear = '2025';
let currentCupSubTab = 'ranking';

function loadCupAdminPanel() {
    const data = getData();
    const panel = document.getElementById('tab-ranking');
    if (!panel) return;

    // 年度标签
    let tabsHtml = '<div class="cup-year-tabs">';
    data.cupYears.forEach(year => {
        tabsHtml += `<button class="cup-year-tab ${year === currentAdminCupYear ? 'active' : ''}" onclick="switchCupAdminYear('${year}')">${year}年</button>`;
    });
    tabsHtml += `<button class="add-year-btn" onclick="addCupYear()">+ 新增年度</button>`;
    tabsHtml += '</div>';

    // 子标签
    tabsHtml += '<div class="sub-rank-tabs">';
    const subTabs = [
        { key: 'ranking', label: '积分榜' },
        { key: 'goals', label: '进球榜' },
        { key: 'assists', label: '助攻榜' },
        { key: 'awards', label: '奖项设置' }
    ];
    subTabs.forEach(tab => {
        tabsHtml += `<button class="sub-rank-tab ${tab.key === currentCupSubTab ? 'active' : ''}" onclick="switchCupSubTab('${tab.key}')">${tab.label}</button>`;
    });
    tabsHtml += '</div>';

    // 内容区域
    tabsHtml += '<div id="cupAdminContent"></div>';

    // 替换积分榜管理面板内容
    const oldHeader = panel.querySelector('.panel-header');
    const oldTable = panel.querySelector('.ranking-edit-table');
    if (oldHeader) oldHeader.remove();
    if (oldTable) oldTable.remove();

    panel.insertAdjacentHTML('afterbegin', tabsHtml);

    loadCupAdminContent();
}

function switchCupAdminYear(year) {
    currentAdminCupYear = year;
    loadCupAdminPanel();
}

function switchCupSubTab(tab) {
    currentCupSubTab = tab;
    document.querySelectorAll('.sub-rank-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.sub-rank-tab[onclick="switchCupSubTab('${tab}')"]`).classList.add('active');
    loadCupAdminContent();
}

function loadCupAdminContent() {
    const data = getData();
    const cupData = data.cupData[currentAdminCupYear];
    const content = document.getElementById('cupAdminContent');
    if (!content || !cupData) return;

    if (currentCupSubTab === 'ranking') {
        content.innerHTML = `
            <div class="ranking-edit-table">
                <table>
                    <thead>
                        <tr>
                            <th>球队</th>
                            <th>场次</th>
                            <th>胜</th>
                            <th>平</th>
                            <th>负</th>
                            <th>积分</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cupData.ranking.map((item, index) => `
                            <tr>
                                <td><input type="text" value="${item.team}" data-index="${index}" data-field="team" style="width: 120px;"></td>
                                <td><input type="number" value="${item.played}" data-index="${index}" data-field="played"></td>
                                <td><input type="number" value="${item.win}" data-index="${index}" data-field="win"></td>
                                <td><input type="number" value="${item.draw}" data-index="${index}" data-field="draw"></td>
                                <td><input type="number" value="${item.loss}" data-index="${index}" data-field="loss"></td>
                                <td><input type="number" value="${item.points}" data-index="${index}" data-field="points"></td>
                                <td><button class="btn-save" onclick="saveRankingRow(${index})">保存</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <button class="btn-add" style="margin-top: 15px;" onclick="addRankingRow()">+ 添加球队</button>
            <button class="btn-save" style="margin-top: 15px; margin-left: 10px;" onclick="saveAllRanking()">保存全部</button>
        `;
    } else if (currentCupSubTab === 'goals') {
        content.innerHTML = `
            <div class="ranking-edit-table">
                <table>
                    <thead>
                        <tr>
                            <th>球员</th>
                            <th>球队</th>
                            <th>号码</th>
                            <th>进球数</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cupData.goals.map((item, index) => `
                            <tr>
                                <td><input type="text" value="${item.name}" data-index="${index}" data-field="name" style="width: 100px;"></td>
                                <td><input type="text" value="${item.team}" data-index="${index}" data-field="team" style="width: 120px;"></td>
                                <td><input type="text" value="${item.number}" data-index="${index}" data-field="number" style="width: 60px;"></td>
                                <td><input type="number" value="${item.goals}" data-index="${index}" data-field="goals"></td>
                                <td>
                                    <button class="btn-edit" onclick="saveGoalsRow(${index})">保存</button>
                                    <button class="btn-delete" onclick="deleteGoalsRow(${index})">删除</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <button class="btn-add" style="margin-top: 15px;" onclick="addGoalsRow()">+ 添加球员</button>
        `;
    } else if (currentCupSubTab === 'assists') {
        content.innerHTML = `
            <div class="ranking-edit-table">
                <table>
                    <thead>
                        <tr>
                            <th>球员</th>
                            <th>球队</th>
                            <th>号码</th>
                            <th>助攻数</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cupData.assists.map((item, index) => `
                            <tr>
                                <td><input type="text" value="${item.name}" data-index="${index}" data-field="name" style="width: 100px;"></td>
                                <td><input type="text" value="${item.team}" data-index="${index}" data-field="team" style="width: 120px;"></td>
                                <td><input type="text" value="${item.number}" data-index="${index}" data-field="number" style="width: 60px;"></td>
                                <td><input type="number" value="${item.assists}" data-index="${index}" data-field="assists"></td>
                                <td>
                                    <button class="btn-edit" onclick="saveAssistsRow(${index})">保存</button>
                                    <button class="btn-delete" onclick="deleteAssistsRow(${index})">删除</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <button class="btn-add" style="margin-top: 15px;" onclick="addAssistsRow()">+ 添加球员</button>
        `;
    } else if (currentCupSubTab === 'awards') {
        const awards = cupData.awards;
        content.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label>金球奖 - 姓名</label>
                    <input type="text" id="award-golden-name" value="${awards.golden.name}">
                </div>
                <div class="form-group">
                    <label>金球奖 - 球队</label>
                    <input type="text" id="award-golden-team" value="${awards.golden.team}">
                </div>
                <div class="form-group">
                    <label>金球奖 - 照片</label>
                    <input type="file" accept="image/*" onchange="handleAwardPhotoUpload(this, 'golden')">
                </div>
                <div class="form-group">
                    <label>最佳新秀 - 姓名</label>
                    <input type="text" id="award-rookie-name" value="${awards.rookie.name}">
                </div>
                <div class="form-group">
                    <label>最佳新秀 - 球队</label>
                    <input type="text" id="award-rookie-team" value="${awards.rookie.team}">
                </div>
                <div class="form-group">
                    <label>最佳新秀 - 照片</label>
                    <input type="file" accept="image/*" onchange="handleAwardPhotoUpload(this, 'rookie')">
                </div>
                <div class="form-group">
                    <label>金手套奖 - 姓名</label>
                    <input type="text" id="award-glove-name" value="${awards.glove.name}">
                </div>
                <div class="form-group">
                    <label>金手套奖 - 球队</label>
                    <input type="text" id="award-glove-team" value="${awards.glove.team}">
                </div>
                <div class="form-group">
                    <label>金手套奖 - 照片</label>
                    <input type="file" accept="image/*" onchange="handleAwardPhotoUpload(this, 'glove')">
                </div>
            </div>
            <button class="btn-save" onclick="saveAwards()">保存奖项设置</button>
        `;
    }
}

function saveRankingRow(index) {
    const data = getData();
    const inputs = document.querySelectorAll(`input[data-index="${index}"]`);
    const row = {};
    inputs.forEach(input => {
        const field = input.dataset.field;
        row[field] = field === 'team' ? input.value : parseInt(input.value) || 0;
    });
    data.cupData[currentAdminCupYear].ranking[index] = row;
    saveData(data);
    loadRankingDisplay();
    alert('保存成功！');
}

function addRankingRow() {
    const data = getData();
    data.cupData[currentAdminCupYear].ranking.push({
        team: '新球队',
        played: 0,
        win: 0,
        draw: 0,
        loss: 0,
        points: 0
    });
    saveData(data);
    loadCupAdminContent();
    loadRankingDisplay();
}

function saveAllRanking() {
    const data = getData();
    const rows = data.cupData[currentAdminCupYear].ranking.length;
    for (let i = 0; i < rows; i++) {
        const inputs = document.querySelectorAll(`input[data-index="${i}"]`);
        inputs.forEach(input => {
            const field = input.dataset.field;
            data.cupData[currentAdminCupYear].ranking[i][field] = field === 'team' ? input.value : parseInt(input.value) || 0;
        });
    }
    saveData(data);
    loadRankingDisplay();
    alert('全部保存成功！');
}

function saveGoalsRow(index) {
    const data = getData();
    const inputs = document.querySelectorAll(`input[data-index="${index}"]`);
    inputs.forEach(input => {
        const field = input.dataset.field;
        data.cupData[currentAdminCupYear].goals[index][field] = field === 'goals' ? parseInt(input.value) || 0 : input.value;
    });
    saveData(data);
    loadRankingDisplay();
    alert('保存成功！');
}

function deleteGoalsRow(index) {
    if (!confirm('确定删除？')) return;
    const data = getData();
    data.cupData[currentAdminCupYear].goals.splice(index, 1);
    saveData(data);
    loadCupAdminContent();
    loadRankingDisplay();
}

function addGoalsRow() {
    const data = getData();
    data.cupData[currentAdminCupYear].goals.push({ name: '新球员', team: '', number: '', goals: 0 });
    saveData(data);
    loadCupAdminContent();
}

function saveAssistsRow(index) {
    const data = getData();
    const inputs = document.querySelectorAll(`input[data-index="${index}"]`);
    inputs.forEach(input => {
        const field = input.dataset.field;
        data.cupData[currentAdminCupYear].assists[index][field] = field === 'assists' ? parseInt(input.value) || 0 : input.value;
    });
    saveData(data);
    loadRankingDisplay();
    alert('保存成功！');
}

function deleteAssistsRow(index) {
    if (!confirm('确定删除？')) return;
    const data = getData();
    data.cupData[currentAdminCupYear].assists.splice(index, 1);
    saveData(data);
    loadCupAdminContent();
    loadRankingDisplay();
}

function addAssistsRow() {
    const data = getData();
    data.cupData[currentAdminCupYear].assists.push({ name: '新球员', team: '', number: '', assists: 0 });
    saveData(data);
    loadCupAdminContent();
}

function handleAwardPhotoUpload(input, awardType) {
    handleImageUpload(input, (photoData) => {
        const data = getData();
        data.cupData[currentAdminCupYear].awards[awardType].photo = photoData;
        saveData(data);
        loadRankingDisplay();
        alert('照片上传成功！');
    });
}

function saveAwards() {
    const data = getData();
    const awards = data.cupData[currentAdminCupYear].awards;

    awards.golden.name = document.getElementById('award-golden-name').value;
    awards.golden.team = document.getElementById('award-golden-team').value;
    awards.rookie.name = document.getElementById('award-rookie-name').value;
    awards.rookie.team = document.getElementById('award-rookie-team').value;
    awards.glove.name = document.getElementById('award-glove-name').value;
    awards.glove.team = document.getElementById('award-glove-team').value;

    saveData(data);
    loadRankingDisplay();
    alert('保存成功！');
}

function addCupYear() {
    const year = prompt('请输入年份（如：2026）：');
    if (!year || !/^\d{4}$/.test(year)) {
        alert('请输入有效的4位年份！');
        return;
    }

    const data = getData();
    if (data.cupYears.includes(year)) {
        alert('该年度已存在！');
        return;
    }

    data.cupYears.push(year);
    data.cupYears.sort().reverse();

    data.cupData[year] = {
        ranking: data.teams.map(team => ({
            team: team.name,
            played: 0,
            win: 0,
            draw: 0,
            loss: 0,
            points: 0
        })),
        goals: [],
        assists: [],
        awards: {
            golden: { name: '待定', team: '', photo: '' },
            rookie: { name: '待定', team: '', photo: '' },
            glove: { name: '待定', team: '', photo: '' }
        }
    };

    saveData(data);
    currentAdminCupYear = year;
    loadCupAdminPanel();

    // 更新前台年度选择器
    const yearSelect = document.getElementById('cupYearSelect');
    if (yearSelect) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year + '年校长杯';
        yearSelect.appendChild(option);
    }

    alert('新增年度成功！');
}

// ==================== 校队管理 ====================

function loadSchoolTeamAdmin() {
    const data = getData();
    const panel = document.getElementById('tab-schoolteam');
    if (!panel) return;

    // 更新基本信息表单
    const nameInput = document.getElementById('schoolTeamName');
    if (nameInput) nameInput.value = data.schoolTeam.name;

    const yearInput = document.getElementById('schoolTeamYear');
    if (yearInput) yearInput.value = data.schoolTeam.year;

    const membersInput = document.getElementById('schoolTeamMembers');
    if (membersInput) membersInput.value = data.schoolTeam.members;

    const coachesInput = document.getElementById('schoolTeamCoaches');
    if (coachesInput) coachesInput.value = data.schoolTeam.coaches;

    const honorsInput = document.getElementById('schoolTeamHonors');
    if (honorsInput) honorsInput.value = data.schoolTeam.honors;
}

function saveSchoolTeam() {
    const data = getData();
    data.schoolTeam = {
        name: document.getElementById('schoolTeamName').value,
        year: document.getElementById('schoolTeamYear').value,
        members: document.getElementById('schoolTeamMembers').value,
        coaches: document.getElementById('schoolTeamCoaches').value,
        honors: document.getElementById('schoolTeamHonors').value
    };
    saveData(data);
    loadSchoolTeamDisplay();
    alert('保存成功！');
}

// 教练管理
function loadCoachesAdmin() {
    const data = getData();
    const container = document.getElementById('coachesList');
    if (!container) return;

    container.innerHTML = data.coaches.map(coach => `
        <div class="data-item">
            <div class="data-item-info">
                <h4>${coach.name} - ${coach.title}</h4>
                <p>${coach.desc}</p>
            </div>
            <div class="data-item-actions">
                <button class="btn-edit" onclick="editCoach(${coach.id})">编辑</button>
                <button class="btn-delete" onclick="deleteCoach(${coach.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function showAddCoachModal() {
    document.getElementById('coachModalTitle').textContent = '添加教练';
    document.getElementById('coachId').value = '';
    document.getElementById('coachForm').reset();
    document.getElementById('coachModal').style.display = 'flex';
}

function editCoach(id) {
    const data = getData();
    const coach = data.coaches.find(c => c.id === id);
    if (!coach) return;

    document.getElementById('coachModalTitle').textContent = '编辑教练';
    document.getElementById('coachId').value = coach.id;
    document.getElementById('coachName').value = coach.name;
    document.getElementById('coachTitle').value = coach.title;
    document.getElementById('coachDesc').value = coach.desc;
    document.getElementById('coachModal').style.display = 'flex';
}

function closeCoachModal() {
    document.getElementById('coachModal').style.display = 'none';
}

function saveCoach() {
    const data = getData();
    const id = document.getElementById('coachId').value;

    const coach = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('coachName').value,
        title: document.getElementById('coachTitle').value,
        desc: document.getElementById('coachDesc').value,
        photo: id ? (data.coaches.find(c => c.id === parseInt(id))?.photo || '') : ''
    };

    if (id) {
        const index = data.coaches.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            coach.photo = data.coaches[index].photo;
            data.coaches[index] = coach;
        }
    } else {
        data.coaches.push(coach);
    }

    saveData(data);
    closeCoachModal();
    loadCoachesAdmin();
    loadSchoolTeamDisplay();
    alert('保存成功！');
}

function deleteCoach(id) {
    if (!confirm('确定要删除这个教练吗？')) return;

    const data = getData();
    data.coaches = data.coaches.filter(c => c.id !== id);
    saveData(data);
    loadCoachesAdmin();
    loadSchoolTeamDisplay();
    alert('删除成功！');
}

// 球员管理
let currentPlayersTeam = 'men';

function loadPlayersAdmin(team) {
    currentPlayersTeam = team;
    const data = getData();
    const squadEditor = document.getElementById('squadEditor');
    if (!squadEditor) return;

    const players = team === 'men' ? data.menPlayers : data.womenPlayers;
    const teamName = team === 'men' ? '男子校队' : '女子校队';

    squadEditor.innerHTML = `
        <div class="sub-rank-tabs">
            <button class="sub-rank-tab ${team === 'men' ? 'active' : ''}" onclick="loadPlayersAdmin('men')">男子校队</button>
            <button class="sub-rank-tab ${team === 'women' ? 'active' : ''}" onclick="loadPlayersAdmin('women')">女子校队</button>
        </div>
        <h4 style="margin-bottom: 15px;">${teamName}（共${players.length}名球员）</h4>
        <div style="max-height: 400px; overflow-y: auto;">
            <table class="ranking-table">
                <thead>
                    <tr>
                        <th>号码</th>
                        <th>姓名</th>
                        <th>位置</th>
                        <th>照片</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${players.map((player, index) => `
                        <tr>
                            <td><input type="text" value="${player.number}" data-index="${index}" data-field="number" style="width: 60px;"></td>
                            <td><input type="text" value="${player.name}" data-index="${index}" data-field="name" style="width: 100px;"></td>
                            <td>
                                <select data-index="${index}" data-field="position" style="width: 100px;">
                                    <option value="前锋" ${player.position === '前锋' ? 'selected' : ''}>前锋</option>
                                    <option value="中场" ${player.position === '中场' ? 'selected' : ''}>中场</option>
                                    <option value="后卫" ${player.position === '后卫' ? 'selected' : ''}>后卫</option>
                                    <option value="守门员" ${player.position === '守门员' ? 'selected' : ''}>守门员</option>
                                </select>
                            </td>
                            <td>
                                <input type="file" accept="image/*" onchange="handlePlayerPhotoUpload(this, ${index}, '${team}')" style="width: 120px; font-size: 12px;">
                            </td>
                            <td>
                                <button class="btn-edit" onclick="savePlayer(${index}, '${team}')">保存</button>
                                <button class="btn-delete" onclick="deletePlayer(${index}, '${team}')">删除</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <button class="btn-add" style="margin-top: 15px;" onclick="addPlayer('${team}')">+ 添加球员</button>
    `;
}

function handlePlayerPhotoUpload(input, index, team) {
    handleImageUpload(input, (photoData) => {
        const data = getData();
        const players = team === 'men' ? data.menPlayers : data.womenPlayers;
        players[index].photo = photoData;
        saveData(data);
        loadSchoolTeamDisplay();
        alert('照片上传成功！');
    });
}

function savePlayer(index, team) {
    const data = getData();
    const players = team === 'men' ? data.menPlayers : data.womenPlayers;
    const row = document.querySelectorAll(`tr input[data-index="${index}"], tr select[data-index="${index}"]`);

    row.forEach(el => {
        const field = el.dataset.field;
        players[index][field] = el.value;
    });

    saveData(data);
    loadSchoolTeamDisplay();
    alert('保存成功！');
}

function deletePlayer(index, team) {
    if (!confirm('确定删除该球员？')) return;

    const data = getData();
    const players = team === 'men' ? data.menPlayers : data.womenPlayers;
    players.splice(index, 1);
    saveData(data);
    loadPlayersAdmin(team);
    loadSchoolTeamDisplay();
    alert('删除成功！');
}

function addPlayer(team) {
    const data = getData();
    const players = team === 'men' ? data.menPlayers : data.womenPlayers;

    players.push({
        id: Date.now(),
        number: (players.length + 1).toString(),
        name: '新球员',
        position: '前锋',
        photo: ''
    });

    saveData(data);
    loadPlayersAdmin(team);
    loadSchoolTeamDisplay();
}

// ==================== 活动管理 ====================

function loadActivitiesAdmin() {
    const data = getData();
    const container = document.getElementById('activitiesList');
    if (!container) return;

    const statusMap = { upcoming: '即将开始', ongoing: '进行中', ended: '已结束' };

    container.innerHTML = data.activities.map(activity => `
        <div class="data-item">
            <div class="data-item-info">
                <h4>${activity.name}</h4>
                <p>${activity.month} ${activity.date} | ${activity.location} | ${statusMap[activity.status]}</p>
            </div>
            <div class="data-item-actions">
                <button class="btn-edit" onclick="editActivity(${activity.id})">编辑</button>
                <button class="btn-delete" onclick="deleteActivity(${activity.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function showAddActivityModal() {
    document.getElementById('activityModalTitle').textContent = '添加活动';
    document.getElementById('activityId').value = '';
    document.getElementById('activityForm').reset();
    document.getElementById('activityModal').style.display = 'flex';
}

function editActivity(id) {
    const data = getData();
    const activity = data.activities.find(a => a.id === id);
    if (!activity) return;

    document.getElementById('activityModalTitle').textContent = '编辑活动';
    document.getElementById('activityId').value = activity.id;
    document.getElementById('activityName').value = activity.name;
    document.getElementById('activityDesc').value = activity.desc;
    document.getElementById('activityDate').value = activity.date;
    document.getElementById('activityMonth').value = activity.month;
    document.getElementById('activityLocation').value = activity.location;
    document.getElementById('activityStatus').value = activity.status;
    document.getElementById('activityMeta').value = activity.meta || '';
    document.getElementById('activityModal').style.display = 'flex';
}

function closeActivityModal() {
    document.getElementById('activityModal').style.display = 'none';
}

function saveActivity() {
    const data = getData();
    const id = document.getElementById('activityId').value;

    const activity = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('activityName').value,
        desc: document.getElementById('activityDesc').value,
        date: document.getElementById('activityDate').value,
        month: document.getElementById('activityMonth').value,
        location: document.getElementById('activityLocation').value,
        status: document.getElementById('activityStatus').value,
        meta: document.getElementById('activityMeta').value
    };

    if (id) {
        const index = data.activities.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            data.activities[index] = activity;
        }
    } else {
        data.activities.push(activity);
    }

    saveData(data);
    closeActivityModal();
    loadActivitiesAdmin();
    loadActivitiesDisplay();
    alert('保存成功！');
}

function deleteActivity(id) {
    if (!confirm('确定要删除这个活动吗？')) return;

    const data = getData();
    data.activities = data.activities.filter(a => a.id !== id);
    saveData(data);
    loadActivitiesAdmin();
    loadActivitiesDisplay();
    alert('删除成功！');
}

// ==================== 主裁管理 ====================

function loadRefereesAdmin() {
    const data = getData();
    const container = document.getElementById('refereeList');
    if (!container) return;

    container.innerHTML = data.referees.map(ref => `
        <div class="data-item">
            <div class="data-item-info">
                <h4>${ref.name} - ${ref.level}</h4>
                <p>${ref.desc}</p>
            </div>
            <div class="data-item-actions">
                <button class="btn-edit" onclick="editReferee(${ref.id})">编辑</button>
                <button class="btn-delete" onclick="deleteReferee(${ref.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function showAddRefereeModal() {
    document.getElementById('refereeModalTitle').textContent = '添加主裁';
    document.getElementById('refereeId').value = '';
    document.getElementById('refereeForm').reset();
    document.getElementById('refereeModal').style.display = 'flex';
}

function editReferee(id) {
    const data = getData();
    const referee = data.referees.find(r => r.id === id);
    if (!referee) return;

    document.getElementById('refereeModalTitle').textContent = '编辑主裁';
    document.getElementById('refereeId').value = referee.id;
    document.getElementById('refereeName').value = referee.name;
    document.getElementById('refereeLevel').value = referee.level;
    document.getElementById('refereeDesc').value = referee.desc;
    document.getElementById('refereeModal').style.display = 'flex';
}

function closeRefereeModal() {
    document.getElementById('refereeModal').style.display = 'none';
}

function saveReferee() {
    const data = getData();
    const id = document.getElementById('refereeId').value;

    const referee = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('refereeName').value,
        level: document.getElementById('refereeLevel').value,
        desc: document.getElementById('refereeDesc').value,
        photo: id ? (data.referees.find(r => r.id === parseInt(id))?.photo || '') : ''
    };

    if (id) {
        const index = data.referees.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            referee.photo = data.referees[index].photo;
            data.referees[index] = referee;
        }
    } else {
        data.referees.push(referee);
    }

    saveData(data);
    closeRefereeModal();
    loadRefereesAdmin();
    loadRefereeDisplay();
    alert('保存成功！');
}

function deleteReferee(id) {
    if (!confirm('确定要删除这个主裁吗？')) return;

    const data = getData();
    data.referees = data.referees.filter(r => r.id !== id);
    saveData(data);
    loadRefereesAdmin();
    loadRefereeDisplay();
    alert('删除成功！');
}

function loadRefStatsAdmin() {
    const data = getData();
    document.getElementById('refTotal').value = data.refStats.total;
    document.getElementById('refLevel1').value = data.refStats.level1;
    document.getElementById('refMatches').value = data.refStats.matches;
    document.getElementById('refRating').value = data.refStats.rating;
}

function saveRefStats() {
    const data = getData();
    data.refStats = {
        total: document.getElementById('refTotal').value,
        level1: document.getElementById('refLevel1').value,
        matches: document.getElementById('refMatches').value,
        rating: document.getElementById('refRating').value
    };
    saveData(data);
    loadRefereeDisplay();
    alert('保存成功！');
}

// ==================== 系统设置 ====================

function changeAdminPassword() {
    const newPwd = document.getElementById('newAdminPwd').value;
    const confirmPwd = document.getElementById('confirmAdminPwd').value;

    if (!newPwd) {
        alert('请输入新密码！');
        return;
    }

    if (newPwd !== confirmPwd) {
        alert('两次输入的密码不一致！');
        return;
    }

    const data = getData();
    data.adminPassword = newPwd;
    saveData(data);

    document.getElementById('newAdminPwd').value = '';
    document.getElementById('confirmAdminPwd').value = '';

    alert('密码修改成功！');
}

function resetAllData() {
    if (!confirm('确定要重置所有数据吗？此操作不可恢复！')) return;
    if (!confirm('再次确认：所有数据将被清空！')) return;

    localStorage.removeItem('footballAdminData');
    localStorage.setItem('footballAdminData', JSON.stringify(defaultData));

    initFrontendDisplay();
    loadAdminTabs();

    alert('数据已重置为默认值！');
}

// ==================== 初始化表单处理 ====================

document.addEventListener('DOMContentLoaded', () => {
    // 院队表单
    const teamForm = document.getElementById('teamForm');
    if (teamForm) {
        teamForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveTeam();
        });
    }

    // 教练表单
    const coachForm = document.getElementById('coachForm');
    if (coachForm) {
        coachForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveCoach();
        });
    }

    // 活动表单
    const activityForm = document.getElementById('activityForm');
    if (activityForm) {
        activityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveActivity();
        });
    }

    // 主裁表单
    const refereeForm = document.getElementById('refereeForm');
    if (refereeForm) {
        refereeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveReferee();
        });
    }

    // 点击模态框外部关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // 最近比赛表单
    const recentMatchForm = document.getElementById('recentMatchForm');
    if (recentMatchForm) {
        recentMatchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveRecentMatch();
        });
    }

    // 荣誉之星表单
    const honorForm = document.getElementById('honorForm');
    if (honorForm) {
        honorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveHonorStar();
        });
    }

    // 队徽上传
    const teamLogoUpload = document.getElementById('teamLogoUpload');
    if (teamLogoUpload) {
        teamLogoUpload.addEventListener('change', (e) => {
            handleImageUpload(e.target, (result) => {
                tempTeamLogo = result;
                const preview = document.getElementById('teamLogoPreview');
                preview.innerHTML = `<img src="${result}" alt="队徽">`;
                document.querySelector('#teamLogoUpload + .btn-remove').style.display = 'inline-block';
            });
        });
    }

    // 荣誉之星照片上传
    const honorPhotoUpload = document.getElementById('honorPhotoUpload');
    if (honorPhotoUpload) {
        honorPhotoUpload.addEventListener('change', (e) => {
            handleImageUpload(e.target, (result) => {
                tempHonorPhoto = result;
                const preview = document.getElementById('honorPhotoPreview');
                preview.innerHTML = `<img src="${result}" alt="照片">`;
                document.getElementById('honorPhotoRemoveBtn').style.display = 'inline-block';
            });
        });
    }
});

// ==================== 临时变量 ====================
let tempTeamLogo = '';
let tempHonorPhoto = '';
let editingTeamId = null;
let editingHonorId = null;
let editingRecentMatchId = null;

// ==================== 扩展默认数据 ====================
// 在defaultData的teams中添加logo字段，新增homeMatch、recentMatches、honorStars、knockout数据
const extendedDefaultData = {
    teams: [
        { id: 1, name: '计算机学院', slogan: '代码写得好，足球踢得棒', icon: '🔵', champions: 2, members: 25, logo: '' },
        { id: 2, name: '机械工程学院', slogan: '机械机械，永不言败', icon: '🔴', champions: 1, members: 28, logo: '' },
        { id: 3, name: '经济管理学院', slogan: '经管经管，锐不可当', icon: '🟢', champions: 3, members: 22, logo: '' },
        { id: 4, name: '电气工程学院', slogan: '电气电气，充满电力', icon: '🟡', champions: 1, members: 26, logo: '' },
        { id: 5, name: '土木工程学院', slogan: '土木土木，牢不可破', icon: '🟣', champions: 0, members: 24, logo: '' },
        { id: 6, name: '艺术设计学院', slogan: '艺术足球，赏心悦目', icon: '🟠', champions: 0, members: 20, logo: '' },
        { id: 7, name: '外国语学院', slogan: '外语外语，世界之窗', icon: '⚫', champions: 0, members: 18, logo: '' },
        { id: 8, name: '生物医药学院', slogan: '生医生医，健康第一', icon: '⚪', champions: 0, members: 20, logo: '' }
    ],
    homeMatch: {
        homeTeam: '计算机学院',
        awayTeam: '机械工程学院',
        dateTime: '',
        location: '坪山公园足球场',
        liveUrl: ''
    },
    recentMatches: [
        { id: 1, homeTeam: '经济管理学院', awayTeam: '计算机学院', homeScore: 2, awayScore: 1, date: '2025-06-20', location: '坪山公园足球场' },
        { id: 2, homeTeam: '机械工程学院', awayTeam: '电气工程学院', homeScore: 3, awayScore: 0, date: '2025-06-18', location: '坪山公园足球场' },
        { id: 3, homeTeam: '土木工程学院', awayTeam: '艺术设计学院', homeScore: 1, awayScore: 1, date: '2025-06-15', location: '坪山公园足球场' }
    ],
    honorStars: [
        {
            id: 1,
            name: '李明',
            photo: '',
            gradYear: '2023届',
            position: '前锋',
            number: '10号',
            college: '计算机学院',
            achievements: '🥇 2022年校长杯冠军\n⚽ 2022年金球奖\n🎯 2022年射手王',
            bio: '李明同学是计算机学院传奇前锋，在校期间为球队打入50余粒进球。他技术全面，速度快，射门精准，是球队当之无愧的进攻核心。2022年带领计算机学院夺得校长杯冠军，个人包揽金球奖和金靴奖。毕业后继续活跃在业余足坛，传承足球精神。'
        },
        {
            id: 2,
            name: '王芳',
            photo: '',
            gradYear: '2022届',
            position: '中场',
            number: '8号',
            college: '经济管理学院',
            achievements: '🥇 2021年校长杯冠军\n👑 2021年金球奖\n🎯 2021年助攻王',
            bio: '王芳是经济管理学院的中场指挥官，视野开阔，传球精准，是球队攻防转换的枢纽。她不仅自己能得分，更能为队友创造机会，2021赛季助攻数创历史新高。毕业后进入知名企业工作，依然每周坚持踢球。'
        },
        {
            id: 3,
            name: '张伟',
            photo: '',
            gradYear: '2021届',
            position: '守门员',
            number: '1号',
            college: '机械工程学院',
            achievements: '🧤 2020年金手套奖\n🥈 2020年校长杯亚军\n⭐ 连续三届最佳门将',
            bio: '张伟是机械工程学院的门神，反应敏捷，扑救果断，职业生涯零封场次超过30场。他在2020赛季创造了单赛季仅失5球的纪录，连续三年获得最佳门将称号。现就职于某科技公司，担任业余队守门员教练。'
        }
    ],
    knockoutData: {
        '2025': {
            quarterfinals: [
                { home: '经济管理学院', away: '生物医药学院', homeScore: 3, awayScore: 1, winner: 'home' },
                { home: '计算机学院', away: '外国语学院', homeScore: 2, awayScore: 0, winner: 'home' },
                { home: '机械工程学院', away: '艺术设计学院', homeScore: 2, awayScore: 1, winner: 'home' },
                { home: '电气工程学院', away: '土木工程学院', homeScore: 1, awayScore: 2, winner: 'away' }
            ],
            semifinals: [
                { home: '经济管理学院', away: '土木工程学院', homeScore: 2, awayScore: 1, winner: 'home' },
                { home: '计算机学院', away: '机械工程学院', homeScore: 1, awayScore: 2, winner: 'away' }
            ],
            final: { home: '经济管理学院', away: '机械工程学院', homeScore: 2, awayScore: 1, winner: 'home' },
            champion: '经济管理学院'
        }
    }
};

// 确保数据包含所有新字段
function ensureDataFields() {
    const data = getData();
    let modified = false;

    // 为team添加logo字段
    if (data.teams && data.teams.length > 0 && data.teams[0].logo === undefined) {
        data.teams.forEach(team => { team.logo = ''; });
        modified = true;
    }

    // 添加homeMatch
    if (!data.homeMatch) {
        data.homeMatch = JSON.parse(JSON.stringify(extendedDefaultData.homeMatch));
        modified = true;
    }

    // 添加recentMatches
    if (!data.recentMatches) {
        data.recentMatches = JSON.parse(JSON.stringify(extendedDefaultData.recentMatches));
        modified = true;
    }

    // 添加honorStars
    if (!data.honorStars) {
        data.honorStars = JSON.parse(JSON.stringify(extendedDefaultData.honorStars));
        modified = true;
    }

    // 添加knockoutData
    if (!data.knockoutData) {
        data.knockoutData = JSON.parse(JSON.stringify(extendedDefaultData.knockoutData));
        modified = true;
    }

    if (modified) {
        saveData(data);
    }
}

// ==================== 首页比赛显示 ====================
let countdownInterval = null;

function loadHomeMatchDisplay() {
    ensureDataFields();
    const data = getData();

    // 加载下一场比赛
    if (data.homeMatch && data.homeMatch.homeTeam) {
        const homeTeam = data.teams.find(t => t.name === data.homeMatch.homeTeam);
        const awayTeam = data.teams.find(t => t.name === data.homeMatch.awayTeam);

        const homeBadge = document.getElementById('countdownHomeBadge');
        const awayBadge = document.getElementById('countdownAwayBadge');
        const homeName = document.getElementById('countdownHomeName');
        const awayName = document.getElementById('countdownAwayName');

        if (homeBadge) {
            homeBadge.innerHTML = homeTeam && homeTeam.logo
                ? `<img src="${homeTeam.logo}" alt="${data.homeMatch.homeTeam}">`
                : (homeTeam ? homeTeam.icon : '🔵');
        }
        if (awayBadge) {
            awayBadge.innerHTML = awayTeam && awayTeam.logo
                ? `<img src="${awayTeam.logo}" alt="${data.homeMatch.awayTeam}">`
                : (awayTeam ? awayTeam.icon : '🔴');
        }
        if (homeName) homeName.textContent = data.homeMatch.homeTeam;
        if (awayName) awayName.textContent = data.homeMatch.awayTeam;

        const matchTime = document.getElementById('countdownMatchTime');
        const matchLocation = document.getElementById('countdownMatchLocation');
        const liveSection = document.getElementById('matchLiveSection');
        const liveUrl = document.getElementById('matchLiveUrl');

        if (matchTime && data.homeMatch.dateTime) {
            const date = new Date(data.homeMatch.dateTime);
            matchTime.textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        }
        if (matchLocation) matchLocation.textContent = '📍 ' + (data.homeMatch.location || '坪山公园足球场');
        if (liveUrl && data.homeMatch.liveUrl) {
            liveUrl.href = data.homeMatch.liveUrl;
            liveSection.style.display = 'block';
        } else if (liveSection) {
            liveSection.style.display = 'none';
        }

        // 启动倒计时
        startCountdown(data.homeMatch.dateTime);
    }

    // 加载最近比赛
    loadRecentMatchesDisplay();
}

function startCountdown(dateTimeStr) {
    if (countdownInterval) clearInterval(countdownInterval);
    if (!dateTimeStr) return;

    const targetDate = new Date(dateTimeStr).getTime();

    function update() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('cd-days').textContent = '00';
            document.getElementById('cd-hours').textContent = '00';
            document.getElementById('cd-minutes').textContent = '00';
            document.getElementById('cd-seconds').textContent = '00';
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
    }

    update();
    countdownInterval = setInterval(update, 1000);
}

function loadRecentMatchesDisplay() {
    ensureDataFields();
    const data = getData();
    const container = document.getElementById('recentMatches');
    if (!container || !data.recentMatches) return;

    container.innerHTML = data.recentMatches.map(match => {
        const homeTeam = data.teams.find(t => t.name === match.homeTeam);
        const awayTeam = data.teams.find(t => t.name === match.awayTeam);
        const homeBadge = homeTeam && homeTeam.logo
            ? `<img src="${homeTeam.logo}" alt="${match.homeTeam}">`
            : (homeTeam ? homeTeam.icon : '🔵');
        const awayBadge = awayTeam && awayTeam.logo
            ? `<img src="${awayTeam.logo}" alt="${match.awayTeam}">`
            : (awayTeam ? awayTeam.icon : '🔴');

        const date = new Date(match.date);
        const dateStr = `${date.getMonth() + 1}月${date.getDate()}日`;

        return `
            <div class="recent-match-card">
                <div class="recent-match-teams">
                    <div class="recent-match-team">
                        <div class="team-badge">${homeBadge}</div>
                        <span class="recent-match-team-name">${match.homeTeam}</span>
                    </div>
                    <div class="recent-match-score">${match.homeScore} - ${match.awayScore}</div>
                    <div class="recent-match-team">
                        <span class="recent-match-team-name">${match.awayTeam}</span>
                        <div class="team-badge">${awayBadge}</div>
                    </div>
                </div>
                <div class="recent-match-meta">
                    <div>${dateStr}</div>
                    <div>📍 ${match.location || '坪山公园足球场'}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ==================== 荣誉之星显示 ====================
function loadHonorStarsDisplay() {
    ensureDataFields();
    const data = getData();
    const grid = document.getElementById('honorStarsGrid');
    if (!grid || !data.honorStars) return;

    grid.innerHTML = data.honorStars.map(star => `
        <div class="honor-star-card" onclick="showHonorDetail(${star.id})">
            <div class="honor-star-photo">
                ${star.photo ? `<img src="${star.photo}" alt="${star.name}">` : '⭐'}
            </div>
            <div class="honor-star-info">
                <div class="honor-star-name">${star.name}</div>
                <div class="honor-star-meta">${star.gradYear} · ${star.position}</div>
                <div class="honor-star-tag">${star.college}</div>
            </div>
        </div>
    `).join('');
}

function showHonorDetail(id) {
    ensureDataFields();
    const data = getData();
    const star = data.honorStars.find(s => s.id === id);
    if (!star) return;

    const achievements = star.achievements
        .split('\n')
        .filter(a => a.trim())
        .map(a => `<li>${a.trim()}</li>`)
        .join('');

    const content = document.getElementById('honorDetailContent');
    content.innerHTML = `
        <div class="honor-detail-header">
            <div class="honor-detail-photo">
                ${star.photo ? `<img src="${star.photo}" alt="${star.name}">` : '⭐'}
            </div>
            <div class="honor-detail-info">
                <h3 class="honor-detail-name">${star.name}</h3>
                <div class="honor-detail-subtitle">
                    ${star.gradYear}毕业<br>
                    场上位置：${star.position} · 球衣号码：${star.number}<br>
                    所属学院：${star.college}
                </div>
                <div class="honor-detail-achievements">
                    <h4>主要荣誉</h4>
                    <ul>${achievements}</ul>
                </div>
            </div>
        </div>
        <div class="honor-detail-bio">
            <h3>球员介绍</h3>
            <p>${star.bio || '暂无介绍'}</p>
        </div>
    `;

    document.getElementById('honorDetailModal').style.display = 'flex';
}

function closeHonorDetail() {
    document.getElementById('honorDetailModal').style.display = 'none';
}

// ==================== 底部年度选择器 ====================
function loadYearSwitcher() {
    const data = getData();
    const track = document.getElementById('yearSwitcherTrack');
    if (!track) return;

    track.innerHTML = data.cupYears.map(year => `
        <button class="year-switcher-btn ${year === data.currentCupYear ? 'active' : ''}" onclick="switchCupYear('${year}')">${year}年</button>
    `).join('');
}

function switchCupYear(year) {
    const data = getData();
    data.currentCupYear = year;
    saveData(data);
    loadYearSwitcher();
    loadRankingDisplay();
    loadKnockoutDisplay();
    loadCollegeTeams();
}

// 兼容旧函数名
function changeCupYear(year) {
    switchCupYear(year);
}

// ==================== 淘汰赛显示（懂球帝风格树形对阵图） ====================
function loadKnockoutDisplay() {
    ensureDataFields();
    const data = getData();
    const year = data.currentCupYear;
    const bracket = document.getElementById('knockoutBracket');
    if (!bracket) return;

    const knockout = data.knockoutData && data.knockoutData[year];
    if (!knockout) {
        bracket.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">暂无淘汰赛数据</p>';
        return;
    }

    function getTeamBadge(teamName) {
        const team = data.teams.find(t => t.name === teamName);
        return team && team.logo
            ? `<img src="${team.logo}" alt="${teamName}">`
            : (team ? team.icon : '⚽');
    }

    function getTeamBadgeHtml(teamName) {
        return `<div class="team-badge">${getTeamBadge(teamName)}</div>`;
    }

    // 左侧：第1、2场四分之一决赛 + 第1场半决赛
    // 右侧：第3、4场四分之一决赛 + 第2场半决赛
    const qf = knockout.quarterfinals;
    const sf = knockout.semifinals;
    const final = knockout.final;

    // 左侧半决赛胜者
    const leftSemiWinner = sf[0].winner === 'home' ? sf[0].home : sf[0].away;
    const leftSemiWinnerScore = sf[0].winner === 'home' ? sf[0].homeScore : sf[0].awayScore;
    const leftSemiLoserScore = sf[0].winner === 'home' ? sf[0].awayScore : sf[0].homeScore;

    // 右侧半决赛胜者
    const rightSemiWinner = sf[1].winner === 'home' ? sf[1].home : sf[1].away;
    const rightSemiWinnerScore = sf[1].winner === 'home' ? sf[1].homeScore : sf[1].awayScore;
    const rightSemiLoserScore = sf[1].winner === 'home' ? sf[1].awayScore : sf[1].homeScore;

    const championTeam = data.teams.find(t => t.name === knockout.champion);
    const championBadge = championTeam && championTeam.logo
        ? `<img src="${championTeam.logo}" alt="${knockout.champion}">`
        : (championTeam ? championTeam.icon : '🏆');

    // 三四名（半决赛负者）
    const thirdPlace = knockout.thirdPlace;
    let thirdPlaceHtml = '';
    if (thirdPlace) {
        const thirdWinner = thirdPlace.winner === 'home' ? thirdPlace.home : thirdPlace.away;
        thirdPlaceHtml = `
            <div class="bracket-third-place">
                <div class="bracket-third-title">🥉 三四名决赛</div>
                <div class="third-match">
                    <div class="third-team ${thirdPlace.winner === 'home' ? 'winner' : ''}">
                        <span class="team-badge">${getTeamBadge(thirdPlace.home)}</span>
                        <span>${thirdPlace.home}</span>
                        <span style="font-weight: 700;">${thirdPlace.homeScore}</span>
                    </div>
                    <span style="color: #94a3b8; font-weight: 600;">VS</span>
                    <div class="third-team ${thirdPlace.winner === 'away' ? 'winner' : ''}">
                        <span style="font-weight: 700;">${thirdPlace.awayScore}</span>
                        <span>${thirdPlace.away}</span>
                        <span class="team-badge">${getTeamBadge(thirdPlace.away)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    bracket.innerHTML = `
        <div class="bracket-tree">
            <!-- 左侧半区 -->
            <div class="bracket-side left-side">
                <div class="bracket-round-label">四分之一决赛</div>
                
                <div class="bracket-fixture">
                    <div class="bracket-team-card ${qf[0].winner === 'home' ? 'winner' : 'loser'}">
                        ${getTeamBadgeHtml(qf[0].home)}
                        <span class="bracket-team-name">${qf[0].home}</span>
                        <span class="bracket-team-score">${qf[0].homeScore}</span>
                    </div>
                </div>
                
                <div class="bracket-fixture">
                    <div class="bracket-team-card ${qf[0].winner === 'away' ? 'winner' : 'loser'}">
                        ${getTeamBadgeHtml(qf[0].away)}
                        <span class="bracket-team-name">${qf[0].away}</span>
                        <span class="bracket-team-score">${qf[0].awayScore}</span>
                    </div>
                </div>

                <div class="bracket-round-label" style="margin-top: 20px;">半决赛</div>

                <div class="bracket-fixture" style="margin-top: 30px; margin-bottom: 30px;">
                    <div class="bracket-team-card ${sf[0].winner === 'home' ? 'winner' : 'loser'}">
                        ${getTeamBadgeHtml(sf[0].home)}
                        <span class="bracket-team-name">${sf[0].home}</span>
                        <span class="bracket-team-score">${sf[0].homeScore}</span>
                    </div>
                </div>
                
                <div class="bracket-fixture">
                    <div class="bracket-team-card ${qf[1].winner === 'home' ? 'winner' : 'loser'}">
                        ${getTeamBadgeHtml(qf[1].home)}
                        <span class="bracket-team-name">${qf[1].home}</span>
                        <span class="bracket-team-score">${qf[1].homeScore}</span>
                    </div>
                </div>
                
                <div class="bracket-fixture">
                    <div class="bracket-team-card ${qf[1].winner === 'away' ? 'winner' : 'loser'}">
                        ${getTeamBadgeHtml(qf[1].away)}
                        <span class="bracket-team-name">${qf[1].away}</span>
                        <span class="bracket-team-score">${qf[1].awayScore}</span>
                    </div>
                </div>
            </div>

            <!-- 中间决赛区 -->
            <div class="bracket-center">
                <div class="bracket-final">
                    <div class="bracket-round-label" style="margin-bottom: 10px;">决赛</div>
                    <div class="bracket-final-vs">
                        <div class="bracket-final-team ${final.winner === 'home' ? 'winner' : 'loser'}">
                            <div class="final-badge">${getTeamBadge(final.home)}</div>
                            <div class="final-name">${final.home}</div>
                            <div class="final-score">${final.homeScore}</div>
                        </div>
                        <div class="bracket-final-vs-text">VS</div>
                        <div class="bracket-final-team ${final.winner === 'away' ? 'winner' : 'loser'}">
                            <div class="final-badge">${getTeamBadge(final.away)}</div>
                            <div class="final-name">${final.away}</div>
                            <div class="final-score">${final.awayScore}</div>
                        </div>
                    </div>
                    
                    <!-- 冠军 -->
                    <div class="bracket-champion-section">
                        <div class="bracket-champion">
                            <div class="champion-badge">${championBadge}</div>
                            <div class="champion-name">${knockout.champion}</div>
                            <div class="champion-label">🏆 校长杯冠军</div>
                        </div>
                    </div>
                    
                    ${thirdPlaceHtml}
                </div>
            </div>

            <!-- 右侧半区 -->
            <div class="bracket-side right-side">
                <div class="bracket-round-label">四分之一决赛</div>
                
                <div class="bracket-fixture">
                    <div class="bracket-team-card ${qf[2].winner === 'home' ? 'winner' : 'loser'}">
                        <span class="bracket-team-score">${qf[2].homeScore}</span>
                        <span class="bracket-team-name">${qf[2].home}</span>
                        ${getTeamBadgeHtml(qf[2].home)}
                    </div>
                </div>
                
                <div class="bracket-fixture">
                    <div class="bracket-team-card ${qf[2].winner === 'away' ? 'winner' : 'loser'}">
                        <span class="bracket-team-score">${qf[2].awayScore}</span>
                        <span class="bracket-team-name">${qf[2].away}</span>
                        ${getTeamBadgeHtml(qf[2].away)}
                    </div>
                </div>

                <div class="bracket-round-label" style="margin-top: 20px;">半决赛</div>

                <div class="bracket-fixture" style="margin-top: 30px; margin-bottom: 30px;">
                    <div class="bracket-team-card ${sf[1].winner === 'home' ? 'winner' : 'loser'}">
                        <span class="bracket-team-score">${sf[1].homeScore}</span>
                        <span class="bracket-team-name">${sf[1].home}</span>
                        ${getTeamBadgeHtml(sf[1].home)}
                    </div>
                </div>
                
                <div class="bracket-fixture">
                    <div class="bracket-team-card ${qf[3].winner === 'home' ? 'winner' : 'loser'}">
                        <span class="bracket-team-score">${qf[3].homeScore}</span>
                        <span class="bracket-team-name">${qf[3].home}</span>
                        ${getTeamBadgeHtml(qf[3].home)}
                    </div>
                </div>
                
                <div class="bracket-fixture">
                    <div class="bracket-team-card ${qf[3].winner === 'away' ? 'winner' : 'loser'}">
                        <span class="bracket-team-score">${qf[3].awayScore}</span>
                        <span class="bracket-team-name">${qf[3].away}</span>
                        ${getTeamBadgeHtml(qf[3].away)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==================== 榜单标签切换（新） ====================
function switchRankTab(tab) {
    const tabs = document.querySelectorAll('.rank-tab');
    const panels = document.querySelectorAll('.rank-panel');

    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    const activeTab = document.querySelector(`.rank-tab[data-rank="${tab}"]`);
    if (activeTab) activeTab.classList.add('active');

    const activePanel = document.getElementById('rank-' + tab);
    if (activePanel) activePanel.classList.add('active');
}

// ==================== 院队显示（添加队徽） ====================
function loadCollegeTeams() {
    ensureDataFields();
    const data = getData();
    const grid = document.getElementById('collegeTeamsGrid');
    if (!grid) return;

    grid.innerHTML = data.teams.map(team => {
        const badge = team.logo
            ? `<div class="team-icon"><img src="${team.logo}" alt="${team.name}"></div>`
            : `<div class="team-icon">${team.icon}</div>`;
        return `
            <div class="team-card">
                ${badge}
                <h3>${team.name}</h3>
                <p class="team-slogan">${team.slogan}</p>
                <div class="team-stats">
                    <span>🏆 ${team.champions}次冠军</span>
                    <span>👥 ${team.members}人</span>
                </div>
            </div>
        `;
    }).join('');
}

// ==================== 首页管理 ====================
function loadHomepageAdmin() {
    ensureDataFields();
    const data = getData();

    // 填充球队下拉
    const homeSelect = document.getElementById('homeMatchHomeTeam');
    const awaySelect = document.getElementById('homeMatchAwayTeam');
    const recentHomeSelect = document.getElementById('recentMatchHomeTeam');
    const recentAwaySelect = document.getElementById('recentMatchAwayTeam');

    const options = data.teams.map(t => `<option value="${t.name}">${t.name}</option>`).join('');

    if (homeSelect) homeSelect.innerHTML = options;
    if (awaySelect) awaySelect.innerHTML = options;
    if (recentHomeSelect) recentHomeSelect.innerHTML = options;
    if (recentAwaySelect) recentAwaySelect.innerHTML = options;

    // 填充当前数据
    if (data.homeMatch) {
        if (homeSelect) homeSelect.value = data.homeMatch.homeTeam;
        if (awaySelect) awaySelect.value = data.homeMatch.awayTeam;
        if (data.homeMatch.dateTime) {
            const dtInput = document.getElementById('homeMatchDateTime');
            if (dtInput) dtInput.value = data.homeMatch.dateTime;
        }
        const locInput = document.getElementById('homeMatchLocation');
        if (locInput) locInput.value = data.homeMatch.location || '';
        const liveInput = document.getElementById('homeMatchLiveUrl');
        if (liveInput) liveInput.value = data.homeMatch.liveUrl || '';
    }

    // 加载最近比赛列表
    loadRecentMatchesList();
}

function saveHomeMatch() {
    ensureDataFields();
    const data = getData();

    data.homeMatch = {
        homeTeam: document.getElementById('homeMatchHomeTeam').value,
        awayTeam: document.getElementById('homeMatchAwayTeam').value,
        dateTime: document.getElementById('homeMatchDateTime').value,
        location: document.getElementById('homeMatchLocation').value,
        liveUrl: document.getElementById('homeMatchLiveUrl').value
    };

    saveData(data);
    alert('下一场比赛信息已保存！');
    loadHomeMatchDisplay();
}

// ==================== 最近比赛管理 ====================
function loadRecentMatchesList() {
    ensureDataFields();
    const data = getData();
    const list = document.getElementById('recentMatchesList');
    if (!list || !data.recentMatches) return;

    list.innerHTML = data.recentMatches.map(match => `
        <div class="data-item">
            <div class="item-info">
                <div class="item-name">${match.homeTeam} vs ${match.awayTeam}</div>
                <div class="item-desc">比分：${match.homeScore} - ${match.awayScore} · ${match.date} · ${match.location}</div>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editRecentMatch(${match.id})">编辑</button>
                <button class="btn-delete" onclick="deleteRecentMatch(${match.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function showAddRecentMatchModal() {
    editingRecentMatchId = null;
    document.getElementById('recentMatchModalTitle').textContent = '添加最近比赛';
    document.getElementById('recentMatchForm').reset();
    document.getElementById('recentMatchModal').style.display = 'flex';
}

function editRecentMatch(id) {
    ensureDataFields();
    const data = getData();
    const match = data.recentMatches.find(m => m.id === id);
    if (!match) return;

    editingRecentMatchId = id;
    document.getElementById('recentMatchModalTitle').textContent = '编辑最近比赛';
    document.getElementById('recentMatchId').value = id;
    document.getElementById('recentMatchHomeTeam').value = match.homeTeam;
    document.getElementById('recentMatchAwayTeam').value = match.awayTeam;
    document.getElementById('recentMatchHomeScore').value = match.homeScore;
    document.getElementById('recentMatchAwayScore').value = match.awayScore;
    document.getElementById('recentMatchDate').value = match.date;
    document.getElementById('recentMatchLocation').value = match.location;

    document.getElementById('recentMatchModal').style.display = 'flex';
}

function closeRecentMatchModal() {
    document.getElementById('recentMatchModal').style.display = 'none';
    editingRecentMatchId = null;
}

function saveRecentMatch() {
    ensureDataFields();
    const data = getData();

    const matchData = {
        homeTeam: document.getElementById('recentMatchHomeTeam').value,
        awayTeam: document.getElementById('recentMatchAwayTeam').value,
        homeScore: parseInt(document.getElementById('recentMatchHomeScore').value),
        awayScore: parseInt(document.getElementById('recentMatchAwayScore').value),
        date: document.getElementById('recentMatchDate').value,
        location: document.getElementById('recentMatchLocation').value
    };

    if (editingRecentMatchId) {
        const index = data.recentMatches.findIndex(m => m.id === editingRecentMatchId);
        if (index > -1) {
            data.recentMatches[index] = { ...data.recentMatches[index], ...matchData };
        }
    } else {
        const newId = data.recentMatches.length > 0 ? Math.max(...data.recentMatches.map(m => m.id)) + 1 : 1;
        data.recentMatches.unshift({ id: newId, ...matchData });
    }

    saveData(data);
    closeRecentMatchModal();
    loadRecentMatchesList();
    loadRecentMatchesDisplay();
}

function deleteRecentMatch(id) {
    if (!confirm('确定要删除这场比赛记录吗？')) return;
    ensureDataFields();
    const data = getData();
    data.recentMatches = data.recentMatches.filter(m => m.id !== id);
    saveData(data);
    loadRecentMatchesList();
    loadRecentMatchesDisplay();
}

// ==================== 荣誉之星管理 ====================
function loadHonorAdmin() {
    ensureDataFields();
    const data = getData();
    const list = document.getElementById('honorList');
    if (!list || !data.honorStars) return;

    list.innerHTML = data.honorStars.map(star => `
        <div class="data-item">
            <div class="item-info">
                <div class="item-name">${star.name}</div>
                <div class="item-desc">${star.gradYear} · ${star.position} · ${star.college}</div>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editHonorStar(${star.id})">编辑</button>
                <button class="btn-delete" onclick="deleteHonorStar(${star.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function showAddHonorModal() {
    editingHonorId = null;
    tempHonorPhoto = '';
    document.getElementById('honorModalTitle').textContent = '添加荣誉之星';
    document.getElementById('honorForm').reset();
    document.getElementById('honorPhotoPreview').innerHTML = '📷';
    document.getElementById('honorPhotoRemoveBtn').style.display = 'none';
    document.getElementById('honorModal').style.display = 'flex';
}

function editHonorStar(id) {
    ensureDataFields();
    const data = getData();
    const star = data.honorStars.find(s => s.id === id);
    if (!star) return;

    editingHonorId = id;
    tempHonorPhoto = star.photo || '';

    document.getElementById('honorModalTitle').textContent = '编辑荣誉之星';
    document.getElementById('honorId').value = id;
    document.getElementById('honorName').value = star.name;
    document.getElementById('honorGradYear').value = star.gradYear || '';
    document.getElementById('honorPosition').value = star.position || '';
    document.getElementById('honorNumber').value = star.number || '';
    document.getElementById('honorCollege').value = star.college || '';
    document.getElementById('honorAchievements').value = star.achievements || '';
    document.getElementById('honorBio').value = star.bio || '';

    const preview = document.getElementById('honorPhotoPreview');
    const removeBtn = document.getElementById('honorPhotoRemoveBtn');
    if (star.photo) {
        preview.innerHTML = `<img src="${star.photo}" alt="${star.name}">`;
        removeBtn.style.display = 'inline-block';
    } else {
        preview.innerHTML = '📷';
        removeBtn.style.display = 'none';
    }

    document.getElementById('honorModal').style.display = 'flex';
}

function closeHonorModal() {
    document.getElementById('honorModal').style.display = 'none';
    editingHonorId = null;
    tempHonorPhoto = '';
}

function clearHonorPhoto() {
    tempHonorPhoto = '';
    document.getElementById('honorPhotoPreview').innerHTML = '📷';
    document.getElementById('honorPhotoRemoveBtn').style.display = 'none';
}

function saveHonorStar() {
    ensureDataFields();
    const data = getData();

    const starData = {
        name: document.getElementById('honorName').value,
        photo: tempHonorPhoto,
        gradYear: document.getElementById('honorGradYear').value,
        position: document.getElementById('honorPosition').value,
        number: document.getElementById('honorNumber').value,
        college: document.getElementById('honorCollege').value,
        achievements: document.getElementById('honorAchievements').value,
        bio: document.getElementById('honorBio').value
    };

    if (editingHonorId) {
        const index = data.honorStars.findIndex(s => s.id === editingHonorId);
        if (index > -1) {
            data.honorStars[index] = { ...data.honorStars[index], ...starData };
        }
    } else {
        const newId = data.honorStars.length > 0 ? Math.max(...data.honorStars.map(s => s.id)) + 1 : 1;
        data.honorStars.push({ id: newId, ...starData });
    }

    saveData(data);
    closeHonorModal();
    loadHonorAdmin();
    loadHonorStarsDisplay();
}

function deleteHonorStar(id) {
    if (!confirm('确定要删除这位荣誉之星吗？')) return;
    ensureDataFields();
    const data = getData();
    data.honorStars = data.honorStars.filter(s => s.id !== id);
    saveData(data);
    loadHonorAdmin();
    loadHonorStarsDisplay();
}

// ==================== 院队管理（添加队徽上传） ====================
function clearTeamLogo() {
    tempTeamLogo = '';
    document.getElementById('teamLogoPreview').innerHTML = '📷';
    const removeBtn = document.querySelector('#teamLogoUpload + .btn-remove');
    if (removeBtn) removeBtn.style.display = 'none';
}

// 覆盖原有的loadTeamsList函数，添加队徽显示
const _originalLoadTeamsList = typeof loadTeamsList === 'function' ? loadTeamsList : null;

function loadTeamsList() {
    ensureDataFields();
    const data = getData();
    const list = document.getElementById('teamsList');
    if (!list) return;

    list.innerHTML = data.teams.map(team => {
        const badge = team.logo
            ? `<img src="${team.logo}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;">`
            : team.icon;
        return `
            <div class="data-item">
                <div class="item-info">
                    <div class="item-icon">${badge}</div>
                    <div>
                        <div class="item-name">${team.name}</div>
                        <div class="item-desc">${team.slogan}</div>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editTeam(${team.id})">编辑</button>
                    <button class="btn-delete" onclick="deleteTeam(${team.id})">删除</button>
                </div>
            </div>
        `;
    }).join('');
}

// 覆盖原有的editTeam函数
const _originalEditTeam = typeof editTeam === 'function' ? editTeam : null;

function editTeam(id) {
    ensureDataFields();
    const data = getData();
    const team = data.teams.find(t => t.id === id);
    if (!team) return;

    editingTeamId = id;
    tempTeamLogo = team.logo || '';

    document.getElementById('teamModalTitle').textContent = '编辑院队';
    document.getElementById('teamId').value = id;
    document.getElementById('teamName').value = team.name;
    document.getElementById('teamSlogan').value = team.slogan;
    document.getElementById('teamIcon').value = team.icon;
    document.getElementById('teamChampions').value = team.champions;
    document.getElementById('teamMembers').value = team.members;

    const preview = document.getElementById('teamLogoPreview');
    const removeBtn = document.querySelector('#teamLogoUpload + .btn-remove');
    if (team.logo) {
        preview.innerHTML = `<img src="${team.logo}" alt="${team.name}">`;
        if (removeBtn) removeBtn.style.display = 'inline-block';
    } else {
        preview.innerHTML = '📷';
        if (removeBtn) removeBtn.style.display = 'none';
    }

    document.getElementById('teamModal').style.display = 'flex';
}

// 覆盖原有的showAddTeamModal函数
const _originalShowAddTeamModal = typeof showAddTeamModal === 'function' ? showAddTeamModal : null;

function showAddTeamModal() {
    editingTeamId = null;
    tempTeamLogo = '';
    document.getElementById('teamModalTitle').textContent = '添加院队';
    document.getElementById('teamForm').reset();
    document.getElementById('teamLogoPreview').innerHTML = '📷';
    const removeBtn = document.querySelector('#teamLogoUpload + .btn-remove');
    if (removeBtn) removeBtn.style.display = 'none';
    document.getElementById('teamModal').style.display = 'flex';
}

// 覆盖原有的saveTeam函数
const _originalSaveTeam = typeof saveTeam === 'function' ? saveTeam : null;

function saveTeam() {
    ensureDataFields();
    const data = getData();

    const teamData = {
        name: document.getElementById('teamName').value,
        slogan: document.getElementById('teamSlogan').value,
        icon: document.getElementById('teamIcon').value,
        champions: parseInt(document.getElementById('teamChampions').value) || 0,
        members: parseInt(document.getElementById('teamMembers').value) || 20,
        logo: tempTeamLogo
    };

    if (editingTeamId) {
        const index = data.teams.findIndex(t => t.id === editingTeamId);
        if (index > -1) {
            data.teams[index] = { ...data.teams[index], ...teamData };
        }
    } else {
        const newId = data.teams.length > 0 ? Math.max(...data.teams.map(t => t.id)) + 1 : 1;
        data.teams.push({ id: newId, ...teamData });
    }

    saveData(data);
    closeTeamModal();
    loadTeamsList();
    loadCollegeTeams();
}

// ==================== 更新前台初始化 ====================
const _originalInitFrontendDisplay = typeof initFrontendDisplay === 'function' ? initFrontendDisplay : null;

function initFrontendDisplay() {
    ensureDataFields();
    loadCollegeTeams();
    loadRankingDisplay();
    loadRefereeDisplay();
    loadSchoolTeamDisplay();
    loadActivitiesDisplay();
    loadHomeMatchDisplay();
    loadHonorStarsDisplay();
    loadYearSwitcher();
    loadKnockoutDisplay();
}

// ==================== 更新管理后台标签页 ====================
const _originalLoadAdminTabs = typeof loadAdminTabs === 'function' ? loadAdminTabs : null;

function loadAdminTabs() {
    ensureDataFields();
    loadHomepageAdmin();
    loadTeamsList();
    loadCupAdminPanel();
    loadSchoolTeamAdmin();
    loadCoachesAdmin();
    loadPlayersAdmin('men');
    loadActivitiesAdmin();
    loadRefereesAdmin();
    loadRefStatsAdmin();
    loadHonorAdmin();
}
