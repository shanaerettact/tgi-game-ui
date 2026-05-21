export class ReqDemoLogin {
  username = "";
  password = "";
}

export class ReqDemoGetBalance {
  playerSessionKey = "";
  currencyId = "";
}

export class ReqDemoGameList { }

export class RespDemoGameList {
  datas = new Array<ProductGameListL1>();
  navs = new Array<DemoNavInfo>();
  gameItems = new Array<Array<DemoProductInfo>>();
}

export class ProductGameListL1 {
  productId = ""; // 產品Id
  productName = ""; // 產品名稱
  games = new Array<ProductGameListL2>();
}

export class ProductGameListL2 {
  gameId = ""; // 遊戲識別碼
  gameName = ""; // 遊戲名稱
}

export class DemoNavInfo {
  productType = 0; // 產品類型(1=電子, 2=體育, 3=彩票, 4=真人)
}

export class DemoProductInfo {
  productId = ""; // 產品Id
}