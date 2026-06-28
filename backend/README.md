# 深鸡蛋坪山公园球王榜 - Cloudflare 后端部署指南

## 项目结构

```
backend/
├── src/
│   └── index.js       # Workers 主入口，包含所有 API 端点
├── schema.sql         # D1 数据库表结构
├── wrangler.toml      # Wrangler 配置文件
└── package.json       # 项目依赖
```

## 部署步骤

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

### 3. 创建 D1 数据库

```bash
wrangler d1 create football-db
```

执行后会输出数据库 ID，复制这个 ID。

### 4. 配置 wrangler.toml

打开 `wrangler.toml`，将 `your-database-id-here` 替换为上一步得到的数据库 ID：

```toml
[[d1_databases]]
binding = "DB"
database_name = "football-db"
database_id = "你的数据库ID"
```

### 5. 初始化数据库表

执行以下命令创建数据表（本地开发环境）：

```bash
cd backend
npm run init-db-local
```

生产环境：

```bash
npm run init-db
```

### 6. 部署 Workers

```bash
npm run deploy
```

部署成功后会显示 Worker 的 URL，格式类似于：
`https://football-backend.your-account.workers.dev`

### 7. 修改前端配置

打开 `/workspace/js/config.js`，将 `API_URL` 修改为你的 Worker URL：

```javascript
export const API_URL = "https://football-backend.your-account.workers.dev";
```

## 本地开发

```bash
cd backend
npm run dev
```

本地开发时 API 地址为：`http://localhost:8787`

## API 端点列表

### 球员相关
- `GET /players` - 获取已通过的球员列表
- `GET /allPlayers` - 获取所有球员（管理员用）
- `GET /waitPlayers` - 获取待审核球员
- `POST /addPlayer` - 注册球员
- `GET /passPlayer?id=` - 审核通过球员
- `GET /rejectPlayer?id=` - 驳回球员
- `POST /deletePlayer` - 删除球员
- `POST /revokePlayer` - 撤销球员认证
- `POST /setPlayerMatches` - 设置球员场次
- `POST /adminAddGoal` - 管理员调整进球

### 进球相关
- `GET /waitMatches` - 待审核进球
- `POST /addGoal` - 提交进球
- `GET /passGoal?id=` - 审核通过进球
- `GET /rejectGoal?id=` - 驳回进球
- `POST /undoGoal` - 撤销进球
- `GET /getGoalMatchTimes` - 获取进球比赛时间列表
- `POST /setGoalMatchTimes` - 添加/删除进球比赛时间

### 比赛/组队相关
- `GET /getCurrentMatch` - 获取当前比赛
- `POST /createMatch` - 创建比赛
- `POST /endMatch` - 结束比赛
- `GET /getSignupList` - 获取报名列表
- `POST /signupMatch` - 报名比赛
- `POST /cancelSignup` - 取消报名

### 小队相关
- `GET /getApprovedTeams` - 获取已通过的小队
- `POST /createTeam` - 创建小队
- `POST /joinTeam` - 申请加入小队
- `POST /approveJoin` - 队长通过申请
- `POST /rejectJoin` - 队长拒绝申请
- `POST /kickMember` - 踢出成员
- `GET /getPendingTeams` - 待审核小队（管理员）
- `POST /approveTeam` - 审核通过小队
- `POST /rejectTeam` - 拒绝小队
- `GET /getMyTeamAndApplications?playerId=` - 获取我的小队和申请

### 投票相关
- `GET /vote` - 获取投票信息
- `POST /vote` - 提交投票
- `POST /setVoteTitle` - 设置投票标题
- `POST /resetVote` - 重置投票

### 设置相关
- `GET /getReward` - 获取奖励规则
- `POST /setReward` - 设置奖励规则
- `GET /getCustomTitle` - 获取自定义标题
- `POST /setCustomTitle` - 设置自定义标题

### 射手榜
- `GET /` - 获取射手榜数据（已通过的进球记录）

## 管理员密码

默认管理员密码为 `20041202`，存储在 `settings` 表的 `admin_password` 键中。如需修改，可直接操作数据库。

## 前端部署

前端是纯静态页面，可以部署到：
- Cloudflare Pages
- GitHub Pages
- Vercel
- 任何静态托管服务

部署后确保 `js/config.js` 中的 `API_URL` 指向你的 Workers 地址。
