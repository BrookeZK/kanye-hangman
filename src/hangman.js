export let hangman = {
  hiddenWord: 'kanye sucks',
  numberOfIncorrectGuesses: 6,
  usedLetters: [],
  wordblank: [],
  wordBlanks: function() {
    let arrayH = hangman.hiddenWord.split('');
    for (let i = 0; i < arrayH.length; i++) {
      if (arrayH[i].match(/[a-z]/i)) {
        hangman.wordblank.push("_");
      } else if (arrayH[i] === " ")
      {
        hangman.wordblank.push(" ");
      }
    }
    return hangman.wordblank.join('');
  },

  isLetterAlreadyGuessed: function(letter) {
    if(hangman.usedLetters.includes(letter)) {
      return true;
    } else {
      return false;
    }
  },

  isLetterInWord: function(letter) {
    let arrayH = hangman.hiddenWord.split('');
    if(arrayH.includes(letter)) {
      return true;
    } else {
      return false;
    }
  },

  replaceBlankWithLetter: function(letter) {
    let indexes = [];
    let arrayH = hangman.hiddenWord.split('');

    for (let i = 0; i < arrayH.length; i++) {
      if (arrayH[i] === letter) {
        indexes.push([i]);
      }
    }
    indexes.forEach(function(index) {
      hangman.wordblank[index] = letter;
    })
    hangman.usedLetters.push(letter);
    return hangman.wordblank.join('');
  },

  turn: function(letter) {
    if(hangman.isLetterAlreadyGuessed(letter) === true) {
      return "pick another letter";
    } else {
      if (hangman.isLetterInWord(letter) === true){
        return hangman.replaceBlankWithLetter(letter);
      } else if (hangman.isLetterInWord(letter) === false) {
        hangman.numberOfIncorrectGuesses--;
        hangman.usedLetters.push(letter);
      }
    }
  },

  isGameOver: function(letter) {
    if(hangman.numberOfIncorrectGuesses < 1) {
      return "Game Over";
    } else if(hangman.hiddenWord === hangman.wordblank.join('')) {
      return "winning";
    }
  }
}
