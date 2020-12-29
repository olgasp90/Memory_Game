const gameContainer = document.getElementById("game");
// assign the clicked cards to null 
//to make them intentionally empty 
let option1 = null;
let option2 = null;
//assign a variable to keep track of the cards flipped
let cardsFlipped = 0;
//assign a varaible to keep track if the user clicked or not
let noClick = false;

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
    //add a new class for style
    newDiv.classList.add('design')
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  //if the user didn't click any cards or if he click twice on the same card,
  // the return value doesn't matter and we only want to exit the whole function
  if (noClick) return;
  if (event.target.classList.contains('flipped')) return;
  // capture the event clicked in a variable for easy use
  //and change it's bg color  
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];
  //check if option1 and option2 are no longer empty 
  if(!option1 || !option2){
    // add the class flipped to the card that was clicked on 
    currentCard.classList.add('flipped');
    // assign the first clicked card - current card
    option1 = option1 || currentCard;
    //check if the cards match, if they do, reassign them to null; 
    //if they don't match, assign the event target to the second card
    option2 = currentCard === option1 ? null : currentCard;
  }

  if (option1 && option2){
    noClick = true;
    //capture the cards clicked in a variable
    let gif1 = option1.className;
    let gif2 = option2.className;
    //check if the cards match
    if (gif1 === gif2){
      //if they match, increase the cardFlipped to 2 
      //and remove the event Listener and reset the cards to null
      cardsFlipped += 2;
      option1.removeEventListener('click', handleCardClick)
      option2.removeEventListener('click', handleCardClick)
      option1 = null;
      option2 = null;
      noClick = false;
    } else {
      //if the cards don't match, setTimeout and hide them
      setTimeout(function(){
        //remove the class that applies the bg color
        option1.style.backgroundColor = '';
        option2.style.backgroundColor = '';
        option1.classList.remove('flipped');
        option2.classList.remove('flipped');
        option1 = null;
        option2 = null;
        noClick = false;
      }, 1000)
    }
  }
//when all the cards are flipped, alert 'game over'
if (cardsFlipped === COLORS.length) alert ('Congratulations, you won!')
}


createDivsForColors(shuffledColors);
