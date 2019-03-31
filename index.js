const Word = require("./word");
const secretWords = require("./library");
let inquirer = require("inquirer");
const colors = require("colors");

/** Game varibales */
let guessesLeft = 9;
let words = secretWords.possibleWords;
let randomWord = words[Math.floor(Math.random() * words.length)];
let currentWord = new Word(randomWord);

/** An array to store all the guessed letters */
let guessedLettersArr = [];

/** Game Message */
gameMessage();

/** Welcome message*/
let welcomeMessage = `Welcome! Let's see how well do you know the programming?`;
console.log(
  `\n-------------------------------------------------------\n${
    welcomeMessage.bold.green
  }\n-------------------------------------------------------`
);

function promtGuessWord() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "letter",
        message: "Guess a letter",
        validate: function(value) {
          if (isNaN(value) === true && isAlpha(value) === true) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(answers => {
      currentGuessedLetter = answers.letter.toLowerCase();
      guessLetters(currentGuessedLetter);
      initGame();
    });
}

/**
 * This function will update the guesses
 * @param {char} letter
 */
function guessLetters(letter) {
  if (letter.length === 1) {
    if (guessedLettersArr.indexOf(letter) === -1) {
      guessedLettersArr.push(letter);
    } else {
      /** gameMessage === already Guessed!!! */
      console.log(`${gameMessage()[2].bold.red}\n`);
      return;
    }

    if (randomWord.indexOf(letter) > -1) {
      /** gameMessage === Correct!!! */
      console.log(`${gameMessage()[0].bold.green}\n`);
    } else {
      guessesLeft--;
      /** gameMessage === INCORRECT!!! */
      console.log(`${gameMessage()[1].bold.red}\n`);
      console.log(`${guessesLeft} guess remaining!!! \n`);
    }
    currentWord.updateWordWithUserGuess(letter);
  }
}

initGame();

function initGame() {
  let word = currentWord.getLetters();
  console.log(word);
  if (word.indexOf("_") === -1) {
    /** gameMessage === Yes you got it and displays the random Word ! */
    console.log(gameMessage()[3].bold.green);
    playGame();
  } else if (guessesLeft > 0) {
    promtGuessWord();
  } else {
    /** gameMessage === You lost the game and displays the random Word */
    console.log(gameMessage()[4].bold.red);
    playGame();
  }
}

/** This function will promt the user to play the game again */
function playGame() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "play",
        message:
          "Enter y or Y to play the game again and any key to terminate the game",
        validate: function(value) {
          if (isNaN(value) === true && isAlpha(value) === true) {
            return true;
          }

          return false;
        }
      }
    ])
    .then(answers => {
      guessesLeft = 8;
      words = secretWords.possibleWords;
      randomWord = words[Math.floor(Math.random() * words.length)];
      currentWord = new Word(randomWord);
      guessedLettersArr = [];
      gameMessage();
      if (answers.play === "y" || answers.play === "Y") {
        initGame();
      } else {
        /** gameMessage === Thank You for playing!!! */
        console.log(gameMessage(gameMessage)[5].bold.green);
      }
    });
}
/**
 *
 * @param {char} char will return alphabets
 */
var isAlpha = function(char) {
  return /^[A-Z]$/i.test(char);
};

/** This function will retrun an array of game Message */
function gameMessage() {
  message = [
    `\nCorrect!!!`,
    `\nIncorrect!!!`,
    `\nAlready Guessed!!!`,
    `\nYes you got it!! The word is ${randomWord.toUpperCase()}\n`,
    `\nYou lost the game. Please try again later.\nThe secret word was ${
      randomWord.toUpperCase().bold.green
    }\n`,
    `Thank you for playing. See you later!!!`
  ];
  return message;
}
