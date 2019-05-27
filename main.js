const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;

app.on('ready', function(){
    //tworzenie okna
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 800
    });
    //ladowanie html do okna
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function(){
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});


function createGameWindow(){
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/game.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function(){
        app.quit();
    });
}
function endgameInfo(){
    let win = new BrowserWindow({
        width: 200,
        height: 250
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/endGame.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.setAlwaysOnTop(true, "floating",1);
}
// tworzenie okna info
function createInfoWindow(){
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/gameInfo.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function(){
        app.quit();
    });
}

//start button
ipcMain.on('btn:start', function(){
    createGameWindow();
    
});
//info button
ipcMain.on('btn:info', function(){
    createInfoWindow();
});
//score button
ipcMain.on('btn:score', function(){
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/score.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function(){
        app.quit();
    });
});
//exit button
ipcMain.on('btn:exit', function(){
    app.quit();
});
ipcMain.on('btn:lost', function(){
    endgameInfo();
});
ipcMain.on('btn:back', function(){
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }));
})
    




//menu
const mainMenuTemplate = [
    {
        label: 'Options',
        submenu:[
            {
                label: 'Quit',
                accelerator: 'Ctrl+Q',
                click(){
                    app.quit();
                }
            },
            {
                label: 'Info',
                click(){
                    createInfoWindow();
                }
            }
        ]
    }
]



if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}