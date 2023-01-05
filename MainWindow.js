const { BrowserWindow } = require('electron')
const Store = require('./app/js/Store')

class MainWindow extends BrowserWindow{
    constructor (isDev, isMac, file, app) {
        super({
            title: "SysTop | Monitor your CPU",
            width: 400,
            height: 550,
            minWidth: 400,
            minHeight: 550,
            resizable: (isDev? true:false),
            icon: './assets/icons/win/icon.ico',
            show: false,
            opacity: 0.9,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        })
        this.isDev = isDev
        this.isMac = isMac
        this.file = file
        this.app = app

        if(isDev === true){
            this.setPosition(3107,496, false)
            this.maximize();
            this.openDevTools();        
        }else{
            this.setMaximumSize(this.getBounds().width + 10, this.getBounds().height + 30)
        }
        
        this.loadFile(file)
        // this.setAlwaysOnTop(true)
        this.on('ready-to-show', () =>{
            // this.setAlwaysOnTop(false)
            // this.show()
        })

        this.on('close', (event) =>{
            if(this.app.isQuitting === false){
                event.preventDefault()
                this.hide()
            }else{
                return true
            }
        })

    }
}


module.exports = MainWindow