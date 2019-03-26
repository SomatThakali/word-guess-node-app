let letter = require("./letter");

function Word(letterArr) {
  this.letterArr = letterArr;
  this.word = "";
}

Word.prototype.displayLetters = () => {
  this.letterArr.forEach(item => {
    this.word += item.letter.getChar();
  });
};

Word.prototype.checkUserGuess = userguess => {
  letter.checkUserGuess(userGuess);
};

module.exports = { Word };
