const path = require('path')
const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const Store = require('./app/js/Store');
const MainWindow = require('./MainWindow');
const AboutWindow = require('./AboutWindow');
const AppTray = require('./AppTray');
const {getMainMenu} = require('./menus');

process.env.NODE_ENV = 'production'

const isDev = (process.env.NODE_ENV !== 'production')? true:false;
const isMac = process.platform === 'darwin'? true:false;

let mainWindow;
let aboutWindow;
let tray

//init store & defaults
const store = new Store({
    configName: 'user-settings',
    defaults: {
        settings: {
            cpuWarning: 75,
            cpuOverload: 85,
            alertFrequency: 5,
            enableAlerts: true,
        },
    }
})

function createMainWindow(){
    mainWindow = new MainWindow(isDev, isMac, "./app/index.html", app)
}

function createAboutWindow(){
    aboutWindow = new AboutWindow("./app/about.html", app);
}


app.on('ready', () => {
    createMainWindow()
    
    const menu = getMainMenu(isDev, isMac, mainWindow, createAboutWindow)
    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    app.isQuitting = false

    const icon = path.join(__dirname, 'assets', 'icons', 'tray_icon.png')

    //Create tray
    tray = new AppTray(icon, app, mainWindow)

})

ipcMain.on('settings:set', (e,settings) => {
    store.Set('settings', settings)
    // mainWindow.webContents.send('settings:get', store.get('settings'))
})


app.on('win-all-closed', () => {
    if (isMac === false){
        app.quit();
    }
    console.log("moved")
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        creatMainWindow();
    }
})