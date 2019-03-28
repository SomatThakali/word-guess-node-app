const Word = require("./word");
const secretWords = require("./library");
let inquirer = require("inquirer");
const colors = require("colors");

let guessesLeft = 5;
let words = secretWords.possibleWords;
let randomWord = words[Math.floor(Math.random() * words.length)];
let currentWord = new Word(randomWord);
console.log("current word is ", currentWord);
let guessedLettersArr = [];
let gameMessage = ["Correct!!!", "Incorrect!!!", "Already Guessed!!!"];

console.log(
  "\n---------------------------------\nHow well do you know programming?\n---------------------------------"
);

initGame();

function initGame() {
  console.log(currentWord.getLetters());
  if (guessesLeft > 0) {
    promtGuessWord();
  } else {
    console.log("You lost the game. Please try again later");
  }
}

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
      console.log(`${gameMessage[2].bold.red}\n`);
      return;
    }

    if (randomWord.indexOf(letter) > -1) {
      console.log(`${gameMessage[0].bold.green}\n`);
    } else {
      guessesLeft--;
      console.log(`${gameMessage[1].bold.red}\n`);
      console.log(`${guessesLeft} guesses remaining\n`);
    }
    currentWord.updateWordWithUserGuess(letter);
  }
}

/**
 *
 * @param {char} char will return alphabets
 */
var isAlpha = function(char) {
  return /^[A-Z]$/i.test(char);
};
