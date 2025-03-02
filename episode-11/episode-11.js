// Object Creational Patterns

class Game {
    #minRange; // private
    #maxRange; // private
    #maxAttempts; // private
    
    constructor({minRange = 1, maxRange = 10, maxAttempts = 3} = {}) {
        this.#minRange = minRange;
        this.#maxRange = maxRange;
        this.#maxAttempts = maxAttempts;
    }

    play() {
        const secretNumber = Math.floor(
            Math.random() * (this.#maxRange - this.#minRange + 1)) + this.#minRange;
        const history = [];

        while (history.length < this.#maxAttempts) {
            var input = prompt('Please enter a number between 1 and 10');
            var guess = Number(input);
    
            if (isNaN(guess) || guess < this.#minRange || guess > this.#maxRange) {
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
}


// factory function
const createGame = function({minRange = 1, maxRange = 10, maxAttempts = 3} = {}) {
    return {
        // minRange,
        // maxRange,
        // maxAttempts,
        play() {
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
}

let easyGame = createGame({maxAttempts: 10});
let hardGame = createGame({maxRange: 100, maxAttempts: 10});
let reallyHardGame = createGame({maxRange: 100, maxAttempts: 5});


let easyGame2 = new Game({maxAttempts: 10});
let hardGame2 = new Game({maxRange: 100, maxAttempts: 10});
let reallyHardGame2 = new Game({maxRange: 100, maxAttempts: 5});

alert(easyGame2.play === hardGame2.play);

