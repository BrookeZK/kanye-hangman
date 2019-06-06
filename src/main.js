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
      $("#wisdom").text(hangman.wordblank);
    }, (error) => {
      $(".errors").show();
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });


    $(".start").hide();
    $(".game-play").show();
    $("#incorrect-Guesses").text(hangman.numberOfIncorrectGuesses);
    $("#letters-Guessed").text(hangman.usedLetters);
    hangman.kanyeGif();
  });

  $("form.kanye").submit(function(event) {
    event.preventDefault();
    let letter = $("#letter").val();
    hangman.turn(letter);
    $("#incorrect-Guesses").text(hangman.numberOfIncorrectGuesses);
    $("#letters-Guessed").text(hangman.usedLetters);
    $("#wisdom").text(hangman.wordblank);
  });
});
