const {app, BrowserWindow, Menu} = require('electron')

process.env.NODE_ENV = 'development'

const isDev = (process.env.NODE_ENV !== 'production')? true:false;
const isMac = process.platform === 'darwin'? true:false;

let mainWindow;
let aboutWindow;


function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: "SysTop | Monitor your CPU",
        width: 500,
        height: 600,
        icon: './assets/icons/win/icon.ico',
    })

    if(isDev === true){
        mainWindow.setPosition(3107,496, false)
        mainWindow.maximize();
        mainWindow.openDevTools();        
    }else{
        mainWindow.setMaximumSize(mainWindow.getBounds().width + 10, mainWindow.getBounds().height + 30)
    }

    mainWindow.loadFile("./app/index.html")
    mainWindow.setAlwaysOnTop(true)
    mainWindow.on('ready-to-show', () =>{
        mainWindow.setAlwaysOnTop(false)
        mainWindow.show()
    })
}

function createAboutWindow(){
    aboutWindow = new BrowserWindow({
        title: 'About ' + app.name,
        width: 300,
        height: 300,
        icon: './assets/icons/win/icon.ico',
    })

    aboutWindow.loadFile("./app/about.html");
}

const menu = [
    ...(isMac?[{
            label: app.name,
            submenu: [
                {
                    label: 'About',
                    click: createAboutWindow
                }
            ] 
        }] : []),
    {
        role: 'fileMenu'
    },
    ...(isDev? [{
        label: 'Developer',
        submenu:[
            {role: 'reload'},
            {role: 'forcereload'},
            {role: 'separator'},
            {role: 'toggleDevTools'},
        ]
    }]:[]),
    ...(!isMac? [{
        label: 'Help',
        submenu: [{
            label: 'About',
            click: createAboutWindow,
        }]
    }]:[]),
]
app.on('ready', () => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)
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