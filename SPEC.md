# 深鸡蛋坪山公园球王榜 - 项目规范

## 1. 项目概述

- **项目名称**: 深鸡蛋坪山公园球王榜
- **项目类型**: 足球进球记录与投票管理系统
- **核心功能**: 球员管理、进球记录、射手榜、组队、投票、管理后台
- **目标用户**: 足球队员和管理员

## 2. 技术架构

### 前端技术栈
- 纯 HTML/CSS/JavaScript（无框架）
- 模块化 JavaScript（ES6 模块）
- Fetch API 进行后端通信

### 文件结构
```
/workspace
├── index.html          # 主入口文件
├── styles.css          # 样式文件
├── config.js           # 配置（API_URL, 管理员密码等）
├── api.js              # API 调用封装
├── auth.js             # 登录/认证相关功能
├── team.js             # 组队功能
├── vote.js             # 投票功能
├── admin.js            # 管理后台功能
└── main.js             # 主入口，页面初始化和路由
```

### 后端 API
- **Base URL**: `https://footballpoint.top`
- 所有 API 调用使用 Fetch API

## 3. 全局状态管理

状态由各个模块分别管理和导出：

- **auth.js**: 管理登录状态
  - `globalLoggedInPlayer` - 当前登录的球员对象
  - `currentPlayerId` - 当前球员ID
  - `currentPlayerPwd` - 当前球员密码
  - `currentVotePlayerId` - 投票时使用的球员ID
  - `currentVotePlayerPwd` - 投票时使用的密码

- **admin.js**: 管理管理员状态
  - `isAdminLoggedIn` - 管理员是否已登录

- **team.js**: 管理组队状态
  - `currentTeamId` - 当前操作的小队ID

- **vote.js**: 管理投票状态
  - `selectedVoteOption` - 选中的投票选项

## 4. 模块职责

### config.js
- 项目配置常量
- API URL
- 管理员密码

### api.js
- 所有 fetch 请求封装
- 统一的错误处理
- 请求/响应拦截

### auth.js
- 全局登录 (`globalLogin`)
- 全局退出 (`globalLogout`)
- 初始化登录状态 (`initGlobalLogin`)
- 页面退出函数

### team.js
- 比赛管理（创建、结束、加载）
- 报名接龙
- 小队管理（创建、加入、审核）
- 踢出成员

### vote.js
- 投票渲染
- 选项选择
- 提交投票
- 投票管理（管理员）

### admin.js
- 管理员登录
- 球员管理（审核、删除、追加进球、设置场次）
- 进球管理
- 小队审核
- 标题和奖励规则管理

### main.js
- 页面初始化
- 路由控制 (showPage)
- 弹窗管理
- 全局事件绑定

## 5. 页面结构

| 页面 ID | 名称 | 功能 |
|---------|------|------|
| mainPage | 主界面 | 球员登录、注册、提交进球 |
| rankPage | 射手榜 | 显示进球排名 |
| teamPage | 善意组队 | 比赛报名、小队管理 |
| rewardPage | 奖励规则 | 查看/编辑奖励规则 |
| votePage | 投票 | 最佳球员投票 |
| adminPage | 管理后台 | 管理员功能 |

## 6. 认证流程

### 全局登录
1. 用户在主界面选择球员并输入密码
2. 调用 `globalLogin()` 验证
3. 成功后设置 `auth.js` 中的 `globalLoggedInPlayer` 等状态
4. 更新所有页面的登录状态显示

### 页面退出
- `teamPageLogout()`: 清除组队页和全局状态
- `votePageLogout()`: 清除投票页和全局状态
- `globalLogout()`: 清除所有全局状态

## 7. 命名规范

### 函数命名
- 使用驼峰命名法
- 以功能模块为前缀：`renderVote()`, `loadTeamList()`

### DOM 操作
- 避免直接操作 DOM，封装在模块内
- 统一的 showMsg 提示函数

## 8. API 端点

| 端点 | 方法 | 用途 |
|------|------|------|
| / | GET | 获取射手榜数据 |
| /players | GET | 获取球员列表 |
| /addPlayer | POST | 注册球员 |
| /addGoal | POST | 提交进球 |
| /allPlayers | GET | 获取所有球员 |
| /waitPlayers | GET | 待审核球员 |
| /waitMatches | GET | 待审核进球 |
| /passPlayer | GET | 审核通过球员 |
| /rejectPlayer | GET | 驳回球员申请 |
| /deletePlayer | POST | 删除球员 |
| /revokePlayer | POST | 撤销球员认证 |
| /setPlayerMatches | POST | 设置球员场次 |
| /adminAddGoal | POST | 管理员追加进球 |
| /passGoal | GET | 审核通过进球 |
| /rejectGoal | GET | 驳回进球申请 |
| /undoGoal | POST | 撤销已通过的进球 |
| /getGoalMatchTimes | GET | 获取进球比赛时间列表 |
| /setGoalMatchTimes | POST | 添加/删除进球比赛时间 |
| /getCurrentMatch | GET | 获取当前比赛 |
| /createMatch | POST | 创建比赛 |
| /endMatch | POST | 结束比赛 |
| /getSignupList | GET | 获取报名列表 |
| /signupMatch | POST | 报名比赛 |
| /cancelSignup | POST | 取消报名 |
| /getApprovedTeams | GET | 获取已通过小队 |
| /createTeam | POST | 创建小队 |
| /joinTeam | POST | 加入小队 |
| /approveJoin | POST | 队长审核加入申请 |
| /rejectJoin | POST | 队长拒绝加入申请 |
| /kickMember | POST | 队长踢出成员 |
| /getPendingTeams | GET | 待审核小队 |
| /approveTeam | POST | 审核通过小队 |
| /rejectTeam | POST | 拒绝小队 |
| /getMyTeamAndApplications | GET | 获取球员的小队和申请记录 |
| /vote | GET/POST | 投票 |
| /setVoteTitle | POST | 设置投票标题 |
| /resetVote | POST | 重置投票 |
| /getReward | GET | 获取奖励规则 |
| /setReward | POST | 设置奖励规则 |
| /getCustomTitle | GET | 获取自定义标题 |
| /setCustomTitle | POST | 设置自定义标题 |

## 9. 开发规范

- 使用 ES6 模块 (`<script type="module">`)
- 所有模块导出必要的函数和状态
- 避免全局变量污染
- 保持向后兼容
