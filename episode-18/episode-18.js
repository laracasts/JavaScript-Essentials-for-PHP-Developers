// Select Element


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
            var input = prompt(`Please enter a number between ${this.#minRange} and ${this.#maxRange}`);

            if (input === null) {
                break;
            }

            var guess = Number(input);
    
            if (isNaN(guess) || guess < this.#minRange || guess > this.#maxRange) {
                console.log(`Please enter a valid number from ${this.#minRange} and ${this.#maxRange}`);
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

function getBy(cssSelector) {
    return document.querySelector(cssSelector);
}

document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let titleElement = getBy('#input-title');
    let minRangeElement = getBy('#input-min-range');
    let maxRangeElement = getBy('#input-max-range');
    let maxAttemptsElement = getBy('#input-max-attempts');
    let gameLevelElement = getBy('#game-level');

    const submitterName = e.submitter.name;
    
    if (submitterName === 'play-game') {
        let title = titleElement.value;
        let minRange = minRangeElement.value;
        let maxRange = maxRangeElement.value;
        let maxAttempts = maxAttemptsElement.value;

        // if (!title || !minRange || !maxRange || !maxAttempts) {
        //     alert('Please enter all settings');
        //     return;
        // }

        // let selectedOption = gameLevelElement.options[gameLevelElement.selectedIndex];
        let selectedOption = gameLevelElement.selectedOptions[0];

        minRange = selectedOption.getAttribute('data-min-range'); // minRange
        maxRange = selectedOption.dataset.maxRange;
        maxAttempts = selectedOption.dataset.attempts;

        let easyGame = new Game({minRange, maxRange, maxAttempts});
        easyGame.play();
    } else {
        titleElement.value = '';
        minRangeElement.value = '';
        maxRangeElement.value = '';
        maxAttemptsElement.value = '';

        console.clear();
    }

});


// document.getElementById('play-game').addEventListener('click', function(e) {
//     e.preventDefault();

//     let title = document.getElementById('input-title').value;
//     let minRange = document.getElementById('input-min-range').value;
//     let maxRange = document.getElementById('input-max-range').value;
//     let maxAttempts = document.getElementById('input-max-attempts').value;

//     if (!title || !minRange || !maxRange || !maxAttempts) {
//         alert('Please enter all settings');
//         return;
//     }

//     let easyGame = new Game({minRange, maxRange, maxAttempts});
//     easyGame.play();
// });

// document.getElementById('clear-game').addEventListener('click', function(e) {
//     e.preventDefault();

//     document.getElementById('input-title').value = '';
//     document.getElementById('input-min-range').value = '';
//     document.getElementById('input-max-range').value = '';
//     document.getElementById('input-max-attempts').value = '';

//     console.clear();
// });


