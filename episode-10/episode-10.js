// Destructuring Objects

const game = (function() {

    return {
        play({minRange = 1, maxRange = 10, maxAttempts = 3} = {}) {
            // const {minRange = 1, maxRange = 10, maxAttempts = 3} = options;


            // const minRange = options.minRange ?? 1;
            // const maxRange = options.maxRange ?? 10;
            // const maxAttempts = options.maxAttempts ?? 3;

            const secretNumber = Math.floor(
                Math.random() * (maxRange - minRange + 1)) + minRange;
            const history = [];

            while (history.length < maxAttempts) {
                var input = prompt('Please enter a number between 1 and 10');
                var guess = Number(input);
        
                if (isNaN(guess) || guess < minRange || guess > maxRange) {
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
    };
})();