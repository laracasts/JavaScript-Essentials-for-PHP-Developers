// Event Driven

const ui = (function() {

    function getBy(cssSelector) {
        return document.querySelector(cssSelector);
    }

    const form = getBy('#settings-form');
    const optionsCustomElement = getBy('#options-custom');
    const optionsModeElement = getBy('#options-mode');
    const allowDuplicatesElement = getBy('#allow-duplicates-checkbox');
    const inputGuessElement = getBy('#guess-input');
    const feedbackElement = getBy('#guess-feedback');
    const historyElement = getBy('#guess-history');


    return {

        get selectedGameType() {
            return form.elements.namedItem('game-type-selector').value;
        },

        get allowDuplicateGuesses() {
            return allowDuplicatesElement.checked;
        },

        changeGameType(id) {
            if (optionsCustomElement.id === id) {
                optionsCustomElement.className = 'inline';
                optionsModeElement.className = 'hidden';
            } else {
                optionsCustomElement.className = 'hidden';
                optionsModeElement.className = 'inline';
            }
        },

        getGuess() {
            return parseInt(inputGuessElement.value);
        },

        reset() {
            this.resetHistory();
            this.resetGuess();
            this.showFeedback('');
        },

        resetGuess() {
            inputGuessElement.value = '';
            inputGuessElement.focus();
        },

        resetHistory() {
            historyElement.innerHTML = '';
        },

        showFeedback(result) {
            feedbackElement.innerHTML = result;
        },

        updateHistory(result) {
            historyElement.innerHTML += `<li>${result}</li>`;
        }
    }


})();

class Game {
    #minRange; // private
    #maxRange; // private
    #maxAttempts; // private
    #allowDuplicateGuesses;
    
    constructor({minRange = 1, maxRange = 10, maxAttempts = 3, allowDuplicateGuesses = false} = {}) {
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
        this.#allowDuplicateGuesses = allowDuplicateGuesses;
        this.history = [];
        this.secretNumber = Math.floor(
            Math.random() * (this.#maxRange - this.#minRange + 1)) + this.#minRange;
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

        if (!this.#allowDuplicateGuesses) {
            if (this.history.indexOf(guess) > -1) {
                return;
            }
        }

        this.history.push(guess);

        if (guess === this.secretNumber) {
            return 'correct!';
        } else if (guess < this.secretNumber) {
            return `too low.`;
        } else {
           return `too high.`;
        }
    }

    play() {
        
        const history = [];

        while (history.length < this.#maxAttempts) {
           

            
    
            

            
            

            
    
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

function getBy(cssSelector) {
    return document.querySelector(cssSelector);
}

document.addEventListener('input', function(e) {
    if (e.target.name !== 'game-type-selector') {
        return;
    }

    ui.changeGameType(e.target.value);
});

document.addEventListener('keydown', function(e) {
    if (e.target.parentNode.id !== 'options-custom') {
        return;
    }

    if (e.target.id.indexOf('title') > -1) {
        return;
    }

    const allowedKeys = [
        'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'
    ];

    const key = e.key;

    if (allowedKeys.includes(key) || key >= 0 && key <= 9) {
        return;
    } else {
        e.preventDefault();
    }


});

let game;

document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let titleElement = getBy('#input-title');
    let minRangeElement = getBy('#input-min-range');
    let maxRangeElement = getBy('#input-max-range');
    let maxAttemptsElement = getBy('#input-max-attempts');
    let gameLevelElement = getBy('#game-level');

    const gameAreaElement = getBy('#game-area');


    const submitterName = e.submitter.name;
    const allowDuplicateGuesses = ui.allowDuplicateGuesses;
    
    if (submitterName === 'play-game') {
        let title = titleElement.value;
        let minRange = minRangeElement.value;
        let maxRange = maxRangeElement.value;
        let maxAttempts = maxAttemptsElement.value;

        if (ui.selectedGameType === 'options-custom') {
            if (!title || !minRange || !maxRange || !maxAttempts) {
                alert('Please enter all settings');
                return;
            }
        } else {
            let selectedOption = gameLevelElement.selectedOptions[0];

            minRange = selectedOption.getAttribute('data-min-range'); // minRange
            maxRange = selectedOption.dataset.maxRange;
            maxAttempts = selectedOption.dataset.attempts;
        }

        // gameAreaElement.style.display = 'block';
        
        gameAreaElement.classList.remove('hidden');
        // gameAreaElement.classList.toggle('hidden');


        ui.reset();
        game = new Game({minRange, maxRange, maxAttempts, allowDuplicateGuesses});
        
        // game.play();
    } else {
        titleElement.value = '';
        minRangeElement.value = '';
        maxRangeElement.value = '';
        maxAttemptsElement.value = '';
        ui.reset();

        // gameAreaElement.style.display = '';
        gameAreaElement.classList.add('hidden');
        // gameAreaElement.classList.toggle('hidden');
    }

});

document.addEventListener('click', function(e) {
    if (e.target.id === 'submit-guess') {
        // get guess
        const guess = ui.getGuess();

        // validate the guess
        if (isNaN(guess) || guess < game.minRange || guess > game.maxRange) {
            ui.showFeedback(`Please enter a valid number from 
                ${game.minRange} and ${game.maxRange}`);

            ui.resetGuess();
            return;
        }

        // check guess
        const result = game.checkGuess(guess);

        // provide feedback
        ui.showFeedback(`${guess} is ${result}`);

        ui.updateHistory(`${guess} is ${result}`);

        ui.resetGuess();
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


