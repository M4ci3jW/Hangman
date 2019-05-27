const electron = require('electron');
const {ipcRenderer} = electron;



const back = document.getElementById('back-button');
back.addEventListener('click', () => {
    ipcRenderer.send('btn:back');
});