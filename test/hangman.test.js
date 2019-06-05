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
});
