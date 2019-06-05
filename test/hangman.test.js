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
    expect(hangman.replaceBlankWithLetter(userInput)).toEqual("_a___ _____");
  });

  it("should see whether letter is already guessed and return 'pick another letter' if true", function() {
    let userInput = 'a';
    hangman.usedLetters = ['a'];
    expect(hangman.turn(userInput)).toEqual("pick another letter");
  });

  it('should replace blank with correctly guessed letter', function() {
    let userInput = 'a';
    hangman.wordblank = ['_','_','_','_','_',' ','_','_','_','_','_'];
    hangman.usedLetters = ['b'];
    expect(hangman.turn(userInput)).toEqual("_a___ _____");
  });

  it('should decrement number of tries and add to used letters pool when user incorrectly guesses a letter', function() {
    let userInput = 'z';
    hangman.usedLetters = ['b'];
    hangman.turn(userInput);
    expect(hangman.numberOfIncorrectGuesses).toEqual(5);
    expect(hangman.usedLetters).toEqual(['b', 'z']);
  });

  it("should return 'game over' when you run out of guesses", function() {
    hangman.numberOfIncorrectGuesses = 0;
    expect(hangman.isGameOver()).toEqual("Game Over");
  });

  it("should return 'winning' when you correctly guess the word", function() {
    console.log(hangman.hiddenWord.split(''));
    hangman.numberOfIncorrectGuesses = 6;
    hangman.wordblank = ['k', 'a', 'n', 'y', 'e', ' ', 's', 'u', 'c', 'k', 's'];
    expect(hangman.isGameOver()).toEqual("winning");
  });

});
