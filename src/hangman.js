import $ from 'jquery';

export let hangman = {
  hiddenWord: 'kanye sucks',
  numberOfTries: 6,
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
    };
    indexes.forEach(function(index) {
      hangman.wordblank[index] = letter;
    });
    return hangman.wordblank.join('');
  },
  //
  // turn: function() {
  //   if (isLetterAlreadyGuessed === true) {
  //     return "pick another letter";
  //   }
  //   if (isLetterInWord === true){
  //
  //   } else if (isLetterInWord === false) {
  //
  //   }
  // },
}
