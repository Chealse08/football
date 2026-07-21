// ============================================================
// 德转风暴 - 状态管理 + localStorage 持久化
// ============================================================
(function () {
  const STORAGE_KEY = 'transferstorm_v1';
  const THEME_KEY = 'transferstorm_theme';

  // 默认状态：从 data.js 初始化
  function defaultState() {
    const d = window.TM_DATA;
    return {
      players: JSON.parse(JSON.stringify(d.PLAYERS)),
      clubs: JSON.parse(JSON.stringify(d.CLUBS)),
      leagues: JSON.parse(JSON.stringify(d.LEAGUES)),
      transfers: JSON.parse(JSON.stringify(d.TRANSFERS)),
      matches: JSON.parse(JSON.stringify(d.MATCHES)),
      news: JSON.parse(JSON.stringify(d.NEWS)),
      valueHistory: JSON.parse(JSON.stringify(d.VALUE_HISTORY)),
      adminLoggedIn: false,
    };
  }

  let state = defaultState();
  const subscribers = [];

  // 加载 localStorage 覆盖层（只覆盖存在数据被管理员修改的部分）
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.players)   state.players      = saved.players;
      if (saved.clubs)     state.clubs        = saved.clubs;
      if (saved.news)      state.news         = saved.news;
      if (saved.transfers) state.transfers    = saved.transfers;
      if (saved.matches)   state.matches      = saved.matches;
      if (saved.valueHistory) state.valueHistory = saved.valueHistory;
    } catch (e) {
      console.warn('Store load failed:', e);
    }
  }

  function persist() {
    try {
      const toSave = {
        players: state.players,
        clubs: state.clubs,
        news: state.news,
        transfers: state.transfers,
        matches: state.matches,
        valueHistory: state.valueHistory,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Store persist failed:', e);
    }
  }

  function reset() {
    state = defaultState();
    state.adminLoggedIn = true; // 保持登录态
    persist();
    notify();
  }

  function setState(patch) {
    Object.assign(state, patch);
    persist();
    notify();
  }

  function subscribe(fn) {
    subscribers.push(fn);
    return () => {
      const i = subscribers.indexOf(fn);
      if (i >= 0) subscribers.splice(i, 1);
    };
  }

  function notify() {
    subscribers.forEach(fn => fn(state));
  }

  // 主题
  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }
  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  // ---------- 查询助手 ----------
  function getPlayer(id) { return state.players.find(p => p.id === +id); }
  function getClub(id) { return state.clubs.find(c => c.id === +id); }
  function getLeague(id) { return state.leagues.find(l => l.id === id); }
  function getPlayersByClub(clubId) { return state.players.filter(p => p.club_id === +clubId); }
  function getTransfersByPlayer(pid) { return state.transfers.filter(t => t.player_id === +pid); }
  function getMatchesByLeague(leagueId) {
    return state.matches.filter(m => m.league_id === leagueId)
      .sort((a, b) => b.date.localeCompare(a.date));
  }
  function getMatchesByClub(clubId) {
    return state.matches.filter(m => m.home_club_id === +clubId || m.away_club_id === +clubId)
      .sort((a, b) => b.date.localeCompare(a.date));
  }
  function getNewsByPlayer(pid) { return state.news.filter(n => n.player_id === +pid); }
  function getNewsByClub(cid) { return state.news.filter(n => n.club_id === +cid); }
  function getValueHistory(pid) {
    return state.valueHistory.filter(v => v.player_id === +pid)
      .sort((a, b) => a.date.localeCompare(b.date));
  }
  function getPlayersByLeague(leagueId) {
    const clubIds = state.clubs.filter(c => c.league_id === leagueId).map(c => c.id);
    return state.players.filter(p => clubIds.includes(p.club_id));
  }

  // 积分榜计算
  function getStandings(leagueId) {
    const clubIds = state.clubs.filter(c => c.league_id === leagueId).map(c => c.id);
    const table = clubIds.map(id => ({
      club_id: id,
      played: 0, win: 0, draw: 0, loss: 0,
      gf: 0, ga: 0, gd: 0, pts: 0,
    }));
    const idx = id => table.findIndex(t => t.club_id === id);
    state.matches.filter(m => m.league_id === leagueId).forEach(m => {
      const h = idx(m.home_club_id), a = idx(m.away_club_id);
      if (h < 0 || a < 0) return;
      table[h].played++; table[a].played++;
      table[h].gf += m.home_score; table[h].ga += m.away_score;
      table[a].gf += m.away_score; table[a].ga += m.home_score;
      if (m.home_score > m.away_score) { table[h].win++; table[h].pts += 3; table[a].loss++; }
      else if (m.home_score < m.away_score) { table[a].win++; table[a].pts += 3; table[h].loss++; }
      else { table[h].draw++; table[a].draw++; table[h].pts++; table[a].pts++; }
    });
    table.forEach(t => t.gd = t.gf - t.ga);
    return table.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  }

  // 射手榜：从新闻+模拟进球计算（mock，从球员价值派生近似数据）
  function getScorers(leagueId, limit = 10) {
    const players = getPlayersByLeague(leagueId)
      .filter(p => ['ST', 'LW', 'RW', 'AM'].includes(p.pos));
    // 为可重复性，按 id 派生伪进球数
    const scorers = players.map(p => ({
      ...p,
      goals: ((p.id * 7) % 18) + ((p.mv / 1000) | 0) - 5,
    })).filter(s => s.goals > 0).sort((a, b) => b.goals - a.goals).slice(0, limit);
    return scorers;
  }

  // ---------- Toast ----------
  function toast(message, type = 'success') {
    const stack = document.getElementById('toastStack');
    if (!stack) return;
    const el = document.createElement('div');
    el.className = `toast ${type === 'success' ? '' : type}`;
    el.textContent = message;
    stack.appendChild(el);
    setTimeout(() => {
      el.classList.add('fade-out');
      setTimeout(() => el.remove(), 250);
    }, 2800);
  }

  // ---------- 模态 ----------
  function modal({ title, body, actions }) {
    const root = document.getElementById('modalRoot');
    const box = document.createElement('div');
    box.className = 'modal-box';
    box.innerHTML = `
      <h3>${title}</h3>
      <p>${body}</p>
      <div class="modal-actions"></div>
    `;
    const actionsEl = box.querySelector('.modal-actions');
    (actions || [{ label: '确定', kind: 'primary' }]).forEach(a => {
      const b = document.createElement('button');
      b.className = `btn ${a.kind === 'ghost' ? 'btn-ghost' : 'btn-primary'}`;
      b.textContent = a.label;
      b.onclick = () => {
        if (a.onClick) a.onClick(box);
        else root.classList.remove('show');
      };
      actionsEl.appendChild(b);
    });
    root.innerHTML = '';
    root.appendChild(box);
    root.classList.add('show');
  }

  // ---------- 工具 ----------
  function formatValue(v) {
    // v 单位 万欧元
    if (v >= 10000) return { num: (v / 10000).toFixed(2).replace(/\.?0+$/, ''), unit: '亿欧' };
    return { num: v.toLocaleString(), unit: '万欧' };
  }
  function formatFee(fee) {
    if (fee == null) return null;
    if (fee === 0) return '自由身';
    if (fee >= 10000) return (fee / 10000).toFixed(2).replace(/\.?0+$/, '') + '亿欧';
    return fee.toLocaleString() + '万欧';
  }
  function posGroup(pos) {
    if (pos === 'GK') return 'GK';
    if (['LB', 'CB', 'RB'].includes(pos)) return 'DF';
    if (['DM', 'CM', 'AM'].includes(pos)) return 'MF';
    return 'FW';
  }
  function initials(name) {
    return name ? name.charAt(0).toUpperCase() : '?';
  }
  function nextId(arr) {
    return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
  }

  // 暴露
  window.TM_STORE = {
    state,
    load, persist, reset, setState, subscribe, notify,
    getTheme, setTheme,
    getPlayer, getClub, getLeague,
    getPlayersByClub, getTransfersByPlayer, getMatchesByLeague, getMatchesByClub,
    getNewsByPlayer, getNewsByClub, getValueHistory, getPlayersByLeague,
    getStandings, getScorers,
    toast, modal,
    formatValue, formatFee, posGroup, initials, nextId,
  };

  // 初始化加载
  load();
})();
