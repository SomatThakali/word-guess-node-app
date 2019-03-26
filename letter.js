/**
 *This constructor is be able to either display
 * an underlying character or a blank placeholder
 * (such as an underscore), depending on whether or
 * not the user has guessed the letter
 * @param {string} letter
 */
function Letter(letter) {
  this.letter = letter;
  this.wasGuessed = false;
}

/**
 * A function that returns the underlying character
 * if the letter has been guessed, or a placeholder
 * (like an underscore) if the letter has not been guessed
 */
Letter.prototype.getChar = () => {
  if (this.letter === " ") {
    return " ";
  } else if (!this.wasGuessed) {
    return "_";
  } else {
    return this.letter;
  }
};

/**
 * This function checks user guess against the underlying character
 * @param {string} userGuess
 */
Letter.prototype.checkUserGuess = userGuess => {
  if (userGuess === this.letter) {
    this.wasGuessed = true;
  }
};

module.exports = { Letter };
