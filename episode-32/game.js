import {clearGameState, getGameState, saveGameState} from './browser-storage.js';

export default class Game {
    #minRange; // private
    #maxRange; // private
    #maxAttempts; // private
    #allowDuplicateGuesses;
    #secretNumber;
   
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
        
        this.#maxAttempts = parseInt(maxAttempts);
        this.#allowDuplicateGuesses = allowDuplicateGuesses;
        this.history = [];
        this.#secretNumber = Math.floor(
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

    static hasSavedGame() {
        return getGameState();
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

    static loadSavedGame() {
        return getGameState().then(function(state) {
            if (!state) {
                return null;
            }

            let game = new Game(state);

            game.#secretNumber = state.secretNumber;
            game.history = state.history;
    
            return game;
        }).catch(function(err) {
            console.log(err);
        });
    }

    checkGuess(guess) {
        if (this.#maxAttempts === this.history.length) {
            return; // todo: throw error?
        }

        if (!this.#allowDuplicateGuesses && this.history.indexOf(guess) > -1) {
            return;
        }

        this.history.push(guess);

        const isCorrect = guess === this.#secretNumber;
        const isLastAttempt = this.#maxAttempts === this.history.length;
        const result = isCorrect ? 'correct' :
            guess < this.#secretNumber ? 'too low' : 'too high';

        document.dispatchEvent(new CustomEvent('game:guess', {
            detail: {
                guess,
                result,
                remainingAttempts: this.#maxAttempts - this.history.length
            }
        }));

        if (isCorrect || isLastAttempt) {
            document.dispatchEvent(new CustomEvent('game:over', {
                detail: {
                    secretNumber: this.#secretNumber
                }
            }));

            clearGameState();
            return;
        }

        saveGameState({
            minRange: this.#minRange,
            maxRange: this.#maxRange,
            maxAttempts: this.#maxAttempts,
            allowDuplicateGuesses: this.#allowDuplicateGuesses,
            secretNumber: this.#secretNumber,
            history: this.history
        });

        
    }
}