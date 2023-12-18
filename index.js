const { BrowserWindow, app } = require("electron");
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");


//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.on('ready', () => {

  //创建一个窗口
  const mainWindow = new BrowserWindow()

  //窗口加载html文件
  mainWindow.loadFile('./frontend/index.html')
});


const main = async () => {
  await pie.initialize(app);
  const browser = await pie.connect(app, puppeteer);

  const window = new BrowserWindow({
    closable: false,
    alwaysOnTop: false,
    devtools: false, //开发者工具
    headless: true, // 无头模式
    // resizable: false,
    x: 100,
    y: 100,
    width: 412,
    height: 914,
  });
  const url = "https://app.17jyw.com/#/pages/login/index";
  await window.loadURL(url);

  const page = await pie.getPage(browser, window);
  let account = "body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.login-login > uni-view.login-form > uni-view:nth-child(1) > uni-input > div > input";
  await page.waitForSelector(account, {timeout: 0});
  await page.type(account, '123123', { delay: 10 });
  await page.type("input[type='password']", '123123', { delay: 10 });
  // checkbox
  // await page.waitForSelector('uni-view.checkbox_div', {timeout: 0});
  await page.evaluate(() => {
    let checkBox = document.querySelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.login-login > uni-view.login-read > uni-text.iconfont.icon-dui");
    checkBox.click();
  });

  await page.evaluate(() => {
    let loginBtn = document.querySelector("body > uni-app > uni-page > uni-page-wrapper > uni-page-body > uni-view > uni-view.login-login > uni-view.login-btn");
    loginBtn.click();
  });

};


main();