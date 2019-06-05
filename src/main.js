// require('exports-loader?file!./bootstrap/js/dist/.js')
import { hangman } from './hangman.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("#start-game").click(function() {
    //startGameFunction
    $(".start").hide();
    $(".game-play").show();
    $("#incorrect-Guesses").text(hangman.numberOfIncorrectGuesses);
    $("#letters-Guessed").text(hangman.usedLetters);
    $("#wisdom").text(hangman.wordblank);
  });

  $("form.kanye").submit(function(event) {
    event.preventDefault();
    let letter = $("#letter").val();
  });
});
