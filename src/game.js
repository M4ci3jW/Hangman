const electron = require('electron');
const {ipcRenderer} = electron;

var selectedWord = document.getElementById("selected-word");
var livesLeft = document.getElementById("lives-left");
var letterValue = document.getElementById("literka");
var literyWslowie = document.getElementById('litery-slowa');
var letter_buttons = [];
var words = ["apologise", "fireman", "oxygen", "gamer"];
var word;

var lives = 11;
var letter = null;

render();

function contains(arr, el){
    for(var i = 0; i < arr.length; i++) {
        if(arr[i]==el) {return true}
    }
    return false;
};

function getWord(){
    word = words[Math.floor(Math.random() * words.length)];
};
/*
function createWordPlaceholder() {
    for (var i = 0; i < word.length; i++) {
      selectedWord.innerHTML = selectedWord.innerHTML + "_";
    }
};
*/

function check(val){
    this.letter = val;
    letterValue.innerHTML = "literka: " + letter;
    if(!contains(word, letter)){
        lives -= 1;
        update();
    }
    else{
        letter_buttons.push(letter);
        update2();
        displayWord();
    }
    finish();
};
var resultValue = document.getElementById('result');

function displayWord(){
    selectedWord.innerHTML = "";
    for(var i = 0; i< word.length; i++){
        if(contains(letter_buttons, word[i])){
            selectedWord.innerHTML += word[i];
        }
        else{
            selectedWord.innerHTML += "_";
        }
        //selectedWord.innerHTML += (i == word.length) ? "" : " " ;
    }

}


function finish(){
    if(!contains(selectedWord.innerHTML, "_")){
        resultValue.innerHTML = "YOU WON!";
    }
    if(lives <= 0){
        resultValue.innerHTML = "YOU LOST!";
    }
}

function update2(){
    literyWslowie.innerHTML = "litery w slowie: " + letter_buttons;
};
function update(){
    livesLeft.innerHTML = "Lives left: " + lives;
}
function render(){
    getWord();
    displayWord();
    //createWordPlaceholder();
    update();
}







/*
function createButtons() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    for (var i = 0; i < alphabet.length; i++) {
      alphabetBtns.innerHTML =
        alphabetBtns.innerHTML + "<li>" + alphabet[i] + "</li>";
        letter_buttons.push(alphabetBtns[i])
    }
  };

 /* 
  <ul id="alphabet-buttons"></ul>
  #alphabet-buttons li{
    display: inline-block;
    margin: 10px;
    width: 10px;
    height: 10px;
    border: 1px solid black;
    padding: 10px 15px;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
}
*/


