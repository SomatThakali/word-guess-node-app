const Letter = require("./letter");

function Word(wordStr) {
  this.letterArr = wordStr.split("").map(char => new Letter(char));
  this.word = "";
  // console.log("this.letterArr ", this.letterArr);
}

/**
 * @returns {string} will return a string representing a word
 */
Word.prototype.getLetters = function() {
  console.log(this.letterArr);
  this.letterArr.forEach(letter => {
    this.word += letter.getChar();
  });
  // console.log("this.word", this.word);
  return this.word;
};

/**
 * This function will checks the user guess
 * @param {string} userLetterGuess
 */
Word.prototype.checkUserGuess = function(userLetterGuess) {
  this.letterArr.forEach(letter => {
    letter.checkLetterGuess(userLetterGuess);
  });
};

/**
 * Testing
 */
const newWord = new Word("word");
newWord.checkUserGuess("w");
newWord.checkUserGuess("o");
newWord.getLetters();

module.exports = Word;
