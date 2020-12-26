const startGame = document.querySelector("button");
const gameContainer = document.getElementById("game");
const clickDiv = document.querySelector("#counters h2 span");
const highScoreDiv = document.querySelector("#counters h2:last-child span")
const savedScore = localStorage.getItem('high score');
let eventArray = [];
let matchArray = [];
let clickCount = 0;

const COLORS = [
  "red",
  "blue",
  "yellow",
  "green",
  "purple",
  "red",
  "blue",
  "yellow",
  "green",
  "purple"
];

if (savedScore) {
    highScoreDiv.innerText = savedScore;
}

startGame.addEventListener("click", function() {
    window.location.reload();
})

function removeListener (parent, func) {
    for (const child of parent) {
        child.removeEventListener("click", func);
    }
}

function addListener (parent, func) {
    for (const child of parent) {
        child.addEventListener("click", func);
    }

    removeListener(matchArray, handleCardClick);
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {

    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
    const gameDivs = document.querySelectorAll("#game div");
    clickCount ++;
    clickDiv.innerText = clickCount;

    eventArray.push(event.target);
    event.target.style.backgroundColor = event.target.classList;
    event.target.removeEventListener("click", handleCardClick);
    if (eventArray.length === 2 && eventArray[0].className === eventArray[1].className) {
        Match(gameDivs);
        } 
    else if (eventArray.length === 2 && eventArray[0].className !== eventArray[1].className) {
        noMatch(gameDivs);
    }
}

createDivsForColors(shuffledColors);

function Match(object) {
    removeListener(object, handleCardClick);
    for (const event of eventArray) {
        matchArray.push(event);
    }
    eventArray = [];
    checkWin(matchArray);
    addListener(object, handleCardClick);
}

function noMatch(object) {
    removeListener(object, handleCardClick);
    setTimeout(function() {
        for (const event of eventArray) {
            event.style.backgroundColor = 'transparent';
        }
        eventArray = [];

        addListener(object, handleCardClick);
    },1000);
}

function checkWin(arr) {
    if (arr.length === 10) {
        highScoreCheck();
        alert("GAME OVER");
    }
}

function highScoreCheck() {
    if (highScoreDiv.innerText === "0" || parseInt(clickDiv.innerText) < parseInt(highScoreDiv.innerText)){
        highScoreDiv.innerText = clickDiv.innerText;
        localStorage.setItem('high score', highScoreDiv.innerText);
    }
}
