// ============================================================
// 德转风暴 - 点球大战 Canvas 游戏
// 5 轮制 + 突然死亡
// ============================================================
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  let canvas, ctx;
  let state = null;
  let rafId = null;

  // 球门尺寸
  const GOAL = { x: 200, y: 80, w: 400, h: 200 };
  // 足球起点（点球点）
  const BALL_START = { x: 400, y: 460 };

  function init() {
    canvas = document.getElementById('gameCanvas');
    if (!canvas) return false;
    ctx = canvas.getContext('2d');
    return true;
  }

  function start() {
    if (!init()) return;
    state = {
      round: 1,
      maxRounds: 5,
      playerMarks: [],   // 每轮：'goal' | 'miss'
      aiMarks: [],
      playerScore: 0,
      aiScore: 0,
      phase: 'aim',      // aim | shooting | result | ai-turn | ai-shooting | over
      aim: 'center',     // left / center / right
      power: 70,
      ball: { x: BALL_START.x, y: BALL_START.y, vx: 0, vy: 0, r: 10 },
      keeper: { x: 400, y: 180, w: 60, h: 80, target: null, anim: 0 },
      shotResult: null,
      message: '点击射门方向开始游戏',
      suddenDeath: false,
    };
    cancelAnimationFrame(rafId);
    renderSide();
    loop();
  }

  function loop() {
    draw();
    update();
    rafId = requestAnimationFrame(loop);
  }

  function draw() {
    // 草地背景
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#1a5f3f');
    grad.addColorStop(1, '#0d3525');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 草地纹理（条纹）
    for (let i = 0; i < canvas.height; i += 30) {
      ctx.fillStyle = (Math.floor(i / 30) % 2 === 0) ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, i, canvas.width, 30);
    }

    // 球门
    drawGoal();
    // 点球点
    ctx.beginPath();
    ctx.arc(BALL_START.x, BALL_START.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    // 守门员
    drawKeeper();
    // 足球
    drawBall();

    // 顶部信息条
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`第 ${state.round} 轮 ${state.suddenDeath ? '(突然死亡)' : ''}`, 16, 24);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#22C55E';
    ctx.fillText(`你 ${state.playerScore}`, canvas.width / 2 - 50, 24);
    ctx.fillStyle = '#F97316';
    ctx.fillText(`AI ${state.aiScore}`, canvas.width / 2 + 50, 24);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = '12px monospace';
    ctx.fillText(state.message, canvas.width - 16, 24);

    // 瞄准提示线
    if (state.phase === 'aim') {
      drawAimGuide();
    }
  }

  function drawGoal() {
    // 球门网（背景）
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(GOAL.x, GOAL.y, GOAL.w, GOAL.h);
    // 网格
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1;
    for (let x = GOAL.x; x <= GOAL.x + GOAL.w; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, GOAL.y); ctx.lineTo(x, GOAL.y + GOAL.h); ctx.stroke();
    }
    for (let y = GOAL.y; y <= GOAL.y + GOAL.h; y += 20) {
      ctx.beginPath(); ctx.moveTo(GOAL.x, y); ctx.lineTo(GOAL.x + GOAL.w, y); ctx.stroke();
    }
    // 球门柱
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(GOAL.x, GOAL.y + GOAL.h);
    ctx.lineTo(GOAL.x, GOAL.y);
    ctx.lineTo(GOAL.x + GOAL.w, GOAL.y);
    ctx.lineTo(GOAL.x + GOAL.w, GOAL.y + GOAL.h);
    ctx.stroke();
  }

  function drawKeeper() {
    const k = state.keeper;
    ctx.fillStyle = '#F97316';
    ctx.fillRect(k.x - k.w / 2, k.y - k.h / 2, k.w, k.h);
    // 头
    ctx.beginPath();
    ctx.arc(k.x, k.y - k.h / 2 - 8, 10, 0, Math.PI * 2);
    ctx.fill();
    // 编号
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GK', k.x, k.y + 5);
  }

  function drawBall() {
    const b = state.ball;
    // 阴影
    ctx.beginPath();
    ctx.ellipse(b.x, b.y + b.r + 2, b.r * 0.9, b.r * 0.3, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fill();
    // 球体
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // 五边形纹路
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawAimGuide() {
    // 虚线指向瞄准位置
    const targetX = state.aim === 'left' ? GOAL.x + 80 : state.aim === 'right' ? GOAL.x + GOAL.w - 80 : GOAL.x + GOAL.w / 2;
    const targetY = GOAL.y + GOAL.h / 2;
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(state.ball.x, state.ball.y);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();
    ctx.setLineDash([]);
    // 瞄准点
    ctx.beginPath();
    ctx.arc(targetX, targetY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.4)';
    ctx.fill();
    ctx.strokeStyle = '#22C55E';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function update() {
    if (state.phase === 'shooting') {
      // 球飞行
      const b = state.ball;
      b.x += b.vx;
      b.y += b.vy;
      // 重力
      b.vy += 0.15;
      // 球缩小（远透视）
      if (b.r > 5) b.r -= 0.06;

      // 守门员扑救动画
      const k = state.keeper;
      if (k.target !== null) {
        const targetX = k.target;
        k.x += (targetX - k.x) * 0.18;
      }

      // 判断是否到达球门
      if (b.y <= GOAL.y + GOAL.h && b.x >= GOAL.x && b.x <= GOAL.x + GOAL.w && b.y <= GOAL.y + 30) {
        // 进球判定：守门员位置与球位置足够远
        const dist = Math.abs(b.x - k.x);
        const saved = dist < k.w / 2 + 8 && Math.random() < 0.35;
        // 实际：根据力度 + 瞄准判断
        // 力度越高，扑救概率越低；瞄准远角，扑救概率更低
        // 我们在 shoot() 时已确定结果，这里只播动画
      }

      // 球完全到达球门后判定
      if (b.y < GOAL.y + 20) {
        finishPlayerShot();
      } else if (b.y < 0 || b.x < 0 || b.x > canvas.width) {
        finishPlayerShot();
      }
    } else if (state.phase === 'ai-shooting') {
      const b = state.ball;
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.15;
      if (b.r > 5) b.r -= 0.06;

      const k = state.keeper;
      if (k.target !== null) {
        const targetX = k.target;
        k.x += (targetX - k.x) * 0.18;
      }

      if (b.y < GOAL.y + 20 || b.y < 0) {
        finishAiShot();
      }
    }
  }

  function shoot() {
    if (state.phase !== 'aim') return;
    const aim = state.aim;
    const power = state.power;

    // 目标位置
    const targetX = aim === 'left' ? GOAL.x + 80 + (Math.random() - 0.5) * 40
                  : aim === 'right' ? GOAL.x + GOAL.w - 80 + (Math.random() - 0.5) * 40
                  : GOAL.x + GOAL.w / 2 + (Math.random() - 0.5) * 40;
    const targetY = GOAL.y + 30 + Math.random() * 30;

    // 计算速度（飞行帧数与力度反比）
    const frames = Math.max(20, 50 - power * 0.3);
    state.ball.vx = (targetX - state.ball.x) / frames;
    state.ball.vy = (targetY - state.ball.y) / frames - 1.5;

    // 守门员扑救方向：30% 猜对方向
    const guessRight = Math.random() < 0.33;
    const guessLeft = Math.random() < 0.33;
    let keeperTarget;
    if (guessLeft && !guessRight) keeperTarget = GOAL.x + 60;
    else if (guessRight && !guessLeft) keeperTarget = GOAL.x + GOAL.w - 60;
    else keeperTarget = GOAL.x + GOAL.w / 2 + (Math.random() - 0.5) * 80;
    state.keeper.target = keeperTarget;

    // 判定是否进球：守门员位置 vs 球落点
    setTimeout(() => {
      const dist = Math.abs(targetX - state.keeper.x);
      // 力度越高，守门员扑救概率越低
      const saveThreshold = 35 + (100 - power) * 0.3;  // 力度100时为35，力度0时为65
      const saved = dist < saveThreshold;
      state.shotResult = saved ? 'miss' : 'goal';
    }, 400);

    state.phase = 'shooting';
    state.message = '射门！';
    renderSide();
  }

  function finishPlayerShot() {
    if (state.phase !== 'shooting') return;
    // 等判定结果
    const checkResult = () => {
      if (state.shotResult === null) {
        setTimeout(checkResult, 50);
        return;
      }
      const result = state.shotResult;
      state.playerMarks.push(result);
      if (result === 'goal') {
        state.playerScore++;
        state.message = '⚽ 进球！';
      } else {
        state.message = '❌ 被扑出！';
      }
      state.phase = 'result';
      renderSide();

      // 检查胜负
      setTimeout(() => {
        if (checkGameOver()) return;
        // AI 回合
        startAiTurn();
      }, 1200);
    };
    checkResult();
  }

  function startAiTurn() {
    state.phase = 'ai-turn';
    state.message = 'AI 准备射门...';
    // 重置球
    state.ball = { x: BALL_START.x, y: BALL_START.y, vx: 0, vy: 0, r: 10 };
    state.keeper = { x: 400, y: 180, w: 60, h: 80, target: null, anim: 0 };
    state.shotResult = null;
    renderSide();
    setTimeout(aiShoot, 800);
  }

  function aiShoot() {
    // AI 选择方向
    const choices = ['left', 'center', 'right'];
    const aiAim = choices[Math.floor(Math.random() * 3)];
    const aiPower = 60 + Math.random() * 40;

    const targetX = aiAim === 'left' ? GOAL.x + 80 + (Math.random() - 0.5) * 40
                  : aiAim === 'right' ? GOAL.x + GOAL.w - 80 + (Math.random() - 0.5) * 40
                  : GOAL.x + GOAL.w / 2 + (Math.random() - 0.5) * 40;
    const targetY = GOAL.y + 30 + Math.random() * 30;

    const frames = Math.max(20, 50 - aiPower * 0.3);
    state.ball.vx = (targetX - state.ball.x) / frames;
    state.ball.vy = (targetY - state.ball.y) / frames - 1.5;

    // 玩家守门员：默认 AI 扑救方向预测
    const aiGuess = choices[Math.floor(Math.random() * 3)];
    let keeperTarget;
    if (aiGuess === 'left') keeperTarget = GOAL.x + 60;
    else if (aiGuess === 'right') keeperTarget = GOAL.x + GOAL.w - 60;
    else keeperTarget = GOAL.x + GOAL.w / 2;
    state.keeper.target = keeperTarget;

    setTimeout(() => {
      const dist = Math.abs(targetX - state.keeper.x);
      const saved = dist < 40;
      state.shotResult = saved ? 'miss' : 'goal';
    }, 400);

    state.phase = 'ai-shooting';
    state.message = 'AI 射门！';
    renderSide();
  }

  function finishAiShot() {
    if (state.phase !== 'ai-shooting') return;
    const checkResult = () => {
      if (state.shotResult === null) {
        setTimeout(checkResult, 50);
        return;
      }
      const result = state.shotResult;
      state.aiMarks.push(result);
      if (result === 'goal') {
        state.aiScore++;
        state.message = '⚽ AI 进球';
      } else {
        state.message = '🧤 你扑出了！';
      }
      state.phase = 'result';
      renderSide();

      setTimeout(() => {
        if (checkGameOver()) return;
        // 下一轮玩家
        state.round++;
        state.phase = 'aim';
        state.message = `第 ${state.round} 轮 - 你的回合`;
        state.ball = { x: BALL_START.x, y: BALL_START.y, vx: 0, vy: 0, r: 10 };
        state.keeper = { x: 400, y: 180, w: 60, h: 80, target: null, anim: 0 };
        state.shotResult = null;
        renderSide();
      }, 1200);
    };
    checkResult();
  }

  function checkGameOver() {
    const playerRemain = state.maxRounds - state.playerMarks.length;
    const aiRemain = state.maxRounds - state.aiMarks.length;
    // 常规轮次中提前分胜负
    if (state.playerMarks.length === state.aiMarks.length && state.playerMarks.length >= state.maxRounds) {
      // 进入突然死亡或结束
      if (state.playerScore !== state.aiScore) {
        return endGame();
      } else {
        state.suddenDeath = true;
        state.maxRounds++;
      }
    } else if (state.playerMarks.length >= state.maxRounds && state.aiMarks.length < state.maxRounds) {
      // 玩家已踢完，AI 还剩
      if (state.playerScore > state.aiScore + aiRemain) return endGame();
    } else if (state.aiMarks.length >= state.maxRounds && state.playerMarks.length < state.maxRounds) {
      if (state.aiScore > state.playerScore + playerRemain) return endGame();
    }
    // 突然死亡阶段
    if (state.suddenDeath && state.playerMarks.length === state.aiMarks.length && state.playerMarks.length >= 5) {
      if (state.playerScore !== state.aiScore) return endGame();
    }
    return false;
  }

  function endGame() {
    state.phase = 'over';
    const win = state.playerScore > state.aiScore;
    state.message = win ? '🏆 你赢了！' : '😢 你输了';
    state.gameResult = win ? 'win' : 'lose';
    renderSide();
    if (window.TM_STORE) window.TM_STORE.toast(win ? '🏆 点球大战胜利！' : '😢 点球大战失利', win ? 'success' : 'danger');
    return true;
  }

  function renderSide() {
    const side = document.getElementById('gameSide');
    if (!side) return;
    const markCell = (mark, idx) => {
      if (mark === undefined) return `<span class="pending">·</span>`;
      return mark === 'goal' ? `<span class="on">⚽</span>` : `<span class="miss">✗</span>`;
    };
    side.innerHTML = `
      <div class="scoreboard">
        <div class="score-row">
          <div class="who">🧑 你</div>
          <div class="marks">${Array.from({length: state.maxRounds}).map((_, i) => markCell(state.playerMarks[i], i)).join('')}</div>
          <div style="font-family:var(--font-display); font-size:24px; color:var(--accent);">${state.playerScore}</div>
        </div>
        <div class="score-row">
          <div class="who">🤖 AI</div>
          <div class="marks">${Array.from({length: state.maxRounds}).map((_, i) => markCell(state.aiMarks[i], i)).join('')}</div>
          <div style="font-family:var(--font-display); font-size:24px; color:var(--warn);">${state.aiScore}</div>
        </div>
        <div class="round-info">第 ${state.round} 轮 ${state.suddenDeath ? '· 突然死亡' : ''}</div>
      </div>

      <div class="game-status ${state.phase === 'shooting' || state.phase === 'ai-shooting' ? 'shoot' : ''} ${state.phase === 'over' ? (state.gameResult === 'win' ? 'win' : 'lose') : ''}">
        ${state.phase === 'over' ? (state.gameResult === 'win' ? '🏆 胜利！' : '😢 失败') : state.message}
      </div>

      ${state.phase === 'aim' ? `
        <div>
          <div class="power-label">瞄准方向</div>
          <div class="aim-control">
            <button class="aim-btn ${state.aim==='left'?'':''}" data-aim="left">⬅ 左</button>
            <button class="aim-btn" data-aim="center">⬆ 中</button>
            <button class="aim-btn" data-aim="right">➡ 右</button>
          </div>
        </div>
        <div>
          <div class="power-label">力度：<span style="color:var(--warn); font-weight:700;">${state.power}</span></div>
          <div class="power-control">
            <input type="range" id="powerRange" min="20" max="100" value="${state.power}">
            <span style="font-size:11px; color:var(--fg-muted); font-family:var(--font-mono);">大力=难扑</span>
          </div>
        </div>
        <button class="btn btn-primary" id="shootBtn" style="justify-content:center; padding:14px;">⚽ 射门！</button>
      ` : ''}

      ${state.phase === 'over' ? `
        <button class="btn btn-primary" id="restartBtn" style="justify-content:center; padding:14px;">🔄 再来一局</button>
      ` : ''}

      <div class="game-instructions">
        <strong>玩法：</strong> 选择射门方向（左/中/右），调节力度，点击射门。力度越大，越难被扑救但更容易偏出。5 轮后若平局进入突然死亡。
      </div>
    `;

    // 绑定事件
    $$('.aim-btn', side).forEach(b => {
      b.addEventListener('click', () => {
        if (state.phase !== 'aim') return;
        state.aim = b.dataset.aim;
        $$('.aim-btn', side).forEach(x => x.style.background = '');
        b.style.background = 'var(--accent)';
        b.style.color = '#000';
      });
    });
    const powerRange = $('#powerRange', side);
    if (powerRange) powerRange.addEventListener('input', () => { state.power = +powerRange.value; });
    const shootBtn = $('#shootBtn', side);
    if (shootBtn) shootBtn.addEventListener('click', shoot);
    const restartBtn = $('#restartBtn', side);
    if (restartBtn) restartBtn.addEventListener('click', start);

    // 默认高亮当前瞄准
    if (state.phase === 'aim') {
      const cur = side.querySelector(`[data-aim="${state.aim}"]`);
      if (cur) { cur.style.background = 'var(--accent)'; cur.style.color = '#000'; }
    }
  }

  // 离开游戏页时清理
  function destroy() {
    cancelAnimationFrame(rafId);
    rafId = null;
    state = null;
  }

  // 路由变化时检测游戏页是否还在
  window.addEventListener('hashchange', () => {
    if (!location.hash.startsWith('#/game')) destroy();
  });

  window.TM_GAME = { start, destroy };
})();
