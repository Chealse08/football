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
    ranking: [
        { team: '经济管理学院', played: 5, win: 4, draw: 1, loss: 0, points: 13 },
        { team: '计算机学院', played: 5, win: 3, draw: 2, loss: 0, points: 11 },
        { team: '机械工程学院', played: 5, win: 3, draw: 0, loss: 2, points: 9 },
        { team: '电气工程学院', played: 5, win: 2, draw: 1, loss: 2, points: 7 },
        { team: '土木工程学院', played: 5, win: 1, draw: 0, loss: 4, points: 3 },
        { team: '艺术设计学院', played: 5, win: 0, draw: 0, loss: 5, points: 0 }
    ],
    schoolTeam: {
        name: '深鸡蛋大学校足球队',
        year: '成立于2018年',
        members: '30名',
        coaches: '2名',
        honors: '🥇 市高校联赛冠军 x2\n🥈 省高校联赛季军 x1\n🏅 最佳组织奖 x3'
    },
    coaches: [
        { id: 1, name: '陈指导', title: '主教练', desc: '前职业球员，拥有亚足联A级教练证书，执教经验丰富' },
        { id: 2, name: '林指导', title: '助理教练', desc: '体育学院足球专业毕业，专注青训和体能训练' }
    ],
    squad: {
        forwards: [
            { number: '7', name: '小飞' },
            { number: '9', name: '阿龙' },
            { number: '11', name: '小杰' }
        ],
        midfielders: [
            { number: '8', name: '队长 阿辉' },
            { number: '10', name: '阿文' },
            { number: '14', name: '小宇' },
            { number: '16', name: '阿凯' }
        ],
        defenders: [
            { number: '3', name: '阿强' },
            { number: '4', name: '小峰' },
            { number: '5', name: '大磊' },
            { number: '2', name: '阿杰' }
        ],
        goalkeepers: [
            { number: '1', name: '阿晨' },
            { number: '22', name: '小涛' }
        ]
    },
    activities: [
        { id: 1, name: '2025夏季足球联赛', desc: '八支球队参赛，单循环赛制，争夺联赛冠军奖杯', date: '6月15-30', month: '6月', location: '坪山公园足球场', status: 'ongoing', meta: '8支球队' },
        { id: 2, name: '足球裁判培训营', desc: '邀请国家级裁判授课，学习足球规则和裁判技巧', date: '7月10', month: '7月', location: '协会会议室', status: 'upcoming', meta: '限30人' },
        { id: 3, name: '亲子足球嘉年华', desc: '家庭足球趣味活动，增进亲子感情，培养孩子足球兴趣', date: '7月20', month: '7月', location: '坪山公园足球场', status: 'upcoming', meta: '适合5-12岁' },
        { id: 4, name: '新老会员友谊赛', desc: '新老会员足球交流活动，以球会友，增进感情', date: '5月20', month: '5月', location: '坪山公园足球场', status: 'ended', meta: '40人参与' },
        { id: 5, name: '春季杯足球赛', desc: '16支球队参赛，经过激烈角逐，经管学院夺冠', date: '4月5', month: '4月', location: '坪山公园足球场', status: 'ended', meta: '经管学院冠军' },
        { id: 6, name: '三八节女足友谊赛', desc: '庆祝国际妇女节，女足姑娘们展现风采', date: '3月8', month: '3月', location: '坪山公园足球场', status: 'ended', meta: '20人参与' }
    ],
    referees: [
        { id: 1, name: '张伟', level: '国家级裁判', desc: '执法经验10年，曾执法多场全国性赛事' },
        { id: 2, name: '李明', level: '一级裁判', desc: '执法经验8年，擅长控制比赛节奏' },
        { id: 3, name: '王强', level: '一级裁判', desc: '执法经验6年，判罚精准果断' },
        { id: 4, name: '刘洋', level: '二级裁判', desc: '执法经验4年，年轻有为' }
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
    }
}

// 获取数据
function getData() {
    const data = localStorage.getItem('footballAdminData');
    return data ? JSON.parse(data) : defaultData;
}

// 保存数据
function saveData(data) {
    localStorage.setItem('footballAdminData', JSON.stringify(data));
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
        loadAdminPanel();
        return true;
    }
    return false;
}

// 检查登录状态
function checkAdminLogin() {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
}

function logoutAdmin() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('adminLoginModal').style.display = 'flex';
}

function loadAdminPanel() {
    const adminBtn = document.getElementById('adminBtn');
    if (checkAdminLogin()) {
        adminBtn.style.display = 'flex';
    } else {
        adminBtn.style.display = 'none';
    }
}

// ==================== 页面加载 ====================

document.addEventListener('DOMContentLoaded', () => {
    initData();

    // 初始化管理按钮显示状态
    loadAdminPanel();

    // 点击管理后台按钮
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            if (!checkAdminLogin()) {
                openAdminLogin();
            } else {
                const navBtns = document.querySelectorAll('.nav-btn');
                const pages = document.querySelectorAll('.page');
                navBtns.forEach(b => b.classList.remove('active'));
                adminBtn.classList.add('active');
                pages.forEach(page => page.classList.remove('active'));
                document.getElementById('admin').classList.add('active');
                closeMobileMenu();
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
                const navBtns = document.querySelectorAll('.nav-btn');
                const pages = document.querySelectorAll('.page');
                navBtns.forEach(b => b.classList.remove('active'));
                adminBtn.classList.add('active');
                pages.forEach(page => page.classList.remove('active'));
                document.getElementById('admin').classList.add('active');
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
                loadTabData(targetTab);
            });
        });
    }

    // 初始化院队页面
    loadTeamsList();
    loadRanking();
    loadSchoolTeam();
    loadCoachesList();
    loadSquadEditor();
    loadActivitiesList();
    loadRefereesList();
    loadRefStats();

    // 初始化表单提交
    initFormHandlers();
});

// ==================== 加载数据 ====================

function loadTabData(tab) {
    switch(tab) {
        case 'teams':
            loadTeamsList();
            break;
        case 'ranking':
            loadRanking();
            break;
        case 'schoolteam':
            loadSchoolTeam();
            loadCoachesList();
            loadSquadEditor();
            break;
        case 'activities':
            loadActivitiesList();
            break;
        case 'referee':
            loadRefereesList();
            loadRefStats();
            break;
    }
}

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

function loadRanking() {
    const data = getData();
    const tbody = document.getElementById('rankingBody');
    if (!tbody) return;

    // 按积分排序
    const sorted = [...data.ranking].sort((a, b) => b.points - a.points);

    tbody.innerHTML = sorted.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.team}</td>
            <td><input type="number" value="${item.played}" data-field="played" data-team="${item.team}"></td>
            <td><input type="number" value="${item.win}" data-field="win" data-team="${item.team}"></td>
            <td><input type="number" value="${item.draw}" data-field="draw" data-team="${item.team}"></td>
            <td><input type="number" value="${item.loss}" data-field="loss" data-team="${item.team}"></td>
            <td><input type="number" value="${item.points}" data-field="points" data-team="${item.team}"></td>
            <td><button class="btn-save" onclick="saveRankingRow('${item.team}')">保存</button></td>
        </tr>
    `).join('');

    // 添加输入事件监听
    tbody.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            const team = input.dataset.team;
            const field = input.dataset.field;
            updateRankingCell(team, field, input.value);
        });
    });
}

function loadSchoolTeam() {
    const data = getData();
    document.getElementById('schoolTeamName').value = data.schoolTeam.name;
    document.getElementById('schoolTeamYear').value = data.schoolTeam.year;
    document.getElementById('schoolTeamMembers').value = data.schoolTeam.members;
    document.getElementById('schoolTeamCoaches').value = data.schoolTeam.coaches;
    document.getElementById('schoolTeamHonors').value = data.schoolTeam.honors;
}

function loadCoachesList() {
    const data = getData();
    const container = document.getElementById('coachesList');
    if (!container) return;

    container.innerHTML = data.coaches.map(coach => `
        <div class="data-item">
            <div class="data-item-info">
                <h4>${coach.name}</h4>
                <p>${coach.title} | ${coach.desc}</p>
            </div>
            <div class="data-item-actions">
                <button class="btn-edit" onclick="editCoach(${coach.id})">编辑</button>
                <button class="btn-delete" onclick="deleteCoach(${coach.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function loadSquadEditor() {
    const data = getData();
    const container = document.getElementById('squadEditor');
    if (!container) return;

    const positions = [
        { key: 'forwards', label: '前锋' },
        { key: 'midfielders', label: '中场' },
        { key: 'defenders', label: '后卫' },
        { key: 'goalkeepers', label: '守门员' }
    ];

    container.innerHTML = positions.map(pos => `
        <div class="squad-section-edit">
            <h4>${pos.label}</h4>
            <div class="squad-players-edit" id="squad-${pos.key}">
                ${data.squad[pos.key].map((player, index) => `
                    <div class="squad-player-item">
                        <input type="text" value="${player.number}" placeholder="号码">
                        <input type="text" value="${player.name}" placeholder="姓名">
                        <button class="btn-remove" onclick="removeSquadPlayer('${pos.key}', ${index})">删除</button>
                    </div>
                `).join('')}
            </div>
            <button class="add-player-btn" onclick="addSquadPlayer('${pos.key}')">+ 添加球员</button>
        </div>
    `).join('') + '<button class="btn-save" onclick="saveSquad()">保存阵容</button>';
}

function loadActivitiesList() {
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

function loadRefereesList() {
    const data = getData();
    const container = document.getElementById('refereeList');
    if (!container) return;

    container.innerHTML = data.referees.map(ref => `
        <div class="data-item">
            <div class="data-item-info">
                <h4>${ref.name}</h4>
                <p>${ref.level} | ${ref.desc}</p>
            </div>
            <div class="data-item-actions">
                <button class="btn-edit" onclick="editReferee(${ref.id})">编辑</button>
                <button class="btn-delete" onclick="deleteReferee(${ref.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function loadRefStats() {
    const data = getData();
    document.getElementById('refTotal').value = data.refStats.total;
    document.getElementById('refLevel1').value = data.refStats.level1;
    document.getElementById('refMatches').value = data.refStats.matches;
    document.getElementById('refRating').value = data.refStats.rating;
}

// ==================== 表单处理 ====================

function initFormHandlers() {
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
}

// ==================== 院队管理 ====================

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
    alert('保存成功！');
}

function deleteTeam(id) {
    if (!confirm('确定要删除这个院队吗？')) return;

    const data = getData();
    data.teams = data.teams.filter(t => t.id !== id);
    saveData(data);
    loadTeamsList();
    alert('删除成功！');
}

// ==================== 积分榜管理 ====================

function updateRankingCell(team, field, value) {
    // 实时更新显示
}

function saveRankingRow(teamName) {
    const data = getData();
    const row = data.ranking.find(r => r.team === teamName);
    if (!row) return;

    const rowElement = document.querySelector(`tr input[data-team="${teamName}"]`).closest('tr');
    const inputs = rowElement.querySelectorAll('input');

    row.played = parseInt(inputs[0].value) || 0;
    row.win = parseInt(inputs[1].value) || 0;
    row.draw = parseInt(inputs[2].value) || 0;
    row.loss = parseInt(inputs[3].value) || 0;
    row.points = parseInt(inputs[4].value) || 0;

    saveData(data);
    loadRanking();
    alert('保存成功！');
}

// ==================== 校队管理 ====================

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
    alert('保存成功！');
}

// ==================== 教练管理 ====================

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
        desc: document.getElementById('coachDesc').value
    };

    if (id) {
        const index = data.coaches.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            data.coaches[index] = coach;
        }
    } else {
        data.coaches.push(coach);
    }

    saveData(data);
    closeCoachModal();
    loadCoachesList();
    alert('保存成功！');
}

function deleteCoach(id) {
    if (!confirm('确定要删除这个教练吗？')) return;

    const data = getData();
    data.coaches = data.coaches.filter(c => c.id !== id);
    saveData(data);
    loadCoachesList();
    alert('删除成功！');
}

// ==================== 阵容管理 ====================

function addSquadPlayer(position) {
    const data = getData();
    data.squad[position].push({ number: '', name: '' });
    saveData(data);
    loadSquadEditor();
}

function removeSquadPlayer(position, index) {
    const data = getData();
    data.squad[position].splice(index, 1);
    saveData(data);
    loadSquadEditor();
}

function saveSquad() {
    const data = getData();
    const positions = ['forwards', 'midfielders', 'defenders', 'goalkeepers'];

    positions.forEach(pos => {
        const container = document.getElementById('squad-' + pos);
        if (container) {
            const items = container.querySelectorAll('.squad-player-item');
            data.squad[pos] = Array.from(items).map(item => {
                const inputs = item.querySelectorAll('input');
                return {
                    number: inputs[0].value,
                    name: inputs[1].value
                };
            }).filter(p => p.number || p.name);
        }
    });

    saveData(data);
    alert('保存成功！');
}

// ==================== 活动管理 ====================

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
    loadActivitiesList();
    alert('保存成功！');
}

function deleteActivity(id) {
    if (!confirm('确定要删除这个活动吗？')) return;

    const data = getData();
    data.activities = data.activities.filter(a => a.id !== id);
    saveData(data);
    loadActivitiesList();
    alert('删除成功！');
}

// ==================== 主裁管理 ====================

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
        desc: document.getElementById('refereeDesc').value
    };

    if (id) {
        const index = data.referees.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            data.referees[index] = referee;
        }
    } else {
        data.referees.push(referee);
    }

    saveData(data);
    closeRefereeModal();
    loadRefereesList();
    alert('保存成功！');
}

function deleteReferee(id) {
    if (!confirm('确定要删除这个主裁吗？')) return;

    const data = getData();
    data.referees = data.referees.filter(r => r.id !== id);
    saveData(data);
    loadRefereesList();
    alert('删除成功！');
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

    // 重新加载所有数据
    loadTeamsList();
    loadRanking();
    loadSchoolTeam();
    loadCoachesList();
    loadSquadEditor();
    loadActivitiesList();
    loadRefereesList();
    loadRefStats();

    alert('数据已重置为默认值！');
}

// ==================== 页面显示更新 ====================

// 在页面切换时，更新院队页面显示
function updateTeamsDisplay() {
    const data = getData();
    const teamCards = document.querySelectorAll('.team-card');
    const rankingTable = document.querySelector('.ranking-table tbody');

    // 更新院队卡片
    teamCards.forEach((card, index) => {
        if (data.teams[index]) {
            const team = data.teams[index];
            card.querySelector('.team-logo').textContent = team.icon;
            card.querySelector('h3').textContent = team.name;
            card.querySelector('.team-slogan').textContent = team.slogan;
            card.querySelector('.team-info').innerHTML = `
                <span>🏆 ${team.champions}次冠军</span>
                <span>👥 ${team.members}人</span>
            `;
        }
    });

    // 更新积分榜
    if (rankingTable) {
        const sorted = [...data.ranking].sort((a, b) => b.points - a.points);
        rankingTable.innerHTML = sorted.map((item, index) => {
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
}

// 更新校队显示
function updateSchoolTeamDisplay() {
    const data = getData();
    const schoolHero = document.querySelector('.school-hero');

    if (schoolHero) {
        const honorsHtml = data.schoolTeam.honors.split('\n').filter(h => h.trim()).map(h => `<span>${h}</span>`).join('');
        schoolHero.innerHTML = `
            <div class="school-badge">🏆</div>
            <div class="school-info">
                <h3>${data.schoolTeam.name}</h3>
                <p>${data.schoolTeam.year}，现有队员${data.schoolTeam.members}，教练${data.schoolTeam.coaches}</p>
                <div class="school-honors">${honorsHtml}</div>
            </div>
        `;
    }
}

// 更新校队教练显示
function updateCoachesDisplay() {
    const data = getData();
    const coachGrid = document.querySelector('.coach-grid');

    if (coachGrid) {
        coachGrid.innerHTML = data.coaches.map(coach => `
            <div class="coach-card">
                <div class="coach-avatar">👨‍🏫</div>
                <div>
                    <h4>${coach.name}</h4>
                    <p class="coach-title">${coach.title}</p>
                    <p class="coach-desc">${coach.desc}</p>
                </div>
            </div>
        `).join('');
    }
}

// 更新校队阵容显示
function updateSquadDisplay() {
    const data = getData();
    const squadSection = document.querySelector('.squad-section');

    if (squadSection) {
        const positions = [
            { key: 'forwards', label: '前锋' },
            { key: 'midfielders', label: '中场' },
            { key: 'defenders', label: '后卫' },
            { key: 'goalkeepers', label: '守门员' }
        ];

        squadSection.innerHTML = positions.map(pos => `
            <div class="squad-group">
                <h4>${pos.label}</h4>
                <div class="player-chips">
                    ${data.squad[pos.key].map(p => `<span class="player-chip">${p.number}号 - ${p.name}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }
}

// 更新主裁统计显示
function updateRefStatsDisplay() {
    const data = getData();
    const refStats = document.querySelector('.referee-stats');

    if (refStats) {
        refStats.innerHTML = `
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
}

// 更新主裁列表显示
function updateRefereesDisplay() {
    const data = getData();
    const refereeGrid = document.querySelector('.referee-grid');

    if (refereeGrid) {
        refereeGrid.innerHTML = data.referees.map(ref => `
            <div class="referee-card">
                <div class="ref-avatar">⚽</div>
                <h4>${ref.name}</h4>
                <p class="ref-level">${ref.level}</p>
                <p class="ref-desc">${ref.desc}</p>
            </div>
        `).join('');
    }
}

// 更新活动列表显示
function updateActivitiesDisplay() {
    const data = getData();
    const activityList = document.querySelector('.activity-list');

    if (activityList) {
        const statusMap = { upcoming: '即将开始', ongoing: '进行中', ended: '已结束' };
        const statusClassMap = { upcoming: 'upcoming', ongoing: 'ongoing', ended: 'ended' };

        activityList.innerHTML = data.activities.map(activity => `
            <div class="activity-item" data-status="${activity.status}">
                <div class="activity-badge ${statusClassMap[activity.status]}">${statusMap[activity.status]}</div>
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
}

// 更新所有显示
function updateAllDisplays() {
    updateTeamsDisplay();
    updateSchoolTeamDisplay();
    updateCoachesDisplay();
    updateSquadDisplay();
    updateRefStatsDisplay();
    updateRefereesDisplay();
    updateActivitiesDisplay();
}

// 监听页面可见性变化，更新显示
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        updateAllDisplays();
    }
});

// 导航时更新显示
const originalNavClick = window.navBtnsClick;
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(updateAllDisplays, 100);
    });
});
