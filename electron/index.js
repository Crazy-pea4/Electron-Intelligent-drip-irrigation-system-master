// electron 主进程入口文件
const path = require("path");
const { app, BrowserWindow } = require("electron");

// 是否是开发环境
const isDev = process.env.IS_DEV == "true" ? true : false;

function createWindow() {
  // 创建主窗口
  const mainWindow = new BrowserWindow({
    // 窗口宽度
    width: 1000,
    // 窗口高度
    height: 800,
    // 窗口预设配置
    webPreferences: {
      // 指定预加载脚本
      // preload: path.join(__dirname, 'preload.js'),
      // 允许在窗口中使用 Node.js 的 API
      nodeIntegration: true,
    },
  });
  // 主窗口加载URL
  mainWindow.loadURL(
    isDev
      ? "http://127.0.0.1:5173"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );
  // 如果是开发环境，打开调试工具
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// Electron应用程序入口，应用程序准备好后执行回调函数
app.whenReady().then(() => {
  createWindow();
  // 监听激活事件
  app.on("activate", function () {
    // 如果当前没有打开的窗口，则创建一个新的窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 监听窗口关闭事件，当所有的窗口都关闭了执行回调函数
app.on("window-all-closed", () => {
  // 当当前系统不是macOS，退出应用程序
  if (process.platform !== "darwin") {
    app.quit();
  }
});
