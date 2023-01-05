
function getMainMenu(isDev, isMac, mainWindow, createAboutWindow){
    return menu = [
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
        {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Navigation',
                    click: () =>{
                        mainWindow.webContents.send('nav:toggle')
                    }
                }
            ]
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
}

module.exports = {getMainMenu: getMainMenu}