const {BrowserWindow, app} = require("electron");
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
    alwaysOnTop: true,
    // resizable: false,
    x: 100,
    y:100,
    width: 412,
    height: 914,
 });
  const url = "https://box.douxiangapp.com/nft/#/";
  await window.loadURL(url);
 
  const page = await pie.getPage(browser, window);
  // console.log(page.url());
  // window.destroy();
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
            // document.querySelector("input[inputmode='email']")
  await page.type("input[type='number']", '123123', { delay: 10 });
  await page.type("input[type='password']", '123123', { delay: 10 });
  // checkbox
  await page.waitForSelector('uni-view.checkbox_div', {timeout: 0});
  await page.evaluate(() => {
      let checkBox = document.querySelector("uni-view.checkbox_div");
      checkBox.click();
  });
  // const loginBtn = await (await page.evaluateHandle(`document.querySelector("#root > div form > div > mer-button > button")`)).asElement();
  // await loginBtn.click();
};


main();