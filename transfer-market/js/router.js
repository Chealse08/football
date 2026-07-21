// ============================================================
// 德转风暴 - 哈希路由
// ============================================================
(function () {
  const routes = [];
  let currentPath = null;

  function parse() {
    let hash = location.hash.slice(1);
    if (!hash || hash === '/') return { path: '/' };
    if (!hash.startsWith('/')) hash = '/' + hash;
    // 去掉查询字符串
    const qIdx = hash.indexOf('?');
    if (qIdx >= 0) hash = hash.slice(0, qIdx);
    return { path: hash };
  }

  // 支持 /player/:id 这种带参路由
  function add(pattern, handler) {
    // 把 pattern 转成正则：/player/:id -> /^\/player\/([^/]+)$/
    const re = new RegExp('^' + pattern.replace(/:[^/]+/g, '([^/]+)') + '$');
    routes.push({ pattern, re, handler });
  }

  function match(path) {
    for (const r of routes) {
      const m = path.match(r.re);
      if (m) return { handler: r.handler, params: m.slice(1) };
    }
    return null;
  }

  function navigate(path) {
    if (location.hash !== '#' + path) {
      location.hash = path;
    } else {
      render();
    }
  }

  function render() {
    const { path } = parse();
    currentPath = path;
    const m = match(path);
    const app = document.getElementById('app');
    if (!app) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (m) {
      try {
        app.innerHTML = '';
        const result = m.handler(m.params, app);
        if (result && typeof result === 'string') app.innerHTML = result;
        else if (result && typeof result.then === 'function') {
          // 异步渲染（暂不支持，留接口）
        }
      } catch (e) {
        console.error('Route render error:', e);
        app.innerHTML = `<div class="empty"><div class="em">⚠️</div><p>渲染出错：${e.message}</p></div>`;
      }
    } else {
      app.innerHTML = `<div class="empty"><div class="em">🚫</div><p>页面不存在：${path}</p><p><a href="#/">返回首页</a></p></div>`;
    }
    updateNav();
  }

  function updateNav() {
    const { path } = parse();
    const navs = document.querySelectorAll('.nav a, .drawer a');
    navs.forEach(a => {
      const route = a.getAttribute('data-route');
      const href = a.getAttribute('href').slice(1);
      let active = false;
      if (route === '/league' && path.startsWith('/league')) active = true;
      else if (route === path) active = true;
      else if (route === '/' && path === '/') active = true;
      else if (href === '#' + path) active = true;
      a.classList.toggle('active', active);
    });
    // 关闭移动端抽屉
    document.getElementById('mobileDrawer')?.classList.remove('open');
    document.getElementById('drawerBackdrop')?.classList.remove('show');
  }

  function start() {
    window.addEventListener('hashchange', render);
    if (!location.hash) location.hash = '#/';
    else render();
  }

  function current() { return parse(); }

  window.TM_ROUTER = { add, navigate, start, render, current };
})();
