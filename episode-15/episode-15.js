// Creating Elements

class Game {
    #minRange; // private
    #maxRange; // private
    #maxAttempts; // private
    
    constructor({minRange = 1, maxRange = 10, maxAttempts = 3} = {}) {
        this.#minRange = Game.initRangeValues({
            value: minRange, 
            lowerBounds: 0, 
            upperBounds: maxRange 
        });
        
        this.#maxRange = Game.initRangeValues({
            value: maxRange, 
            lowerBounds: minRange
        });
        
        this.#maxAttempts = maxAttempts;
    }

    get minRange() {
        return this.#minRange;
    }

    set minRange(value) {
        this.#minRange = Game.initRangeValues({
            value,
            lowerBounds: 0,
            upperBounds: this.#maxRange
        });
    }

    get maxRange() {
        return this.#maxRange;
    }

    set maxRange(value) {
        this.#maxRange = Game.initRangeValues({
            value,
            lowerBounds: this.#minRange
        });
    }

    get maxAttempts() {
        return this.#maxAttempts;
    }

    set maxAttempts(value) {
        this.#maxAttempts = value;
    }

    static initRangeValues({value, lowerBounds, upperBounds = 0} = {}) {
        let num = Number(value);

        if (isNaN(num)) {
            throw {
                message: 'Value must be numeric'
            };
        }

        if (num < lowerBounds) {
            throw {
                message: `Value cannot be less than ${lowerBounds}`
            };
        }

        if (upperBounds && num > upperBounds) {
            throw {
                message: `Value cannot be greater than ${upperBounds}`
            };
        }

        return num;
    }

    checkGuess(guess) {
        if (guess === this.secretNumber) {
            console.log('Congrats! You guessed the number');
            return true;
        } else if (guess < this.secretNumber) {
            console.log(`${guess} is too low.`);
        } else {
            console.log(`${guess} is too high.`);
        }

        return false;
    }

    play() {
        this.secretNumber = Math.floor(
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
    
            if (this.checkGuess(guess)) {
                var guessed = true;
                break;
            }
        }
    
        var guessedMessage = guessed ? 'guessed' : "didn't guess";
    
        console.log(`Game over! The number is ${this.secretNumber}, and you ${guessedMessage} in ${history.length} attempts`);
        console.log(`Guessed numbers are: ${history.join(', ')}`);
    }
}

function createLiElement({content}) {
    const element = document.createElement('li');
    const textNode = document.createTextNode(content);

    element.appendChild(textNode);

    return element;
}

let easyGame = new Game({maxAttempts: 5});
const gameTitleElement = document.getElementById('game-title');
gameTitleElement.replaceChildren();
// gameTitleElement.innerHTML = 'Easy Game';
const titleTextNode = document.createTextNode('Easy Game');
gameTitleElement.appendChild(titleTextNode);

const rulesListElement = document.querySelector('ul.list-disc.list-inside');
// rulesListElement.innerHTML = `<li>Min: ${easyGame.minRange}</li>
//                                 <li>Max: ${easyGame.maxRange}</li>
//                                 <li>Max Attempts: ${easyGame.maxAttempts}</li>`;

const fragment = document.createDocumentFragment();

fragment.appendChild(createLiElement({content: `Min: ${easyGame.minRange}`}));
fragment.appendChild(createLiElement({content: `Max: ${easyGame.maxRange}`}));
fragment.appendChild(createLiElement({content: `Max Attempts: ${easyGame.maxAttempts}`}));

rulesListElement.appendChild(fragment);


const headingElements = document.querySelectorAll('h2, h3');