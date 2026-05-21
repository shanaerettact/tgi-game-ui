export class ReqGameLaunch {
  token = ""; // 令牌
  playerId = ""; // 玩家識別碼
  playerSessionKey = ""; // 玩家令牌
  currencyId = ""; // 貨幣識別碼
  language = "en"; // 語系代碼
  gameId = ""; // 遊戲識別碼
  platform = 0; // 平台(0=Desktop,1=Mobile)
}

export class ReqGameDemo {
  language = "en"; // 語系代碼
  gameId = ""; // 遊戲識別碼
  platform = 0; // 平台(0=Desktop,1=Mobile)
}