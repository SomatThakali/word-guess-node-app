const Letter = require("./letter");

function Word(wordStr) {
  this.letterArr = wordStr.split("").map(char => new Letter(char));
  this.word = "";
  // console.log("this.letterArr ", this.letterArr);
}

/**
 * @returns {string} a string representing a word
 */
Word.prototype.getLetters = function() {
  this.word = "";
  this.letterArr.forEach(letter => {
    this.word += letter.getChar();
  });
  // console.log(this.word);
  return this.word;
};

/**
 * This function will checks the user guess
 * @param {string} userLetterGuess
 */
Word.prototype.updateWordWithUserGuess = function(userLetterGuess) {
  this.letterArr.forEach(letter => {
    letter.checkLetterGuess(userLetterGuess);
  });
};

module.exports = Word;
