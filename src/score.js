const electron = require('electron');
const {ipcRenderer} = electron;
let fs = require('fs');

let scoreFile = fs.readFileSync('src/dataScore.json', 'utf8');
let array = JSON.parse(scoreFile);
const back = document.getElementById('back-button');

update();
function update(){
    let records = document.getElementById('scoreTable');
    records.innerHTML = "";
    array.forEach(element => {
        let row = records.insertRow(-1);
        row.insertCell(0).innerHTML = element.word;
        row.insertCell(1).innerHTML = element.lives;
        row.insertCell(2).innerHTML = element.time;
    });
}

function clear(){
    array = [];
    fs.writeFileSync('src/dataScore.json', JSON.stringify(array), 'utf8');
    update();
}

back.addEventListener('click', () => {
    ipcRenderer.send('btn:back');
});