const { app, BrowserWindow } = require('electron/main')

//ウィンドウの作成
const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    //webPreferencesでメインプロセスとレンダラープロセスの通信をできるようにセキュリティを下げてる

    //はじめにロードするファイルをindex.htmlに設定
    win.loadFile('index.html')
    //ウィンドウを閉じられた時の挙動
    win.on('closed', ()=>{
        app.quit();
    })
}

//electronの準備ができた時の挙動。基本、createWindowを呼び出す
app.whenReady().then(()=>{
    createWindow()
     //electronがアクティブになった時
     app.on('activate', ()=> {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
     })
})

//ウィンドウが全部閉じられた時の挙動
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})