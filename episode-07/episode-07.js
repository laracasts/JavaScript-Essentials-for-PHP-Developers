// Arrays

let array = [1, 3, 6, 47, 23];
let ofArray = Array.of(4,2, 5, 73, 12);
let fromArray = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

const playGame = (function() {

    const secretNumber = Math.floor(Math.random() * 10) + 1;
    const maxAttempts = 3;
    const history = [];

    return function() {

        while (history.length < maxAttempts) {
            var input = prompt('Please enter a number between 1 and 10');
            var guess = Number(input);
    
            if (isNaN(guess) || guess < 1 || guess > 10) {
                console.log('Please enter a valid number from 1 and 10');
                continue;
            }

            if (history.indexOf(guess) > -1) {
                continue;
            }

            history.push(guess);
    
            if (guess === secretNumber) {
                console.log('Congrats! You guessed the numbers');
                var guessed = true;
                break;
            } else if (guess < secretNumber) {
                console.log(`${guess} is too low.`);
            } else {
                console.log(`${guess} is too high.`);
            }
        }
    
        var guessedMessage = guessed ? 'guessed' : "didn't guess";
    
        console.log(`Game over! The number is ${secretNumber}, and you ${guessedMessage} in ${history.length} attempts`);
        console.log(`Guessed numbers are: ${history.join(', ')}`);
    }
})();

playGame();