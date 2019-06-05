import { hangman } from '../src/hangman';

describe('hangman', function() {

  it('should create a wordblank from the hiddenword property', function() {
    expect(hangman.wordBlanks()).toEqual("_____ _____")
  });

  it('should check if letter has already been guessed', function() {
    let userInput = 'a';
    hangman.usedLetters = ['a'];
    expect(hangman.isLetterAlreadyGuessed(userInput)).toEqual(true);
    userInput = 'b';
    expect(hangman.isLetterAlreadyGuessed(userInput)).toEqual(false);
  });

  it('should check if input letter is in hidden word', function() {
    let userInput = 'a';
    expect(hangman.isLetterInWord(userInput)).toEqual(true);
    userInput = 'b';
    expect(hangman.isLetterInWord(userInput)).toEqual(false);
  });

  it('should test whether a blank is replaced with a correctly chosen word', function() {
    let userInput = 'a';
    hangman.wordblank = ['_','_','_','_','_',' ','_','_','_','_','_'];
    expect(hangman.replaceBlankWithLetter(userInput)).toEqual("_a___ _____")
  });
});
