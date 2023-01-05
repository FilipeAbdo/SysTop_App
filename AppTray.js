const {Tray, Menu} = require('electron')

class AppTray extends Tray{
    constructor(icon, app, mainWindow){
        super(icon)

        this.setToolTip("SysTop")

        this.icon = icon
        this.app = app
        this.mainWindow = mainWindow

        this.on('double-click', this.onClick)
        this.on('right-click', this.onRightClick)
    }

    onClick = () => {
        if(this.mainWindow.isVisible() === true){
            this.mainWindow.hide()
        }else{
            this.mainWindow.show()
        }
    }

    onRightClick = () => {
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () =>{
                    this.app.isQuitting = true
                    this.app.quit()
                }
            }
        ])
        this.popUpContextMenu(contextMenu)
    }

}

module.exports = AppTray