const electron = require('electron');
const {ipcRenderer} = electron;
const fs = require('fs');

var selectedWord = document.getElementById("selected-word");
var livesLeft = document.getElementById("lives-left");
var data = fs.readFileSync('src/wordss.json', 'utf8');
var wordsArray = JSON.parse(data);
var letter_buttons = [];
var word;
var lives = 7;

var letter = null;


render();

// some helping functions
function contains(arr, el){
    for(var i = 0; i < arr.length; i++) {
        if(arr[i]==el) {return true}
    }
    return false;
};
function getWord(){
    word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
};
function myButtonClicked(el)
{
    el.disabled = true;
    if(lives <= 0){
        el.disabled = true;
    } 
};

var timer = document.getElementById('timer');
var min = "00";
var sec = "00";
var start = false;
function countUp(){
    //var start= false;
    if(!start){
        //start = true;
        if(sec == 59){
            if(min == 59){
                min = 0;
            } else {
                min++;
            }
            if(min < 10) min = "0" + min;
            sec = "00";
        }
        else {
            sec++ ;
            if(sec <10) sec = "0" + sec;
        }
        setTimeout(countUp, 1000);
        timer.innerHTML = min + ":" + sec;  
    }   
};
countUp();
var liveBool = true;
function check(val, el){
    this.letter = val;
    
    if(!contains(word, letter)){
        if(liveBool){
            lives -= 1;
        }
        updateLives();
        letter_buttons.push(letter);     
    }
    else{
        if(liveBool){
            letter_buttons.push(letter);
            displayWord();
        }
    }
    finish();
};

function displayWord(){
    selectedWord.innerHTML = "";
    for(var i = 0; i< word.length; i++){
        if(contains(letter_buttons, word[i])){
            selectedWord.innerHTML += word[i];
        }
        else{
            selectedWord.innerHTML += "_";
        }

    }
};

function finish(){
    if(!contains(selectedWord.innerHTML, "_")){
        if(liveBool){
            box.innerHTML = '<img src="res/winscreen.png">';
            //liveBool = false;
        }
        start = true;
        
        addRecord(word, lives, timer.textContent);
        
    }
    if(lives <= 0){
        box.replaceChild(srcLoss, src6);
        //ipcRenderer.send('btn:lost');
        start = true; 
        liveBool = false;
        selectedWord.innerHTML = "" 
        for(var i = 0; i < word.length; i++){
            selectedWord.innerHTML += word[i];
        }
    }
};

function updateLives(){
    livesLeft.innerHTML = "Lives left: " + lives;
};

var box = document.getElementById("screens");
var srcWin = document.createElement("img");
srcWin.src = "res/winscreen.png";
var srcLoss = document.createElement("img");
srcLoss.src = "res/lostscreen.png";
var src1 = document.createElement("img");
src1.src = "res/n.png";
var src2 = document.createElement("img");
src2.src = "res/screen2.png";
var src3 = document.createElement("img");
src3.src = "res/screen3.png";
var src4 = document.createElement("img");
src4.src = "res/screen4.png";
var src5 = document.createElement("img");
src5.src = "res/screen5.png";
var src6 = document.createElement("img");
src6.src = "res/screen6.png";
function loadImage(){
    switch(lives){
        case 6:
        if(contains(selectedWord.innerHTML, "_")){
            box.appendChild(src1);
        }
        //box.appendChild(src1);
        break;
        case 5:
        box.replaceChild(src2, src1);
        break;
        case 4:
        box.replaceChild(src3, src2);
        break;
        case 3:
        box.replaceChild(src4, src3);
        break;
        case 2:
        box.replaceChild(src5, src4);
        break;
        case 1:
        box.replaceChild(src6, src5);
        break;
    }
}

function addRecord(fword, flives, ftime){
    let scoreFile = fs.readFileSync('src/dataScore.json','utf8');
    let arrayScore = JSON.parse(scoreFile);
    arrayScore.push({"word": fword, "lives": flives, "time": ftime});
    fs.writeFileSync('src/dataScore.json', JSON.stringify(arrayScore), 'utf8');
};

function render(){
    getWord();
    displayWord();
    updateLives();
    //addRecord();
};
const back = document.getElementById('back-button');
back.addEventListener('click', () => {
    ipcRenderer.send('btn:back');
});
const restart = document.getElementById('restart-button');
restart.addEventListener('click', () => {
    ipcRenderer.send('btn:start');
});

