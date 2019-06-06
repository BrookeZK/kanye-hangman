// require('exports-loader?file!./bootstrap/js/dist/.js')
import { KanyeService } from './kanye-api.js'
import { hangman } from './hangman.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("#start-game").click(function() {
    //startGameFunction
    let kanyeService = new KanyeService();
    let promise = kanyeService.getQuote();

    promise.then((response) => {
      let body = JSON.parse(response);
      let quote = body.quote;
      hangman.hiddenWord = quote;
      hangman.wordBlanks();
      $('#quote').text(quote);
      $("#wisdom").text(hangman.wordblank.join(' '));
    }, (error) => {
      $(".errors").show();
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });

    $(".start").hide();
    $(".game-play").show();
    $("#incorrect-Guesses").text(hangman.numberOfIncorrectGuesses);
    $("#letters-Guessed").text(hangman.usedLetters);
    hangman.getGif("kanye");
  });

  $("form.kanye").submit(function(event) {
    event.preventDefault();
    let letter = $("#letter").val();
    hangman.turn(letter);

    console.log(hangman.wordblank.join(''));
    console.log(hangman.comparison.join(''));
    if (hangman.numberOfIncorrectGuesses === 3) {
      $("#one").hide();
      $("#two").show();
    } else if (hangman.numberOfIncorrectGuesses === 2) {
      $("#two").hide();
      $("#three").show();
    } else if (hangman.numberOfIncorrectGuesses === 1) {
      $("#three").hide();
      $("#four").show();
    }
    if (hangman.isGameOver() === true && hangman.numberOfIncorrectGuesses < 1) {
      $(".game-play").hide();
      $(".lose").show();
      $(".answer").text(hangman.hiddenWord);
      hangman.getGif("insult");
      $("#loser").text("LOSER!");
    } else if (hangman.isGameOver() === true && hangman.comparison.join('') === hangman.wordblank.join('')) {
      $(".game-play").hide();
      $(".win").show();
      $("#winner").text("WINNER!");
      hangman.getGif("celebration");
      $(".answer").text(hangman.hiddenWord);
    } else {
      $("#incorrect-Guesses").text(hangman.numberOfIncorrectGuesses);
      $("#letters-Guessed").text(hangman.usedLetters);
      $("#wisdom").text(hangman.wordblank.join(' '));
    }
  });
});
