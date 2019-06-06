import $ from 'jquery';
export let hangman = {
  hiddenWord: 'kanye sucks',
  numberOfIncorrectGuesses: 4,
  usedLetters: [],
  comparison: [],
  wordblank: [],
  wordBlanks: function() {
    let arrayH = hangman.hiddenWord.split('');
    for (let i = 0; i < arrayH.length; i++) {
      if (arrayH[i].match(/[a-z]/i)) {
        hangman.wordblank.push("_");
        hangman.comparison.push(arrayH[i]);
      } else if (arrayH[i] === " ")
      {
        hangman.wordblank.push("\xa0\xa0\xa0\xa0");
        hangman.comparison.push("\xa0\xa0\xa0\xa0");
      } else if (arrayH[i].match(/[.,/#!$%^&*'?;:{}=\-_`~()]/i)) {
        hangman.wordblank.push(arrayH[i]);
        hangman.comparison.push(arrayH[i]);
      }
    }
    return hangman.wordblank.join("");
  },

  isLetterAlreadyGuessed: function(letter) {
    let upperLetter = letter.toUpperCase();
    let lowerLetter = letter.toLowerCase();
    if(hangman.usedLetters.includes(upperLetter) || hangman.usedLetters.includes(lowerLetter)) {
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
    let upperLetter = letter.toUpperCase();
    let lowerLetter = letter.toLowerCase();

    for (let i = 0; i < arrayH.length; i++) {
      if (arrayH[i] === upperLetter || arrayH[i] === lowerLetter) {
        indexes.push([i]);
      }
    }
    indexes.forEach(function(index) {
      hangman.wordblank[index] = hangman.hiddenWord[index];
    })
    hangman.usedLetters.push(letter);
    return hangman.wordblank.join('');
  },

  turn: function(letter) {
    if(hangman.isLetterAlreadyGuessed(letter) === true) {
      return;
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
      return true;
    } else if(hangman.comparison.join('') === hangman.wordblank.join('')) {
      return true;
    }
  },

  getGif: function(tagName){
    $.ajax({
      url: `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=${tagName}&rating=R`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: (response) => {
        if(tagName === "kanye") {
          $('.kanye-gif').html(`<img src="${response.data.images.original.url}">`);
          // $('.kanye-gif').show();
        } else if(tagName === "celebration") {
          $('.win-gif').html(`<img src="${response.data.images.original.url}">`);
        } else if(tagName === "insult") {
          $('.lose-gif').html(`<img src="${response.data.images.original.url}">`);
        }
      },
      error: () => {
        $('.errors').text("There was an error processing your request, noob.");
      }
    });
  },
}
