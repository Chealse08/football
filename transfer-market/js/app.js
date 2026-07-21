// ============================================================
// 德转风暴 - 主入口
// 整合：主题切换 / 新闻滚动条 / 移动端抽屉 / 路由启动
// ============================================================
(function () {
  const S = window.TM_STORE;
  const R = window.TM_ROUTER;

  // ---------- 主题 ----------
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
  applyTheme(S.getTheme());

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const next = S.getTheme() === 'dark' ? 'light' : 'dark';
    S.setTheme(next);
    applyTheme(next);
  });

  // ---------- 新闻滚动条 ----------
  function buildTicker() {
    const track = document.getElementById('tickerTrack');
    if (!track) return;
    const news = [...S.state.news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
    const items = news.map(n => {
      const fee = n.fee == null ? '' : ` · ${S.formatFee(n.fee)}`;
      return `<span><strong>⚡</strong> ${n.title}${fee}</span>`;
    }).join('');
    // 复制一份用于无缝滚动
    track.innerHTML = `<div class="ticker-content">${items}${items}</div>`;
  }
  buildTicker();

  // 当数据变化时刷新滚动条
  S.subscribe(() => buildTicker());

  // ---------- 移动端抽屉 ----------
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const menuBtn = document.getElementById('mobileMenuBtn');
  function toggleDrawer(open) {
    drawer?.classList.toggle('open', open);
    backdrop?.classList.toggle('show', open);
  }
  menuBtn?.addEventListener('click', () => toggleDrawer(true));
  backdrop?.addEventListener('click', () => toggleDrawer(false));
  // 点击抽屉内链接自动关闭（路由变化也会触发，这里冗余处理）
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleDrawer(false)));

  // ---------- 启动路由 ----------
  R.start();

  // ---------- 调试日志 ----------
  console.log('%c⚽ 德转风暴已启动', 'color:#22C55E; font-weight:bold; font-size:14px;');
  console.log(`数据：${S.state.players.length} 球员 / ${S.state.clubs.length} 俱乐部 / ${S.state.news.length} 新闻`);
})();
