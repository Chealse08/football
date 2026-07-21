// ============================================================
// 德转风暴 - 页面渲染器
// ============================================================
(function () {
  const S = window.TM_STORE;
  const R = window.TM_ROUTER;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function el(tag, attrs = {}, children = []) {
    const e = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }

  // ---------- 通用组件 ----------
  function clubBadge(club, size = '') {
    if (!club) return '<span class="club-badge ' + size + '">?</span>';
    return `<span class="club-badge ${size}" style="background:${club.color}" title="${club.name}">${club.crest}</span>`;
  }

  function playerAvatar(player, size = '') {
    return `<span class="player-avatar ${size}">${S.initials(player.name)}</span>`;
  }

  function valueBadge(mv, pv) {
    const diff = mv - pv;
    let cls = 'delta-flat', txt = '0';
    if (diff > 0) { cls = 'delta-up'; txt = `▲ ${S.formatValue(diff).num}${S.formatValue(diff).unit}`; }
    else if (diff < 0) { cls = 'delta-down'; txt = `▼ ${S.formatValue(-diff).num}${S.formatValue(-diff).unit}`; }
    return `<span class="player-delta ${cls}">${txt}</span>`;
  }

  function deltaPercent(mv, pv) {
    if (pv === 0) return '';
    const pct = ((mv - pv) / pv * 100).toFixed(1);
    const cls = pct > 0 ? 'delta-up' : pct < 0 ? 'delta-down' : 'delta-flat';
    const sign = pct > 0 ? '+' : '';
    return `<span class="player-delta ${cls}">${sign}${pct}%</span>`;
  }

  // ============================================================
  // 首页
  // ============================================================
  function home(params, root) {
    const S_ = S.state;
    const top5 = [...S_.players].sort((a, b) => b.mv - a.mv).slice(0, 5);
    const latestNews = [...S_.news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
    const totalValue = S_.players.reduce((s, p) => s + p.mv, 0);
    const bigTransfers = S_.transfers.filter(t => t.fee > 0).sort((a, b) => b.fee - a.fee).slice(0, 3);
    const biggestFee = bigTransfers[0]?.fee || 0;

    root.innerHTML = `
      <section class="hero fade-up">
        <span class="hero-ball">⚽</span>
        <div class="hero-content">
          <span class="hero-badge">LIVE · 2024 夏窗已关闭</span>
          <h1>全球转会市场<br><span class="hl">实时风暴</span></h1>
          <p>追踪五大联赛球员身价波动、转会动态、俱乐部档案与赛程赛果。一站式浏览，德转风暴，让你不再错过任何一笔重磅交易。</p>
          <div class="hero-actions">
            <a href="#/rankings" class="btn btn-primary">查看身价榜 →</a>
            <a href="#/league/epl" class="btn btn-ghost">联赛积分榜</a>
            <a href="#/game" class="btn btn-ghost">🎮 点球大战</a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat"><div class="num">${S_.players.length}</div><div class="label">球员档案</div></div>
            <div class="hero-stat"><div class="num">${S_.clubs.length}</div><div class="label">俱乐部</div></div>
            <div class="hero-stat"><div class="num">${S_.transfers.filter(t => t.fee > 0).length}</div><div class="label">转会记录</div></div>
            <div class="hero-stat"><div class="num">${S.formatValue(totalValue).num}<span style="font-size:14px">${S.formatValue(totalValue).unit}</span></div><div class="label">市场总价值</div></div>
          </div>
        </div>
      </section>

      <section class="section fade-up d1">
        <div class="section-head">
          <div>
            <h2 class="section-title">热门转会</h2>
            <p class="section-sub">最新重磅转会动态 · 持续更新</p>
          </div>
          <a href="#/rankings" class="section-link">查看全部 →</a>
        </div>
        <div class="grid grid-3">
          ${latestNews.map(n => newsCardHTML(n)).join('')}
        </div>
      </section>

      <section class="section fade-up d2">
        <div class="section-head">
          <div>
            <h2 class="section-title">身价 TOP 5</h2>
            <p class="section-sub">当前市场价值最高的球员</p>
          </div>
          <a href="#/rankings" class="section-link">完整榜单 →</a>
        </div>
        <div class="grid grid-5" style="grid-template-columns: repeat(5, 1fr); gap:16px;">
          ${top5.map((p, i) => topPlayerCardHTML(p, i + 1)).join('')}
        </div>
      </section>

      <section class="section fade-up d3">
        <div class="section-head">
          <div>
            <h2 class="section-title">联赛速览</h2>
            <p class="section-sub">点击进入对应联赛积分榜</p>
          </div>
        </div>
        <div class="grid grid-5" style="grid-template-columns: repeat(5, 1fr); gap:16px;">
          ${S_.leagues.map(l => leagueCardHTML(l)).join('')}
        </div>
      </section>

      <section class="section fade-up d4">
        <div class="section-head">
          <div>
            <h2 class="section-title">本期最大转会费</h2>
            <p class="section-sub">2024 夏窗纪录转会</p>
          </div>
        </div>
        <div class="grid grid-3">
          ${bigTransfers.map(t => bigTransferCardHTML(t)).join('')}
        </div>
      </section>
    `;
  }

  function newsCardHTML(n) {
    const player = S.getPlayer(n.player_id);
    const club = S.getClub(n.club_id);
    const feeText = n.fee == null ? '' : `<span class="news-fee">${S.formatFee(n.fee)}</span>`;
    return `
      <article class="card news-card" data-href="#/player/${n.player_id}">
        <span class="news-tag tag-${n.tag}">${n.tag}</span>
        <h3 class="news-title">${n.title}</h3>
        <p class="news-summary">${n.summary}</p>
        <div class="news-meta">
          <span>📰 ${n.source} · ${n.date}</span>
          ${feeText}
        </div>
      </article>
    `;
  }

  function topPlayerCardHTML(p, rank) {
    const club = S.getClub(p.club_id);
    const fv = S.formatValue(p.mv);
    return `
      <div class="card player-card" data-href="#/player/${p.id}">
        <span class="player-rank">#${rank}</span>
        <div class="player-head">
          ${playerAvatar(p)}
          <div>
            <div class="player-name">${p.name}</div>
            <div class="player-en">${p.en || ''}</div>
          </div>
        </div>
        <div class="player-meta">
          <span>${clubBadge(club)} ${club?.short || ''}</span>
          <span>📍 ${p.pos}</span>
          <span>${p.nat}</span>
        </div>
        <div class="player-value">
          <div><span class="v">${fv.num}</span><span class="unit">${fv.unit}</span></div>
          ${valueBadge(p.mv, p.pv)}
        </div>
      </div>
    `;
  }

  function leagueCardHTML(l) {
    const clubCount = S.state.clubs.filter(c => c.league_id === l.id).length;
    const playerCount = S.getPlayersByLeague(l.id).length;
    return `
      <a href="#/league/${l.id}" class="card card-pad" style="text-align:center;">
        <div style="font-family:var(--font-display); font-size:42px; color:var(--accent); margin-bottom:6px;">${l.country}</div>
        <div style="font-family:var(--font-heading); font-weight:700; font-size:16px; margin-bottom:4px;">${l.short}</div>
        <div style="font-size:11px; color:var(--fg-muted); font-family:var(--font-mono);">${clubCount} 队 · ${playerCount} 球员</div>
      </a>
    `;
  }

  function bigTransferCardHTML(t) {
    const p = S.getPlayer(t.player_id);
    const from = S.getClub(t.from_club_id);
    const to = S.getClub(t.to_club_id);
    const fv = S.formatValue(t.fee);
    return `
      <div class="card card-pad">
        <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
          ${playerAvatar(p)}
          <div style="flex:1;">
            <div style="font-family:var(--font-heading); font-weight:700; font-size:16px;">${p?.name || '?'}</div>
            <div style="font-size:12px; color:var(--fg-muted);">${p?.pos || ''} · ${p?.nat || ''}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:var(--font-display); font-size:24px; color:var(--warn);">${fv.num}</div>
            <div style="font-size:11px; color:var(--fg-faint);">${fv.unit}</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:10px; justify-content:space-between; padding-top:12px; border-top:1px dashed var(--border-soft);">
          <div style="display:flex; align-items:center; gap:6px;">${clubBadge(from)} <span class="club-name muted" style="font-size:13px;">${from?.short || '?'}</span></div>
          <span style="color:var(--accent); font-family:var(--font-mono); font-size:12px;">→ 转会 →</span>
          <div style="display:flex; align-items:center; gap:6px;">${clubBadge(to)} <span class="club-name" style="font-size:13px;">${to?.short || '?'}</span></div>
        </div>
        <div style="font-size:11px; color:var(--fg-faint); margin-top:10px; font-family:var(--font-mono);">📅 ${t.date}</div>
      </div>
    `;
  }

  // ============================================================
  // 身价榜
  // ============================================================
  let rankFilters = { q: '', pos: '', clubId: '', minVal: 0 };

  function rankings(params, root) {
    renderRankings(root);
  }

  function renderRankings(root, filteredOverride) {
    const S_ = S.state;
    const filtered = filteredOverride || filterPlayers();
    root.innerHTML = `
      <section class="section fade-up">
        <div class="section-head">
          <div>
            <h2 class="section-title">球员身价榜</h2>
            <p class="section-sub">共 ${filtered.length} 名球员 · 单位：万欧元</p>
          </div>
        </div>

        <div class="filter-bar">
          <div class="search-wrap">
            <input type="text" id="filterQ" placeholder="搜索球员姓名 / 英文名..." value="${rankFilters.q}">
          </div>
          <label>位置
            <select id="filterPos">
              <option value="">全部</option>
              <option value="GK" ${rankFilters.pos==='GK'?'selected':''}>GK 门将</option>
              <option value="DF" ${rankFilters.pos==='DF'?'selected':''}>DF 后卫</option>
              <option value="MF" ${rankFilters.pos==='MF'?'selected':''}>MF 中场</option>
              <option value="FW" ${rankFilters.pos==='FW'?'selected':''}>FW 前锋</option>
            </select>
          </label>
          <label>俱乐部
            <select id="filterClub">
              <option value="">全部</option>
              ${S_.clubs.map(c => `<option value="${c.id}" ${rankFilters.clubId==c.id?'selected':''}>${c.name}</option>`).join('')}
            </select>
          </label>
          <label>最低身价 <span class="range-value" id="rangeVal">${rankFilters.minVal}万</span>
            <input type="range" id="filterMin" min="0" max="20000" step="500" value="${rankFilters.minVal}">
          </label>
          <span class="filter-count">${filtered.length} / ${S_.players.length}</span>
        </div>

        <div class="card" style="overflow-x:auto;">
          <table class="rank-table">
            <thead>
              <tr>
                <th>#</th>
                <th>球员</th>
                <th>位置</th>
                <th>俱乐部</th>
                <th>年龄</th>
                <th>国籍</th>
                <th style="text-align:right;">身价</th>
                <th style="text-align:right;">涨跌</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0
                ? `<tr><td colspan="8"><div class="empty"><div class="em">🔍</div><p>未找到匹配的球员</p></div></td></tr>`
                : filtered.map((p, i) => rankRowHTML(p, i + 1)).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
    bindRankFilters(root);
  }

  function filterPlayers() {
    const S_ = S.state;
    let arr = [...S_.players];
    if (rankFilters.q) {
      const q = rankFilters.q.toLowerCase();
      arr = arr.filter(p => p.name.toLowerCase().includes(q) || (p.en || '').toLowerCase().includes(q));
    }
    if (rankFilters.pos) {
      arr = arr.filter(p => S.posGroup(p.pos) === rankFilters.pos);
    }
    if (rankFilters.clubId) {
      arr = arr.filter(p => p.club_id === +rankFilters.clubId);
    }
    if (rankFilters.minVal > 0) {
      arr = arr.filter(p => p.mv >= rankFilters.minVal);
    }
    return arr.sort((a, b) => b.mv - a.mv);
  }

  function rankRowHTML(p, rank) {
    const club = S.getClub(p.club_id);
    const fv = S.formatValue(p.mv);
    const rankCls = rank === 1 ? 'top1' : rank <= 3 ? 'top3' : '';
    return `
      <tr data-href="#/player/${p.id}">
        <td class="rank-num ${rankCls}">${rank}</td>
        <td>
          <div class="td-player">
            ${playerAvatar(p)}
            <div>
              <div class="player-name">${p.name}</div>
              <div class="player-en">${p.en || ''}</div>
            </div>
          </div>
        </td>
        <td><span class="pos-pill ${S.posGroup(p.pos)}">${p.pos}</span></td>
        <td><div style="display:flex; align-items:center; gap:6px;">${clubBadge(club)} <span class="club-name muted" style="font-size:13px;">${club?.short || ''}</span></div></td>
        <td>${p.age}</td>
        <td>${p.nat}</td>
        <td style="text-align:right;"><span class="value-cell">${fv.num}<span class="unit">${fv.unit}</span></span></td>
        <td style="text-align:right;">${valueBadge(p.mv, p.pv)}</td>
      </tr>
    `;
  }

  function bindRankFilters(root) {
    const q = $('#filterQ', root);
    const pos = $('#filterPos', root);
    const club = $('#filterClub', root);
    const min = $('#filterMin', root);
    const rangeVal = $('#rangeVal', root);

    q.addEventListener('input', () => {
      rankFilters.q = q.value;
      renderRankings(root, filterPlayers());
      // 重新聚焦
      const newQ = $('#filterQ', root);
      newQ.focus();
      newQ.setSelectionRange(q.value.length, q.value.length);
    });
    pos.addEventListener('change', () => { rankFilters.pos = pos.value; renderRankings(root, filterPlayers()); });
    club.addEventListener('change', () => { rankFilters.clubId = club.value; renderRankings(root, filterPlayers()); });
    min.addEventListener('input', () => {
      rankFilters.minVal = +min.value;
      rangeVal.textContent = min.value + '万';
    });
    min.addEventListener('change', () => renderRankings(root, filterPlayers()));
  }

  // ============================================================
  // 球员详情
  // ============================================================
  function playerDetail(params, root) {
    const id = +params[0];
    const p = S.getPlayer(id);
    if (!p) {
      root.innerHTML = `<div class="empty"><div class="em">❓</div><p>找不到该球员</p><p><a href="#/rankings">返回身价榜</a></p></div>`;
      return;
    }
    const club = S.getClub(p.club_id);
    const fv = S.formatValue(p.mv);
    const transfers = S.getTransfersByPlayer(id).sort((a, b) => b.date.localeCompare(a.date));
    const news = S.getNewsByPlayer(id);
    const history = S.getValueHistory(id);

    root.innerHTML = `
      <section class="fade-up">
        <div class="detail-hero">
          <div class="detail-avatar-block">
            <div class="detail-avatar">${S.initials(p.name)}</div>
            <div class="detail-num">#${p.num}</div>
          </div>
          <div class="detail-info">
            <h2>${p.name}</h2>
            <div class="detail-en">${p.en || ''}</div>
            <div class="detail-attrs">
              <div class="detail-attr"><div class="k">俱乐部</div><div class="v" style="display:flex;align-items:center;gap:6px;">${clubBadge(club)} ${club?.name || '?'}</div></div>
              <div class="detail-attr"><div class="k">位置</div><div class="v"><span class="pos-pill ${S.posGroup(p.pos)}">${p.pos}</span></div></div>
              <div class="detail-attr"><div class="k">年龄</div><div class="v">${p.age}</div></div>
              <div class="detail-attr"><div class="k">国籍</div><div class="v">${p.nat}</div></div>
            </div>
            <div class="detail-value-block">
              <div>
                <div class="label">当前身价</div>
                <div><span class="amount">${fv.num}</span> <span class="unit">${fv.unit}</span></div>
              </div>
              <div class="delta">${valueBadge(p.mv, p.pv)} ${deltaPercent(p.mv, p.pv)}</div>
            </div>
          </div>
        </div>
      </section>

      ${history.length > 1 ? `
        <section class="fade-up d1">
          <div class="section-head"><h2 class="section-title">身价曲线</h2><span class="section-sub">历史身价变化</span></div>
          <div class="chart-wrap">${valueChartHTML(history)}</div>
        </section>
      ` : ''}

      <section class="fade-up d2">
        <div class="section-head"><h2 class="section-title">转会历史</h2><span class="section-sub">${transfers.length} 笔记录</span></div>
        <div class="timeline">
          ${transfers.length === 0
            ? `<div class="empty"><div class="em">📭</div><p>暂无转会记录</p></div>`
            : transfers.map(t => transferTimelineItemHTML(t)).join('')}
        </div>
      </section>

      ${news.length > 0 ? `
        <section class="fade-up d3">
          <div class="section-head"><h2 class="section-title">相关新闻</h2></div>
          <div class="grid grid-2">${news.map(n => newsCardHTML(n)).join('')}</div>
        </section>
      ` : ''}
    `;
  }

  function valueChartHTML(history) {
    if (history.length < 2) return '<p style="color:var(--fg-muted); text-align:center;">数据不足以绘制曲线</p>';
    const W = 800, H = 240, PAD = 50;
    const values = history.map(h => h.value);
    const max = Math.max(...values) * 1.1;
    const min = Math.min(...values) * 0.85;
    const range = max - min || 1;
    const stepX = (W - PAD * 2) / (history.length - 1);
    const points = history.map((h, i) => {
      const x = PAD + i * stepX;
      const y = H - PAD - ((h.value - min) / range) * (H - PAD * 2);
      return { x, y, h };
    });
    const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ',' + p.y).join(' ');
    const areaPath = path + ` L${points[points.length - 1].x},${H - PAD} L${points[0].x},${H - PAD} Z`;

    return `
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <!-- 网格 -->
        ${[0.25, 0.5, 0.75].map(r => `<line x1="${PAD}" x2="${W - PAD}" y1="${PAD + r * (H - PAD * 2)}" y2="${PAD + r * (H - PAD * 2)}" stroke="var(--border-soft)" stroke-dasharray="3 4"/>`).join('')}
        <line x1="${PAD}" x2="${W - PAD}" y1="${H - PAD}" y2="${H - PAD}" stroke="var(--border)"/>
        <line x1="${PAD}" x2="${PAD}" y1="${PAD}" y2="${H - PAD}" stroke="var(--border)"/>
        <!-- 区域 -->
        <path d="${areaPath}" fill="url(#chartGrad)"/>
        <!-- 折线 -->
        <path d="${path}" stroke="var(--accent)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- 数据点 -->
        ${points.map(p => `
          <g>
            <circle cx="${p.x}" cy="${p.y}" r="5" fill="var(--bg-elev)" stroke="var(--accent)" stroke-width="2"/>
            <text x="${p.x}" y="${p.y - 12}" text-anchor="middle" font-family="var(--font-mono)" font-size="10" fill="var(--accent)">${S.formatValue(p.h.value).num}${S.formatValue(p.h.value).unit}</text>
            <text x="${p.x}" y="${H - PAD + 16}" text-anchor="middle" font-family="var(--font-mono)" font-size="9" fill="var(--fg-muted)">${p.h.date}</text>
          </g>
        `).join('')}
      </svg>
    `;
  }

  function transferTimelineItemHTML(t) {
    const p = S.getPlayer(t.player_id);
    const from = S.getClub(t.from_club_id);
    const to = S.getClub(t.to_club_id);
    const feeText = S.formatFee(t.fee);
    const feeClass = t.type === 'free' ? 'free' : t.type === 'loan' ? 'loan' : '';
    const typeLabel = t.type === 'free' ? '自由转会' : t.type === 'loan' ? '租借' : '转会';
    return `
      <div class="timeline-item ${t.type}">
        <div class="timeline-date">📅 ${t.date} · ${typeLabel}</div>
        <div class="timeline-body">
          <div class="timeline-clubs">
            ${clubBadge(from)} <span class="club-name muted">${from?.short || '?'}</span>
            <span class="timeline-arrow">→</span>
            ${clubBadge(to)} <span class="club-name">${to?.short || '?'}</span>
          </div>
          <div class="timeline-fee ${feeClass}">${feeText}</div>
        </div>
      </div>
    `;
  }

  // ============================================================
  // 俱乐部详情
  // ============================================================
  function clubDetail(params, root) {
    const id = +params[0];
    const club = S.getClub(id);
    if (!club) {
      root.innerHTML = `<div class="empty"><div class="em">❓</div><p>找不到该俱乐部</p></div>`;
      return;
    }
    const league = S.getLeague(club.league_id);
    const players = S.getPlayersByClub(id).sort((a, b) => b.mv - a.mv);
    const matches = S.getMatchesByClub(id).slice(0, 5);
    const totalValue = players.reduce((s, p) => s + p.mv, 0);
    const groups = { GK: [], DF: [], MF: [], FW: [] };
    players.forEach(p => groups[S.posGroup(p.pos)].push(p));

    root.innerHTML = `
      <section class="fade-up">
        <div class="detail-hero" style="grid-template-columns: 200px 1fr;">
          <div class="detail-avatar-block">
            <div class="detail-avatar" style="background:${club.color}; font-family:var(--font-display);">${club.crest}</div>
            <div class="detail-num">${club.short}</div>
          </div>
          <div class="detail-info">
            <h2>${club.name}</h2>
            <div class="detail-en">${league?.country} ${league?.name}</div>
            <div class="detail-attrs">
              <div class="detail-attr"><div class="k">联赛</div><div class="v"><a href="#/league/${league.id}" style="color:var(--accent);">${league?.short || '?'}</a></div></div>
              <div class="detail-attr"><div class="k">一线队球员</div><div class="v">${players.length}</div></div>
              <div class="detail-attr"><div class="k">球队总身价</div><div class="v" style="color:var(--accent);">${S.formatValue(totalValue).num} ${S.formatValue(totalValue).unit}</div></div>
              <div class="detail-attr"><div class="k">身价最高</div><div class="v">${players[0] ? players[0].name : '-'}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section class="fade-up d1">
        <div class="section-head"><h2 class="section-title">一线队阵容</h2><span class="section-sub">总身价 ${S.formatValue(totalValue).num} ${S.formatValue(totalValue).unit}</span></div>
        ${['GK', 'DF', 'MF', 'FW'].map(g => groups[g].length === 0 ? '' : `
          <div class="squad-group">
            <div class="squad-group-head">${posLabel(g)} <span class="pos-pill ${g}">${g} · ${groups[g].length}人</span></div>
            ${groups[g].map(p => squadRowHTML(p)).join('')}
          </div>
        `).join('')}
      </section>

      ${matches.length > 0 ? `
        <section class="fade-up d2">
          <div class="section-head"><h2 class="section-title">最近赛果</h2></div>
          <div class="grid grid-3">${matches.map(m => matchCardHTML(m, id)).join('')}</div>
        </section>
      ` : ''}
    `;
  }

  function squadRowHTML(p) {
    const fv = S.formatValue(p.mv);
    return `
      <div class="squad-row" data-href="#/player/${p.id}">
        <span class="squad-num">${p.num}</span>
        ${playerAvatar(p)}
        <div class="squad-row-name">${p.name} <small>${p.en || ''}</small></div>
        <span class="pos-pill ${S.posGroup(p.pos)}">${p.pos}</span>
        <span style="color:var(--fg-muted); font-size:12px;">${p.nat} ${p.age}岁</span>
        <span class="squad-row-value">${fv.num}<span style="font-size:10px; color:var(--fg-faint); margin-left:2px;">${fv.unit}</span></span>
      </div>
    `;
  }

  function matchCardHTML(m, highlightClubId = null) {
    const home = S.getClub(m.home_club_id);
    const away = S.getClub(m.away_club_id);
    const isHomeWin = m.home_score > m.away_score;
    const isDraw = m.home_score === m.away_score;
    const scoreClass = isDraw ? 'draw' : 'win';
    return `
      <div class="match-card">
        <div class="match-team">
          ${clubBadge(home)} <span class="club-name ${highlightClubId === home.id ? '' : 'muted'}" style="font-size:13px;">${home.short}</span>
        </div>
        <div style="text-align:center;">
          <div class="match-score ${scoreClass}">${m.home_score}-${m.away_score}</div>
          <div class="match-date">${m.date}</div>
        </div>
        <div class="match-team away">
          <span class="club-name ${highlightClubId === away.id ? '' : 'muted'}" style="font-size:13px;">${away.short}</span> ${clubBadge(away)}
        </div>
      </div>
    `;
  }

  function posLabel(g) {
    return { GK: '门将', DF: '后卫', MF: '中场', FW: '前锋' }[g] || g;
  }

  // ============================================================
  // 联赛页
  // ============================================================
  function leaguePage(params, root) {
    const leagueId = params[0] || 'epl';
    renderLeague(root, leagueId);
  }

  function renderLeague(root, leagueId) {
    const S_ = S.state;
    const league = S.getLeague(leagueId);
    const standings = S.getStandings(leagueId);
    const matches = S.getMatchesByLeague(leagueId).slice(0, 6);
    const scorers = S.getScorers(leagueId);

    root.innerHTML = `
      <section class="fade-up">
        <div class="section-head">
          <div>
            <h2 class="section-title">${league?.country} ${league?.name}</h2>
            <p class="section-sub">2024-25 赛季 · 积分榜 / 射手榜 / 赛果</p>
          </div>
        </div>
        <div class="league-tabs">
          ${S_.leagues.map(l => `<a href="#/league/${l.id}" class="league-tab ${l.id === leagueId ? 'active' : ''}">${l.country} ${l.short}</a>`).join('')}
        </div>

        <div style="display:grid; grid-template-columns: 1.6fr 1fr; gap:24px;" id="leagueGrid">
          <div>
            <div class="card" style="padding:8px 0; overflow-x:auto;">
              <table class="standings-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th style="text-align:left;">球队</th>
                    <th>场</th><th>胜</th><th>平</th><th>负</th>
                    <th>进</th><th>失</th><th>净</th>
                    <th>积分</th>
                  </tr>
                </thead>
                <tbody>
                  ${standings.map((t, i) => {
                    const c = S.getClub(t.club_id);
                    const rank = i + 1;
                    const zone = rank <= 4 ? 'cl' : rank >= standings.length - 2 ? 'releg' : '';
                    const pill = rank <= 4 ? 'cl' : rank === 5 ? 'el' : rank >= standings.length - 2 ? 'releg' : '';
                    return `
                      <tr class="${zone}" data-href="#/club/${c.id}">
                        <td>${pill ? `<span class="zone-pill ${pill}"></span>` : ''}${rank}</td>
                        <td class="team-cell"><div style="display:flex;align-items:center;gap:8px;">${clubBadge(c)} ${c.name}</div></td>
                        <td>${t.played}</td><td>${t.win}</td><td>${t.draw}</td><td>${t.loss}</td>
                        <td>${t.gf}</td><td>${t.ga}</td><td style="color:${t.gd>0?'var(--up)':t.gd<0?'var(--down)':'var(--fg-muted)'}">${t.gd>0?'+':''}${t.gd}</td>
                        <td class="pts">${t.pts}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
            <div class="standings-legend">
              <span><span class="zone-pill cl"></span> 欧冠区</span>
              <span><span class="zone-pill el"></span> 欧联区</span>
              <span><span class="zone-pill releg"></span> 降级区</span>
            </div>
          </div>

          <div>
            <div class="card card-pad" style="margin-bottom:20px;">
              <h3 style="font-family:var(--font-heading); margin-bottom:14px; color:var(--accent);">⚽ 射手榜 TOP ${scorers.length}</h3>
              ${scorers.length === 0 ? '<p style="color:var(--fg-muted); font-size:13px;">暂无数据</p>' : `
                <ol style="display:flex; flex-direction:column; gap:8px;">
                  ${scorers.map((s, i) => `
                    <li style="display:flex; align-items:center; gap:10px; padding:6px 0; border-bottom:1px dashed var(--border-soft);">
                      <span style="font-family:var(--font-display); font-size:20px; color:${i<3?'var(--gold)':'var(--fg-faint)'}; width:24px;">${i+1}</span>
                      ${playerAvatar(s)}
                      <div style="flex:1; cursor:pointer;" data-href="#/player/${s.id}">
                        <div style="font-weight:600; font-size:14px;">${s.name}</div>
                        <div style="font-size:11px; color:var(--fg-muted);">${S.getClub(s.club_id)?.short || ''}</div>
                      </div>
                      <span style="font-family:var(--font-display); font-size:24px; color:var(--accent);">${s.goals}</span>
                    </li>
                  `).join('')}
                </ol>
              `}
            </div>

            <div class="card card-pad">
              <h3 style="font-family:var(--font-heading); margin-bottom:14px; color:var(--accent);">📅 近期赛果</h3>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${matches.map(m => matchCardHTML(m)).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ============================================================
  // 游戏页（占位，game.js 接管 canvas）
  // ============================================================
  function gamePage(params, root) {
    root.innerHTML = `
      <section class="fade-up">
        <div class="section-head">
          <div>
            <h2 class="section-title">点球大战 ⚽</h2>
            <p class="section-sub">5 轮制 + 突然死亡 · 选择射门角度与力度，看能否击败 AI 守门员</p>
          </div>
        </div>
        <div class="game-wrap">
          <div class="game-canvas-wrap">
            <canvas id="gameCanvas" width="800" height="500"></canvas>
          </div>
          <div class="game-side" id="gameSide">
            <!-- game.js 渲染 -->
          </div>
        </div>
      </section>
    `;
    // 启动游戏
    if (window.TM_GAME) window.TM_GAME.start();
  }

  // ============================================================
  // 后台入口（admin.js 接管）
  // ============================================================
  function adminPage(params, root) {
    if (window.TM_ADMIN) window.TM_ADMIN.render(root);
  }

  // ============================================================
  // 注册路由
  // ============================================================
  R.add('/', home);
  R.add('/rankings', rankings);
  R.add('/player/:id', playerDetail);
  R.add('/club/:id', clubDetail);
  R.add('/league/:id', leaguePage);
  R.add('/league', leaguePage);
  R.add('/game', gamePage);
  R.add('/admin', adminPage);

  // 全局点击委托：data-href 跳转
  document.addEventListener('click', e => {
    const target = e.target.closest('[data-href]');
    if (target) {
      const href = target.getAttribute('data-href');
      if (href) {
        e.preventDefault();
        R.navigate(href);
      }
    }
  });

  window.TM_PAGES = { renderRankings, renderLeague, newsCardHTML, topPlayerCardHTML };
})();
