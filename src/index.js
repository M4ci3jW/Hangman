const electron = require('electron');
const {ipcRenderer} = electron;



const startBTN = document.getElementById('start');
const infoBTN = document.getElementById('info');
const scoreBTN = document.getElementById('score');
const exitBTN = document.getElementById('exit');

startBTN.addEventListener('click', function () {
    ipcRenderer.send('btn:start');
});
infoBTN.addEventListener('click', function () {
    ipcRenderer.send('btn:info');
});
scoreBTN.addEventListener('click', function () {
    ipcRenderer.send('btn:score');
});
exitBTN.addEventListener('click', function () {
    ipcRenderer.send('btn:exit');
});
