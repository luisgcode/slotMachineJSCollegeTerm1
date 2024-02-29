// "use strict";

// Cash displayed to the user
let cashShowed = document.getElementById("p_Cash");
// Input to insert the bet
let betInput = document.getElementById("tb_Bet");

// Reset button
const resetBtn = document.getElementById("reset");

// Button to play slots
const playBtn = document.getElementById("btn_Play");
// button to play all the money (Bet maximum)
const betMaximum = document.getElementById("maxBet");

// Output message
let messageOutput = document.getElementById("d_Output");
// game result
let resultOutput = document.getElementById("d_Feedback");

// images
let imageOne = document.getElementById("img_Slot1");
let imageTwo = document.getElementById("img_Slot2");
let imageThree = document.getElementById("img_Slot3");

const STARTING_CASH = 1000;
var cashOnHand = STARTING_CASH;
cashShowed.innerHTML = "$" + STARTING_CASH.toFixed(2);

const validateUserBet = function () {
  const MINIMUM_BET = 10;

  let betNumber = betInput.value.trim();

  if (
    // more than mini bet
    betNumber >= MINIMUM_BET &&
    // lest than cash i have
    betNumber <= cashOnHand &&
    // is not empty
    betNumber !== "" &&
    // is the opposite of not a number
    !isNaN(betNumber)
  ) {
    messageOutput.innerHTML = "Valid bet, you can continue";
    messageOutput.style.color = "green";
    messageOutput.style.fontWeight = "bold";
    btn_Play.disabled = false;
  } else {
    messageOutput.innerHTML = "Invalid bet, you can't continue";
    messageOutput.style.color = "red";
    messageOutput.style.fontWeight = "bold";
    btn_Play.disabled = true;
  }
};
betInput.addEventListener("input", validateUserBet);

betMaximum.addEventListener("click", function () {
  betInput.value = cashOnHand;
});

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const imageSrcFunction = function (slot) {
  let imageSrc;

  if (slot == 1) {
    imageSrc = "bell.png";
  } else if (slot == 2) {
    imageSrc = "cherry.png";
  } else if (slot == 3) {
    imageSrc = "seven.png";
  } else {
    imageSrc = "default.png";
  }

  return imageSrc;
};

// Void function that update the paragraph with the ID p_cash with the cashonHand
const updateParagraph = function () {
  cashShowed.innerHTML = `$ ${cashOnHand.toFixed(2)}`;
};

// void function that takes one argument. is a string representing a message.
const updateFeedback = function (message) {
  resultOutput.innerHTML = message;
  resultOutput.style.textDecoration = "underline";
};

playBtn.addEventListener("click", function () {
  let betValue = Number(betInput.value);

  let slotNumberOne = generateRandomNumber(1, 3);
  let slotNumberTwo = generateRandomNumber(1, 3);
  let slotNumberThree = generateRandomNumber(1, 3);

  imageOne.src = imageSrcFunction(slotNumberOne);
  imageTwo.src = imageSrcFunction(slotNumberTwo);
  imageThree.src = imageSrcFunction(slotNumberThree);

  // checking winner

  if (slotNumberOne == slotNumberTwo && slotNumberOne == slotNumberThree) {
    // If inside if
    // 1 bell
    if (slotNumberOne == 1 && slotNumberTwo == 1 && slotNumberThree == 1) {
      cashOnHand += betValue * 2;
      updateParagraph();
      updateFeedback(`You won ${betValue} * 2 = ${betValue * 2}`);
    }
    // 2 cherry
    else if (slotNumberOne == 2 && slotNumberTwo == 2 && slotNumberThree == 2) {
      cashOnHand += betValue * 1.5;
      updateParagraph();
      updateFeedback(`You won ${betValue} * 1.5 = ${betValue * 1.5}`);
    }
    // 3 seven
    else if (slotNumberOne == 3 && slotNumberTwo == 3 && slotNumberThree == 3) {
      cashOnHand += betValue * 1.25;
      updateParagraph();
      updateFeedback(`You won ${betValue} * 1.25 = ${betValue * 1.25}`);
    }
  } else {
    cashOnHand -= betValue;
    validateUserBet();
    updateParagraph();
    updateFeedback(`you have lost $${betValue.toFixed(2)}`);
  }
});

// reset all values
const resetGame = function () {
  cashOnHand = STARTING_CASH;
  messageOutput.innerHTML = "Place your bet to play!";
  messageOutput.style.color = "";
  messageOutput.style.fontWeight = "";
  btn_Play.disabled = true;
  resultOutput.innerHTML = "Game result...";
  resultOutput.style.textDecoration = "";
  betInput.value = "";
};

resetBtn.addEventListener("click", resetGame);
