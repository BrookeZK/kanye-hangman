import $ from 'jquery';

export let hangman = {
  hiddenWord: 'kanye sucks',
  numberOfTries: 6,
  usedLetters: [],
  wordBlanks: function() {
    let wordblank = [];
    let array = hangman.hiddenWord.split('');
    for (let i = 0; i < array.length; i++) {
      if (array[i].match(/[a-z]/i)) {
        wordblank.push("_");
      } else if (array[i] === " ")
      {
        wordblank.push(" ");
      }
    }
    return wordblank.join('');
  },

  isLetterAlreadyGuessed: function(letter) {
    if(hangman.usedLetters.includes(letter)) {
      return true;
    } else {
      return false;
    }
  },

  // isLetterInWord: function() {
  //
  // },
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
