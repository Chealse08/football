// ============================================================
// 德转风暴 - 管理后台 CRUD
// ============================================================
(function () {
  const S = window.TM_STORE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  let currentTab = 'players';
  let editingId = null;

  const ADMIN_USER = 'admin';
  const ADMIN_PWD = '1234';

  function render(root) {
    if (!S.state.adminLoggedIn) {
      renderLogin(root);
      return;
    }
    renderDashboard(root);
  }

  function renderLogin(root) {
    root.innerHTML = `
      <div class="admin-login fade-up">
        <h2>🔐 管理员登录</h2>
        <form id="loginForm">
          <input type="text" id="loginUser" placeholder="用户名" autocomplete="off" value="admin">
          <input type="password" id="loginPwd" placeholder="密码" autocomplete="off" value="1234">
          <button type="submit" class="btn btn-primary">登录</button>
        </form>
        <p style="text-align:center; font-size:11px; color:var(--fg-faint); margin-top:16px; font-family:var(--font-mono);">
          默认账号：admin / 1234
        </p>
      </div>
    `;
    $('#loginForm', root).addEventListener('submit', e => {
      e.preventDefault();
      const u = $('#loginUser', root).value.trim();
      const p = $('#loginPwd', root).value.trim();
      if (u === ADMIN_USER && p === ADMIN_PWD) {
        S.setState({ adminLoggedIn: true });
        S.toast('登录成功');
        renderDashboard(root);
      } else {
        S.toast('账号或密码错误', 'danger');
      }
    });
  }

  function renderDashboard(root) {
    root.innerHTML = `
      <section class="fade-up">
        <div class="section-head">
          <div>
            <h2 class="section-title">管理后台</h2>
            <p class="section-sub">增删改球员 / 俱乐部 / 新闻 · 修改后自动持久化</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-ghost" id="resetBtn">↺ 重置数据</button>
            <button class="btn btn-danger" id="logoutBtn">退出登录</button>
          </div>
        </div>

        <div class="admin-layout">
          <div class="admin-tabs">
            <button class="admin-tab ${currentTab==='players'?'active':''}" data-tab="players">👤 球员 (${S.state.players.length})</button>
            <button class="admin-tab ${currentTab==='clubs'?'active':''}" data-tab="clubs">🏟️ 俱乐部 (${S.state.clubs.length})</button>
            <button class="admin-tab ${currentTab==='news'?'active':''}" data-tab="news">📰 新闻 (${S.state.news.length})</button>
            <button class="admin-tab ${currentTab==='transfers'?'active':''}" data-tab="transfers">🔄 转会 (${S.state.transfers.length})</button>
          </div>
          <div class="admin-panel" id="adminPanel"></div>
        </div>
      </section>
    `;

    $$('.admin-tab', root).forEach(t => {
      t.addEventListener('click', () => {
        currentTab = t.dataset.tab;
        editingId = null;
        renderDashboard(root);
      });
    });

    $('#resetBtn', root).addEventListener('click', () => {
      S.modal({
        title: '重置所有数据？',
        body: '此操作将清空所有管理员修改，恢复到初始模拟数据。无法撤销。',
        actions: [
          { label: '取消', kind: 'ghost', onClick: box => box.remove() },
          { label: '确认重置', kind: 'primary', onClick: box => {
            S.reset();
            box.remove();
            S.toast('数据已重置');
            renderDashboard(root);
            R.render();
          }}
        ]
      });
    });

    $('#logoutBtn', root).addEventListener('click', () => {
      S.setState({ adminLoggedIn: false });
      S.toast('已退出');
      R.navigate('/');
    });

    renderPanel(root);
  }

  function renderPanel(root) {
    const panel = $('#adminPanel', root);
    if (!panel) return;
    if (currentTab === 'players') renderPlayersPanel(panel, root);
    else if (currentTab === 'clubs') renderClubsPanel(panel, root);
    else if (currentTab === 'news') renderNewsPanel(panel, root);
    else if (currentTab === 'transfers') renderTransfersPanel(panel, root);
  }

  // ---------- 球员管理 ----------
  function renderPlayersPanel(panel, root) {
    const editing = editingId != null ? S.getPlayer(editingId) : null;
    panel.innerHTML = `
      <div class="admin-form">
        <label>姓名<input type="text" id="p_name" value="${editing?.name || ''}" placeholder="如：哈兰德"></label>
        <label>英文名<input type="text" id="p_en" value="${editing?.en || ''}" placeholder="E. Haaland"></label>
        <label>位置
          <select id="p_pos">
            ${['GK','LB','CB','RB','DM','CM','AM','LW','RW','ST'].map(p => `<option ${editing?.pos===p?'selected':''}>${p}</option>`).join('')}
          </select>
        </label>
        <label>年龄<input type="number" id="p_age" value="${editing?.age || 25}" min="14" max="50"></label>
        <label>号码<input type="number" id="p_num" value="${editing?.num || 10}" min="1" max="99"></label>
        <label>俱乐部
          <select id="p_club">
            ${S.state.clubs.map(c => `<option value="${c.id}" ${editing?.club_id===c.id?'selected':''}>${c.name}</option>`).join('')}
          </select>
        </label>
        <label>国籍<input type="text" id="p_nat" value="${editing?.nat || '🏴'}" placeholder="🏴"></label>
        <label>当前身价(万欧)<input type="number" id="p_mv" value="${editing?.mv || 1000}" min="0" step="100"></label>
        <label>上次身价(万欧)<input type="number" id="p_pv" value="${editing?.pv || 1000}" min="0" step="100"></label>
        <div class="admin-form-actions">
          ${editingId != null ? `<button class="btn btn-ghost" id="cancelBtn">↩ 取消编辑</button>` : ''}
          <button class="btn btn-primary" id="saveBtn">${editingId != null ? '💾 保存修改' : '➕ 新增球员'}</button>
        </div>
      </div>

      <div style="overflow-x:auto; max-height:480px; overflow-y:auto;">
        <table class="admin-table">
          <thead>
            <tr><th>ID</th><th>姓名</th><th>位置</th><th>俱乐部</th><th>年龄</th><th>身价(万)</th><th>操作</th></tr>
          </thead>
          <tbody>
            ${S.state.players.map(p => {
              const c = S.getClub(p.club_id);
              return `<tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td><span class="pos-pill ${S.posGroup(p.pos)}">${p.pos}</span></td>
                <td>${c?.short || '-'}</td>
                <td>${p.age}</td>
                <td>${p.mv.toLocaleString()}</td>
                <td class="row-actions">
                  <button data-edit="${p.id}">编辑</button>
                  <button class="del" data-del="${p.id}">删</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    $('#saveBtn', panel).addEventListener('click', () => {
      const data = {
        name: $('#p_name', panel).value.trim(),
        en: $('#p_en', panel).value.trim(),
        pos: $('#p_pos', panel).value,
        age: +$('#p_age', panel).value,
        num: +$('#p_num', panel).value,
        club_id: +$('#p_club', panel).value,
        nat: $('#p_nat', panel).value.trim() || '🏴',
        mv: +$('#p_mv', panel).value,
        pv: +$('#p_pv', panel).value,
      };
      if (!data.name) { S.toast('请填写姓名', 'warn'); return; }
      if (editingId != null) {
        const idx = S.state.players.findIndex(p => p.id === editingId);
        if (idx >= 0) S.state.players[idx] = { ...S.state.players[idx], ...data };
        S.toast('已更新球员');
      } else {
        const id = S.nextId(S.state.players);
        S.state.players.push({ id, ...data });
        S.toast('已新增球员');
      }
      editingId = null;
      S.persist(); S.notify();
      renderDashboard(root);
    });

    if (editingId != null) {
      $('#cancelBtn', panel).addEventListener('click', () => { editingId = null; renderDashboard(root); });
    }
    $$('[data-edit]', panel).forEach(b => b.addEventListener('click', () => { editingId = +b.dataset.edit; renderDashboard(root); }));
    $$('[data-del]', panel).forEach(b => b.addEventListener('click', () => {
      const id = +b.dataset.del;
      const p = S.getPlayer(id);
      S.modal({
        title: '删除球员？',
        body: `确认删除「${p?.name}」？此操作不可撤销。`,
        actions: [
          { label: '取消', kind: 'ghost', onClick: box => box.remove() },
          { label: '删除', kind: 'primary', onClick: box => {
            S.state.players = S.state.players.filter(x => x.id !== id);
            S.state.transfers = S.state.transfers.filter(t => t.player_id !== id);
            S.state.news = S.state.news.filter(n => n.player_id !== id);
            S.persist(); S.notify();
            box.remove();
            S.toast('已删除', 'warn');
            renderDashboard(root);
          }}
        ]
      });
    }));
  }

  // ---------- 俱乐部管理 ----------
  function renderClubsPanel(panel, root) {
    const editing = editingId != null ? S.getClub(editingId) : null;
    panel.innerHTML = `
      <div class="admin-form">
        <label>名称<input type="text" id="c_name" value="${editing?.name || ''}" placeholder="如：曼城"></label>
        <label>缩写<input type="text" id="c_short" value="${editing?.short || ''}" placeholder="MCI" maxlength="4"></label>
        <label>联赛
          <select id="c_league">
            ${S.state.leagues.map(l => `<option value="${l.id}" ${editing?.league_id===l.id?'selected':''}>${l.short}</option>`).join('')}
          </select>
        </label>
        <label>主色<input type="text" id="c_color" value="${editing?.color || '#22C55E'}" placeholder="#22C55E"></label>
        <label>徽章符号<input type="text" id="c_crest" value="${editing?.crest || '◈'}" placeholder="◈" maxlength="2"></label>
        <div class="admin-form-actions">
          ${editingId != null ? `<button class="btn btn-ghost" id="cancelBtn">↩ 取消编辑</button>` : ''}
          <button class="btn btn-primary" id="saveBtn">${editingId != null ? '💾 保存修改' : '➕ 新增俱乐部'}</button>
        </div>
      </div>

      <div style="overflow-x:auto; max-height:480px; overflow-y:auto;">
        <table class="admin-table">
          <thead><tr><th>ID</th><th>名称</th><th>缩写</th><th>联赛</th><th>球员数</th><th>操作</th></tr></thead>
          <tbody>
            ${S.state.clubs.map(c => {
              const l = S.getLeague(c.league_id);
              const cnt = S.state.players.filter(p => p.club_id === c.id).length;
              return `<tr>
                <td>${c.id}</td>
                <td><span class="club-badge" style="background:${c.color}; width:18px; height:18px; font-size:10px;">${c.crest}</span> ${c.name}</td>
                <td>${c.short}</td>
                <td>${l?.short || '-'}</td>
                <td>${cnt}</td>
                <td class="row-actions">
                  <button data-edit="${c.id}">编辑</button>
                  <button class="del" data-del="${c.id}">删</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    $('#saveBtn', panel).addEventListener('click', () => {
      const data = {
        name: $('#c_name', panel).value.trim(),
        short: $('#c_short', panel).value.trim().toUpperCase(),
        league_id: $('#c_league', panel).value,
        color: $('#c_color', panel).value.trim(),
        crest: $('#c_crest', panel).value.trim() || '◈',
      };
      if (!data.name) { S.toast('请填写名称', 'warn'); return; }
      if (editingId != null) {
        const idx = S.state.clubs.findIndex(c => c.id === editingId);
        if (idx >= 0) S.state.clubs[idx] = { ...S.state.clubs[idx], ...data };
        S.toast('已更新俱乐部');
      } else {
        const id = S.nextId(S.state.clubs);
        S.state.clubs.push({ id, ...data });
        S.toast('已新增俱乐部');
      }
      editingId = null;
      S.persist(); S.notify();
      renderDashboard(root);
    });

    if (editingId != null) $('#cancelBtn', panel).addEventListener('click', () => { editingId = null; renderDashboard(root); });
    $$('[data-edit]', panel).forEach(b => b.addEventListener('click', () => { editingId = +b.dataset.edit; renderDashboard(root); }));
    $$('[data-del]', panel).forEach(b => b.addEventListener('click', () => {
      const id = +b.dataset.del;
      const c = S.getClub(id);
      const playerCount = S.state.players.filter(p => p.club_id === id).length;
      S.modal({
        title: '删除俱乐部？',
        body: `确认删除「${c?.name}」？${playerCount > 0 ? `该俱乐部下还有 ${playerCount} 名球员，将一并删除。` : ''}`,
        actions: [
          { label: '取消', kind: 'ghost', onClick: box => box.remove() },
          { label: '删除', kind: 'primary', onClick: box => {
            S.state.clubs = S.state.clubs.filter(x => x.id !== id);
            S.state.players = S.state.players.filter(p => p.club_id !== id);
            S.persist(); S.notify();
            box.remove();
            S.toast('已删除', 'warn');
            renderDashboard(root);
          }}
        ]
      });
    }));
  }

  // ---------- 新闻管理 ----------
  function renderNewsPanel(panel, root) {
    const editing = editingId != null ? S.state.news.find(n => n.id === editingId) : null;
    panel.innerHTML = `
      <div class="admin-form">
        <label>标题<input type="text" id="n_title" value="${editing?.title || ''}" placeholder="新闻标题"></label>
        <label>摘要<input type="text" id="n_summary" value="${editing?.summary || ''}" placeholder="一句话摘要"></label>
        <label>关联球员
          <select id="n_player">
            <option value="">无</option>
            ${S.state.players.map(p => `<option value="${p.id}" ${editing?.player_id===p.id?'selected':''}>${p.name}</option>`).join('')}
          </select>
        </label>
        <label>关联俱乐部
          <select id="n_club">
            <option value="">无</option>
            ${S.state.clubs.map(c => `<option value="${c.id}" ${editing?.club_id===c.id?'selected':''}>${c.name}</option>`).join('')}
          </select>
        </label>
        <label>日期<input type="date" id="n_date" value="${editing?.date || new Date().toISOString().slice(0,10)}"></label>
        <label>来源<input type="text" id="n_source" value="${editing?.source || '官方公告'}" placeholder="如：罗马诺"></label>
        <label>标签
          <select id="n_tag">
            ${['重磅转会','身价更新','租借','官方公告','传闻'].map(t => `<option ${editing?.tag===t?'selected':''}>${t}</option>`).join('')}
          </select>
        </label>
        <label>转会费(万欧, 可空)<input type="number" id="n_fee" value="${editing?.fee ?? ''}" placeholder="留空表示无"></label>
        <div class="admin-form-actions">
          ${editingId != null ? `<button class="btn btn-ghost" id="cancelBtn">↩ 取消编辑</button>` : ''}
          <button class="btn btn-primary" id="saveBtn">${editingId != null ? '💾 保存修改' : '➕ 新增新闻'}</button>
        </div>
      </div>

      <div style="max-height:480px; overflow-y:auto;">
        <table class="admin-table">
          <thead><tr><th>ID</th><th>标题</th><th>标签</th><th>日期</th><th>来源</th><th>操作</th></tr></thead>
          <tbody>
            ${S.state.news.slice().sort((a,b) => b.date.localeCompare(a.date)).map(n => `
              <tr>
                <td>${n.id}</td>
                <td style="max-width:280px;">${n.title}</td>
                <td><span class="news-tag tag-${n.tag}" style="font-size:10px;">${n.tag}</span></td>
                <td>${n.date}</td>
                <td>${n.source}</td>
                <td class="row-actions">
                  <button data-edit="${n.id}">编辑</button>
                  <button class="del" data-del="${n.id}">删</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    $('#saveBtn', panel).addEventListener('click', () => {
      const feeRaw = $('#n_fee', panel).value;
      const data = {
        title: $('#n_title', panel).value.trim(),
        summary: $('#n_summary', panel).value.trim(),
        player_id: $('#n_player', panel).value ? +$('#n_player', panel).value : null,
        club_id: $('#n_club', panel).value ? +$('#n_club', panel).value : null,
        date: $('#n_date', panel).value,
        source: $('#n_source', panel).value.trim() || '官方公告',
        tag: $('#n_tag', panel).value,
        fee: feeRaw === '' ? null : +feeRaw,
      };
      if (!data.title) { S.toast('请填写标题', 'warn'); return; }
      if (editingId != null) {
        const idx = S.state.news.findIndex(n => n.id === editingId);
        if (idx >= 0) S.state.news[idx] = { ...S.state.news[idx], ...data };
        S.toast('已更新新闻');
      } else {
        const id = S.nextId(S.state.news);
        S.state.news.push({ id, ...data });
        S.toast('已新增新闻');
      }
      editingId = null;
      S.persist(); S.notify();
      renderDashboard(root);
    });

    if (editingId != null) $('#cancelBtn', panel).addEventListener('click', () => { editingId = null; renderDashboard(root); });
    $$('[data-edit]', panel).forEach(b => b.addEventListener('click', () => { editingId = +b.dataset.edit; renderDashboard(root); }));
    $$('[data-del]', panel).forEach(b => b.addEventListener('click', () => {
      const id = +b.dataset.del;
      S.modal({
        title: '删除新闻？',
        body: '确认删除该条新闻？',
        actions: [
          { label: '取消', kind: 'ghost', onClick: box => box.remove() },
          { label: '删除', kind: 'primary', onClick: box => {
            S.state.news = S.state.news.filter(x => x.id !== id);
            S.persist(); S.notify();
            box.remove();
            S.toast('已删除', 'warn');
            renderDashboard(root);
          }}
        ]
      });
    }));
  }

  // ---------- 转会管理 ----------
  function renderTransfersPanel(panel, root) {
    const editing = editingId != null ? S.state.transfers.find(t => t.id === editingId) : null;
    panel.innerHTML = `
      <div class="admin-form">
        <label>球员
          <select id="t_player">
            ${S.state.players.map(p => `<option value="${p.id}" ${editing?.player_id===p.id?'selected':''}>${p.name}</option>`).join('')}
          </select>
        </label>
        <label>转出俱乐部
          <select id="t_from">
            ${S.state.clubs.map(c => `<option value="${c.id}" ${editing?.from_club_id===c.id?'selected':''}>${c.name}</option>`).join('')}
          </select>
        </label>
        <label>转入俱乐部
          <select id="t_to">
            ${S.state.clubs.map(c => `<option value="${c.id}" ${editing?.to_club_id===c.id?'selected':''}>${c.name}</option>`).join('')}
          </select>
        </label>
        <label>转会费(万欧, 0=自由身)<input type="number" id="t_fee" value="${editing?.fee ?? 0}" min="0" step="100"></label>
        <label>日期<input type="date" id="t_date" value="${editing?.date || new Date().toISOString().slice(0,10)}"></label>
        <label>类型
          <select id="t_type">
            ${['in','out','loan','free'].map(t => `<option value="${t}" ${editing?.type===t?'selected':''}>${t}</option>`).join('')}
          </select>
        </label>
        <div class="admin-form-actions">
          ${editingId != null ? `<button class="btn btn-ghost" id="cancelBtn">↩ 取消编辑</button>` : ''}
          <button class="btn btn-primary" id="saveBtn">${editingId != null ? '💾 保存修改' : '➕ 新增转会'}</button>
        </div>
      </div>

      <div style="max-height:480px; overflow-y:auto;">
        <table class="admin-table">
          <thead><tr><th>ID</th><th>球员</th><th>从</th><th>到</th><th>费用</th><th>日期</th><th>操作</th></tr></thead>
          <tbody>
            ${S.state.transfers.slice().sort((a,b) => b.date.localeCompare(a.date)).map(t => {
              const p = S.getPlayer(t.player_id);
              const f = S.getClub(t.from_club_id);
              const to = S.getClub(t.to_club_id);
              return `<tr>
                <td>${t.id}</td>
                <td>${p?.name || '?'}</td>
                <td>${f?.short || '?'}</td>
                <td>${to?.short || '?'}</td>
                <td>${S.formatFee(t.fee)}</td>
                <td>${t.date}</td>
                <td class="row-actions">
                  <button data-edit="${t.id}">编辑</button>
                  <button class="del" data-del="${t.id}">删</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    $('#saveBtn', panel).addEventListener('click', () => {
      const data = {
        player_id: +$('#t_player', panel).value,
        from_club_id: +$('#t_from', panel).value,
        to_club_id: +$('#t_to', panel).value,
        fee: +$('#t_fee', panel).value || 0,
        date: $('#t_date', panel).value,
        type: $('#t_type', panel).value,
      };
      if (data.from_club_id === data.to_club_id) { S.toast('转入/转出不能相同', 'warn'); return; }
      if (editingId != null) {
        const idx = S.state.transfers.findIndex(t => t.id === editingId);
        if (idx >= 0) S.state.transfers[idx] = { ...S.state.transfers[idx], ...data };
        S.toast('已更新转会');
      } else {
        const id = S.nextId(S.state.transfers);
        S.state.transfers.push({ id, ...data });
        S.toast('已新增转会');
      }
      editingId = null;
      S.persist(); S.notify();
      renderDashboard(root);
    });

    if (editingId != null) $('#cancelBtn', panel).addEventListener('click', () => { editingId = null; renderDashboard(root); });
    $$('[data-edit]', panel).forEach(b => b.addEventListener('click', () => { editingId = +b.dataset.edit; renderDashboard(root); }));
    $$('[data-del]', panel).forEach(b => b.addEventListener('click', () => {
      const id = +b.dataset.del;
      S.state.transfers = S.state.transfers.filter(x => x.id !== id);
      S.persist(); S.notify();
      S.toast('已删除', 'warn');
      renderDashboard(root);
    }));
  }

  window.TM_ADMIN = { render };
})();
