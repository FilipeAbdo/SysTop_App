const {BrowserWindow} = require('electron')

class AboutWindow extends BrowserWindow{
    constructor (file, app){
        super({
            title: 'About ' + app.name,
            width: 300,
            height: 350,
            resizable: false,
            icon: './assets/icons/win/icon.ico',
        })
        this.app = app
        this.file = file
        this.loadFile(file)
    }
}

module.exports = AboutWindow