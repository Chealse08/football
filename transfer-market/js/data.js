// ============================================================
// 德转风暴 - 模拟数据层
// 包含联赛 / 俱乐部 / 球员 / 转会 / 比赛 / 新闻 / 身价历史
// ============================================================

// ---------- 联赛 ----------
const LEAGUES = [
  { id: 'epl',  name: '英格兰超级联赛', short: '英超', country: '🏴 EN', tier: 1 },
  { id: 'liga', name: '西班牙甲级联赛', short: '西甲', country: '🏴 ES', tier: 1 },
  { id: 'seriea', name: '意大利甲级联赛', short: '意甲', country: '🏴 IT', tier: 1 },
  { id: 'bundes', name: '德国甲级联赛', short: '德甲', country: '🏴 DE', tier: 1 },
  { id: 'ligue1', name: '法国甲级联赛', short: '法甲', country: '🏴 FR', tier: 1 },
];

// ---------- 俱乐部 ----------
// crest 用 emoji + 颜色块作为徽章替代
const CLUBS = [
  // 英超
  { id: 1,  name: '曼城',     short: 'MCI', league_id: 'epl', color: '#6CABDD', crest: '◈' },
  { id: 2,  name: '阿森纳',   short: 'ARS', league_id: 'epl', color: '#EF0107', crest: '◆' },
  { id: 3,  name: '利物浦',   short: 'LIV', league_id: 'epl', color: '#C8102E', crest: '✶' },
  { id: 4,  name: '曼联',     short: 'MUN', league_id: 'epl', color: '#DA291C', crest: '✦' },
  { id: 5,  name: '切尔西',   short: 'CHE', league_id: 'epl', color: '#034694', crest: '◇' },
  { id: 6,  name: '热刺',     short: 'TOT', league_id: 'epl', color: '#132257', crest: '⬡' },
  // 西甲
  { id: 7,  name: '皇家马德里', short: 'RMA', league_id: 'liga', color: '#FEBE10', crest: '♛' },
  { id: 8,  name: '巴塞罗那',   short: 'BAR', league_id: 'liga', color: '#A50044', crest: '⚜' },
  { id: 9,  name: '马德里竞技', short: 'ATM', league_id: 'liga', color: '#CB3524', crest: '◐' },
  // 意甲
  { id: 10, name: '国际米兰', short: 'INT', league_id: 'seriea', color: '#0068A8', crest: 'Ƨ' },
  { id: 11, name: 'AC米兰',   short: 'MIL', league_id: 'seriea', color: '#FB090B', crest: '✠' },
  { id: 12, name: '尤文图斯', short: 'JUV', league_id: 'seriea', color: '#000000', crest: 'J' },
  { id: 13, name: '那不勒斯', short: 'NAP', league_id: 'seriea', color: '#199FE2', crest: 'N' },
  // 德甲
  { id: 14, name: '拜仁慕尼黑', short: 'FCB', league_id: 'bundes', color: '#DC052D', crest: '◎' },
  { id: 15, name: '勒沃库森',   short: 'B04', league_id: 'bundes', color: '#E32221', crest: '⬢' },
  { id: 16, name: '多特蒙德',   short: 'BVB', league_id: 'bundes', color: '#FDE100', crest: '⬟' },
  // 法甲
  { id: 17, name: '巴黎圣日耳曼', short: 'PSG', league_id: 'ligue1', color: '#004170', crest: '✸' },
  { id: 18, name: '摩纳哥',     short: 'ASM', league_id: 'ligue1', color: '#E51B22', crest: '♦' },
  { id: 19, name: '马赛',       short: 'OM',  league_id: 'ligue1', color: '#2FAEE0', crest: '☆' },
  { id: 20, name: '里尔',       short: 'LIL', league_id: 'ligue1', color: '#E01E2C', crest: '⊴' },
];

// ---------- 球员 ----------
// market_value / prev_value 单位：万欧元
const PLAYERS = [
  // 英超
  { id: 1,  name: '哈兰德',     en: 'E. Haaland',    pos: 'ST',  age: 24, club_id: 1,  nat: '🇳🇴', mv: 20000, pv: 18000, num: 9 },
  { id: 2,  name: '福登',       en: 'P. Foden',      pos: 'AM',  age: 24, club_id: 1,  nat: '🏴', mv: 15000, pv: 13000, num: 47 },
  { id: 3,  name: '罗德里',     en: 'Rodri',         pos: 'DM',  age: 28, club_id: 1,  nat: '🇪🇸', mv: 13000, pv: 12000, num: 16 },
  { id: 4,  name: '德布劳内',   en: 'K. De Bruyne',  pos: 'AM',  age: 33, club_id: 1,  nat: '🇧🇪', mv: 6000,  pv: 7000,  num: 17 },
  { id: 5,  name: '萨卡',       en: 'B. Saka',       pos: 'RW',  age: 23, club_id: 2,  nat: '🏴', mv: 14000, pv: 12000, num: 7 },
  { id: 6,  name: '厄德高',     en: 'M. Ødegaard',   pos: 'AM',  age: 25, club_id: 2,  nat: '🇳🇴', mv: 11000, pv: 11000, num: 8 },
  { id: 7,  name: '赖斯',       en: 'D. Rice',       pos: 'DM',  age: 25, club_id: 2,  nat: '🏴', mv: 12000, pv: 11000, num: 41 },
  { id: 8,  name: '萨拉赫',     en: 'M. Salah',      pos: 'RW',  age: 32, club_id: 3,  nat: '🇪🇬', mv: 6500,  pv: 7000,  num: 11 },
  { id: 9,  name: '范戴克',     en: 'V. van Dijk',   pos: 'CB',  age: 33, club_id: 3,  nat: '🇳🇱', mv: 3000,  pv: 3500,  num: 4 },
  { id: 10, name: '麦卡利斯特', en: 'A. Mac Allister', pos: 'CM', age: 25, club_id: 3, nat: '🇦🇷', mv: 8000,  pv: 7000,  num: 10 },
  { id: 11, name: 'B费',        en: 'B. Fernandes',  pos: 'AM',  age: 30, club_id: 4,  nat: '🇵🇹', mv: 6000,  pv: 7000,  num: 8 },
  { id: 12, name: '梅努',       en: 'K. Mainoo',     pos: 'CM',  age: 19, club_id: 4,  nat: '🏴', mv: 5000,  pv: 4000,  num: 37 },
  { id: 13, name: '帕尔默',     en: 'C. Palmer',     pos: 'AM',  age: 22, club_id: 5,  nat: '🏴', mv: 9000,  pv: 5500,  num: 20 },
  { id: 14, name: '杰克逊',     en: 'N. Jackson',    pos: 'ST',  age: 23, club_id: 5,  nat: '🇸🇳', mv: 3500,  pv: 3000,  num: 15 },
  { id: 15, name: '麦迪逊',     en: 'J. Maddison',   pos: 'AM',  age: 27, club_id: 6,  nat: '🏴', mv: 4000,  pv: 4500,  num: 10 },
  { id: 16, name: '孙兴慜',     en: 'H. Son',        pos: 'LW',  age: 32, club_id: 6,  nat: '🇰🇷', mv: 4500,  pv: 5000,  num: 7 },
  // 西甲
  { id: 17, name: '姆巴佩',     en: 'K. Mbappé',     pos: 'ST',  age: 25, club_id: 7,  nat: '🇫🇷', mv: 18000, pv: 18000, num: 9 },
  { id: 18, name: '维尼修斯',   en: 'Vinícius Jr.',  pos: 'LW',  age: 24, club_id: 7,  nat: '🇧🇷', mv: 18000, pv: 15000, num: 7 },
  { id: 19, name: '贝林厄姆',   en: 'J. Bellingham', pos: 'AM',  age: 21, club_id: 7,  nat: '🏴', mv: 18000, pv: 15000, num: 5 },
  { id: 20, name: '罗德里戈',   en: 'Rodrygo',       pos: 'RW',  age: 23, club_id: 7,  nat: '🇧🇷', mv: 11000, pv: 10000, num: 11 },
  { id: 21, name: '亚马尔',     en: 'L. Yamal',      pos: 'RW',  age: 17, club_id: 8,  nat: '🇪🇸', mv: 12000, pv: 9000,  num: 19 },
  { id: 22, name: '佩德里',     en: 'Pedri',         pos: 'CM',  age: 21, club_id: 8,  nat: '🇪🇸', mv: 10000, pv: 9000,  num: 8 },
  { id: 23, name: '加维',       en: 'Gavi',          pos: 'CM',  age: 20, club_id: 8,  nat: '🇪🇸', mv: 7000,  pv: 8000,  num: 6 },
  { id: 24, name: '莱万',       en: 'R. Lewandowski', pos: 'ST', age: 36, club_id: 8,  nat: '🇵🇱', mv: 1500,  pv: 1800,  num: 9 },
  { id: 25, name: '格列兹曼',   en: 'A. Griezmann',  pos: 'AM',  age: 33, club_id: 9,  nat: '🇫🇷', mv: 2500,  pv: 2800,  num: 7 },
  { id: 26, name: '阿尔瓦雷斯', en: 'J. Álvarez',    pos: 'ST',  age: 24, club_id: 9,  nat: '🇦🇷', mv: 9000,  pv: 8000,  num: 19 },
  // 意甲
  { id: 27, name: '劳塔罗',     en: 'L. Martínez',   pos: 'ST',  age: 27, club_id: 10, nat: '🇦🇷', mv: 11000, pv: 11000, num: 10 },
  { id: 28, name: '巴雷拉',     en: 'N. Barella',    pos: 'CM',  age: 27, club_id: 10, nat: '🇮🇹', mv: 8000,  pv: 7500,  num: 23 },
  { id: 29, name: '莱奥',       en: 'R. Leão',       pos: 'LW',  age: 25, club_id: 11, nat: '🇵🇹', mv: 9000,  pv: 9000,  num: 10 },
  { id: 30, name: '普利西奇',   en: 'C. Pulisic',    pos: 'RW',  age: 26, club_id: 11, nat: '🇺🇸', mv: 5000,  pv: 4500,  num: 11 },
  { id: 31, name: '弗拉霍维奇', en: 'D. Vlahović',   pos: 'ST',  age: 24, club_id: 12, nat: '🇷🇸', mv: 4500,  pv: 5000,  num: 9 },
  { id: 32, name: '奥斯梅恩',   en: 'V. Osimhen',    pos: 'ST',  age: 25, club_id: 13, nat: '🇳🇬', mv: 9000,  pv: 10000, num: 9 },
  { id: 33, name: 'K瓦拉茨赫利亚', en: 'K. Kvaratskhelia', pos: 'LW', age: 23, club_id: 13, nat: '🇬🇪', mv: 8000, pv: 8000, num: 77 },
  // 德甲
  { id: 34, name: '凯恩',       en: 'H. Kane',       pos: 'ST',  age: 31, club_id: 14, nat: '🏴', mv: 10000, pv: 11000, num: 9 },
  { id: 35, name: '穆西亚拉',   en: 'J. Musiala',    pos: 'AM',  age: 21, club_id: 14, nat: '🇩🇪', mv: 13000, pv: 11000, num: 42 },
  { id: 36, name: '维尔茨',     en: 'F. Wirtz',      pos: 'AM',  age: 21, club_id: 15, nat: '🇩🇪', mv: 13000, pv: 11000, num: 10 },
  { id: 37, name: '格里马尔多', en: 'A. Grimaldo',   pos: 'LB',  age: 28, club_id: 15, nat: '🇪🇸', mv: 4500,  pv: 4000,  num: 20 },
  { id: 38, name: '阿德耶米',   en: 'K. Adeyemi',    pos: 'LW',  age: 22, club_id: 16, nat: '🇩🇪', mv: 4000,  pv: 3500,  num: 27 },
  // 法甲
  { id: 39, name: '登贝莱',     en: 'O. Dembélé',    pos: 'RW',  age: 27, club_id: 17, nat: '🇫🇷', mv: 6000,  pv: 5000,  num: 10 },
  { id: 40, name: '巴尔科拉',   en: 'B. Barcola',    pos: 'LW',  age: 22, club_id: 17, nat: '🇫🇷', mv: 4500,  pv: 3500,  num: 14 },
  { id: 41, name: '阿森西奥',   en: 'M. Asensio',    pos: 'AM',  age: 28, club_id: 17, nat: '🇪🇸', mv: 2500,  pv: 2500,  num: 11 },
  { id: 42, name: '本耶德尔',   en: 'W. Ben Yedder', pos: 'ST',  age: 34, club_id: 18, nat: '🇫🇷', mv: 800,   pv: 1000,  num: 9 },
];

// ---------- 转会历史 ----------
// fee 单位：万欧元；type: in/out/loan/free
const TRANSFERS = [
  { id: 1,  player_id: 17, from_club_id: 8,  to_club_id: 7,  fee: 0,     date: '2024-06-04', type: 'free' },
  { id: 2,  player_id: 19, from_club_id: 11, to_club_id: 7,  fee: 10300, date: '2023-06-14', type: 'in' },
  { id: 3,  player_id: 18, from_club_id: 7,  to_club_id: 7,  fee: 0,     date: '2018-07-12', type: 'in' },
  { id: 4,  player_id: 1,  from_club_id: 14, to_club_id: 1,  fee: 6000,  date: '2022-07-01', type: 'in' },
  { id: 5,  player_id: 13, from_club_id: 1,  to_club_id: 5,  fee: 4700,  date: '2023-06-12', type: 'in' },
  { id: 6,  player_id: 7,  from_club_id: 13, to_club_id: 2,  fee: 11600, date: '2023-07-15', type: 'in' },
  { id: 7,  player_id: 32, from_club_id: 13, to_club_id: 17, fee: 0,     date: '2024-08-30', type: 'loan' },
  { id: 8,  player_id: 26, from_club_id: 7,  to_club_id: 9,  fee: 7500,  date: '2024-08-07', type: 'in' },
  { id: 9,  player_id: 34, from_club_id: 4,  to_club_id: 14, fee: 9500,  date: '2023-08-12', type: 'in' },
  { id: 10, player_id: 36, from_club_id: 16, to_club_id: 15, fee: 0,     date: '2020-07-01', type: 'free' },
  { id: 11, player_id: 39, from_club_id: 8,  to_club_id: 17, fee: 5000,  date: '2023-08-12', type: 'in' },
  { id: 12, player_id: 21, from_club_id: 8,  to_club_id: 8,  fee: 0,     date: '2023-04-29', type: 'in' },
  { id: 13, player_id: 41, from_club_id: 7,  to_club_id: 17, fee: 0,     date: '2023-08-04', type: 'free' },
  { id: 14, player_id: 31, from_club_id: 13, to_club_id: 12, fee: 8160,  date: '2022-07-01', type: 'in' },
];

// ---------- 比赛 ----------
const MATCHES = [
  // 英超
  { id: 1, league_id: 'epl', home_club_id: 1, away_club_id: 2, home_score: 1, away_score: 1, date: '2024-09-22' },
  { id: 2, league_id: 'epl', home_club_id: 3, away_club_id: 1, home_score: 0, away_score: 2, date: '2024-12-01' },
  { id: 3, league_id: 'epl', home_club_id: 4, away_club_id: 3, home_score: 2, away_score: 1, date: '2024-09-01' },
  { id: 4, league_id: 'epl', home_club_id: 5, away_club_id: 6, home_score: 1, away_score: 1, date: '2024-08-25' },
  { id: 5, league_id: 'epl', home_club_id: 2, away_club_id: 4, home_score: 2, away_score: 0, date: '2024-09-29' },
  // 西甲
  { id: 6, league_id: 'liga', home_club_id: 7, away_club_id: 8, home_score: 3, away_score: 1, date: '2024-10-26' },
  { id: 7, league_id: 'liga', home_club_id: 9, away_club_id: 7, home_score: 1, away_score: 1, date: '2024-09-29' },
  { id: 8, league_id: 'liga', home_club_id: 8, away_club_id: 9, home_score: 1, away_score: 0, date: '2024-12-15' },
  // 意甲
  { id: 9, league_id: 'seriea', home_club_id: 10, away_club_id: 11, home_score: 1, away_score: 1, date: '2024-09-22' },
  { id: 10, league_id: 'seriea', home_club_id: 12, away_club_id: 10, home_score: 0, away_score: 1, date: '2024-10-27' },
  { id: 11, league_id: 'seriea', home_club_id: 13, away_club_id: 12, home_score: 2, away_score: 1, date: '2024-12-08' },
  // 德甲
  { id: 12, league_id: 'bundes', home_club_id: 14, away_club_id: 16, home_score: 4, away_score: 0, date: '2024-03-30' },
  { id: 13, league_id: 'bundes', home_club_id: 15, away_club_id: 14, home_score: 1, away_score: 1, date: '2024-09-28' },
  // 法甲
  { id: 14, league_id: 'ligue1', home_club_id: 17, away_club_id: 18, home_score: 3, away_score: 1, date: '2024-09-22' },
  { id: 15, league_id: 'ligue1', home_club_id: 19, away_club_id: 17, home_score: 2, away_score: 1, date: '2024-10-27' },
];

// ---------- 新闻 ----------
const NEWS = [
  { id: 1, title: '官方：姆巴佩自由身加盟皇家马德里', summary: '法国巨星结束7年巴黎生涯，与皇马签约5年，身披9号战袍。', date: '2024-06-04', player_id: 17, club_id: 7,  source: '官方公告', fee: 0, tag: '重磅转会' },
  { id: 2, title: '哈兰德身价飙升至2亿欧，与姆巴佩并列世界第一', summary: '德转最新一期身价更新，挪威前锋上涨2000万欧元。', date: '2024-10-15', player_id: 1,  club_id: 1,  source: '德转更新', fee: null, tag: '身价更新' },
  { id: 3, title: '阿尔瓦雷斯7800万欧转投马竞', summary: '阿根廷前锋离开曼城寻求主力位置，与西蒙内签约6年。', date: '2024-08-07', player_id: 26, club_id: 9,  source: '罗马诺', fee: 7500, tag: '重磅转会' },
  { id: 4, title: '奥斯梅恩租借加盟巴黎圣日耳曼', summary: '尼日利亚射手租借方式加盟法甲豪门，含买断条款。', date: '2024-08-30', player_id: 32, club_id: 17, source: '罗马诺', fee: null, tag: '租借' },
  { id: 5, title: '亚马尔身价破亿！17岁巴萨天才成最年轻亿欧先生', summary: '欧洲杯夺冠后，亚马尔身价再涨3000万至1.2亿欧。', date: '2024-09-15', player_id: 21, club_id: 8,  source: '德转更新', fee: null, tag: '身价更新' },
  { id: 6, title: '官方：凯恩9500万欧加盟拜仁', summary: '英格兰队长离开热刺，与德甲霸主签约4年。', date: '2023-08-12', player_id: 34, club_id: 14, source: '官方公告', fee: 9500, tag: '重磅转会' },
  { id: 7, title: '维尼修斯身价追平哈兰德，金球奖呼声高涨', summary: '巴西边锋凭借近期出色表现，身价上涨3000万欧元。', date: '2024-10-15', player_id: 18, club_id: 7,  source: '德转更新', fee: null, tag: '身价更新' },
  { id: 8, title: '贝林厄姆皇马首赛季即夺欧冠，身价破亿', summary: '英格兰中场在伯纳乌大放异彩，市场价值已达1.8亿欧元。', date: '2024-06-02', player_id: 19, club_id: 7,  source: 'BBC Sport', fee: null, tag: '身价更新' },
  { id: 9, title: '帕尔默身价暴涨3500万，切尔西投资初见回报', summary: '英格兰攻击中场半个赛季7球5助攻，市场价值翻倍。', date: '2024-10-15', player_id: 13, club_id: 5,  source: '德转更新', fee: null, tag: '身价更新' },
  { id: 10, title: '官方：登贝莱5000万欧加盟巴黎', summary: '法国边锋离开巴萨回归法甲，与巴黎签约5年。', date: '2023-08-12', player_id: 39, club_id: 17, source: '官方公告', fee: 5000, tag: '重磅转会' },
  { id: 11, title: '穆西亚拉身价破亿，拜仁锁定未来核心', summary: '德国天才中场凭借欧洲杯表现，市场价值上涨2000万欧元。', date: '2024-07-20', player_id: 35, club_id: 14, source: '踢球者', fee: null, tag: '身价更新' },
  { id: 12, title: '维尔茨勒沃库森赛季不败夺冠，身价飞升至1.3亿', summary: '德国金童凭双冠王加冕，市场价值再涨2000万。', date: '2024-05-18', player_id: 36, club_id: 15, source: '踢球者', fee: null, tag: '身价更新' },
];

// ---------- 身价历史 ----------
// 单位：万欧元，每条记录代表某球员在某时点的身价
const VALUE_HISTORY = [
  // 哈兰德
  { player_id: 1, date: '2022-01', value: 16000 },
  { player_id: 1, date: '2022-07', value: 17000 },
  { player_id: 1, date: '2023-01', value: 17000 },
  { player_id: 1, date: '2023-12', value: 18000 },
  { player_id: 1, date: '2024-06', value: 18000 },
  { player_id: 1, date: '2024-10', value: 20000 },
  // 姆巴佩
  { player_id: 17, date: '2022-01', value: 16000 },
  { player_id: 17, date: '2022-12', value: 18000 },
  { player_id: 17, date: '2023-12', value: 18000 },
  { player_id: 17, date: '2024-06', value: 18000 },
  { player_id: 17, date: '2024-10', value: 18000 },
  // 维尼修斯
  { player_id: 18, date: '2022-01', value: 8000 },
  { player_id: 18, date: '2022-12', value: 12000 },
  { player_id: 18, date: '2023-12', value: 15000 },
  { player_id: 18, date: '2024-06', value: 15000 },
  { player_id: 18, date: '2024-10', value: 18000 },
  // 贝林厄姆
  { player_id: 19, date: '2022-01', value: 3500 },
  { player_id: 19, date: '2022-12', value: 7000 },
  { player_id: 19, date: '2023-12', value: 12000 },
  { player_id: 19, date: '2024-06', value: 18000 },
  { player_id: 19, date: '2024-10', value: 18000 },
  // 亚马尔
  { player_id: 21, date: '2024-01', value: 5000 },
  { player_id: 21, date: '2024-06', value: 9000 },
  { player_id: 21, date: '2024-10', value: 12000 },
  // 帕尔默
  { player_id: 13, date: '2023-09', value: 2500 },
  { player_id: 13, date: '2024-01', value: 3500 },
  { player_id: 13, date: '2024-06', value: 5500 },
  { player_id: 13, date: '2024-10', value: 9000 },
  // 萨卡
  { player_id: 5, date: '2023-01', value: 9000 },
  { player_id: 5, date: '2024-01', value: 12000 },
  { player_id: 5, date: '2024-10', value: 14000 },
  // 穆西亚拉
  { player_id: 35, date: '2022-12', value: 7000 },
  { player_id: 35, date: '2023-12', value: 9000 },
  { player_id: 35, date: '2024-06', value: 11000 },
  { player_id: 35, date: '2024-10', value: 13000 },
];

// 导出
window.TM_DATA = {
  LEAGUES,
  CLUBS,
  PLAYERS,
  TRANSFERS,
  MATCHES,
  NEWS,
  VALUE_HISTORY,
};
