const gameContainer = document.getElementById("game");
const card = document.querySelector(".card");
let eventArray = [];
let matchArray = [];
let clickCount = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function removeListener (parent, func) {
    for (let child of parent) {
        child.removeEventListener("click", func);
    }
}

function addListener (parent, func) {
    for (let child of parent) {
        child.addEventListener("click", func);
    }
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
    eventArray.push(event.target);
    event.target.style.backgroundColor = event.target.classList;
    event.target.removeEventListener("click", handleCardClick);
    if (eventArray.length === 2) {
        const gameDivs = document.querySelectorAll("#game div");
        removeListener(gameDivs, handleCardClick);
        setTimeout(function() {
            if (eventArray[0].className === eventArray[1].className) {
                console.log("MATCH");
                matchArray.push(eventArray[0]);
                matchArray.push(eventArray[1]);
                eventArray = [];
                addListener(gameDivs, handleCardClick);
                for (let match of matchArray) {
                    console.log(match);
                    match.removeEventListener("click", handleCardClick);
                }
            } else {
                console.log("no match");
                eventArray[0].style.backgroundColor = "transparent";
                eventArray[1].style.backgroundColor = "transparent";
                addListener(gameDivs, handleCardClick);
                for (let match of matchArray) {
                    console.log(match);
                    match.removeEventListener("click", handleCardClick);
                }
                eventArray = [];
            }
        }, 1000)
    }
}

// when the DOM loads
createDivsForColors(shuffledColors);

// abstract logic to function...remove listener from match array
// keep functions shorter than 30 lines
// do not repeat logic
// make functions for match and no match
// name functions for what they do
// only use let if value is expected to change
// do not use comments when writing code for production