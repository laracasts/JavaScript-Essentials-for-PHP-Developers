import Game from './game.js';

let game;


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

const gameAreaElement = getBy('#game-area');

export const ui = {

    get selectedGameType() {
        return form.elements.namedItem('game-type-selector').value;
    },

    get allowDuplicateGuesses() {
        return allowDuplicatesElement.checked;
    },

    gameArea: {
        set disabled(value) {
            const elements = gameAreaElement.querySelectorAll('input, button');

            for (let ii = 0; ii < elements.length; ii++) {
                elements[ii].disabled = value;
            }
        },


        hide() {
            gameAreaElement.classList.add('hidden');
        },

        show() {
            gameAreaElement.classList.remove('hidden');
        }
    },

    settings: {
        set disabled(value) {
            const elements = form.elements;

            for (let ii = 0; ii < elements.length; ii++) {
                elements[ii].disabled = value;
            }
        }
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
};

export function init() {
    document.addEventListener('click', function(e) {
        if (e.target.id === 'submit-guess') {
            // get guess
    
            e.target.dispatchEvent(new CustomEvent('ui:submit-guess', {
                bubbles: true,
                detail: {
                    guess: ui.getGuess(),
                    game
                }
            }));
        } else if (e.target.id === 'end-game') {
            e.target.dispatchEvent(new Event('ui:end-game', {
                bubbles: true
            }));
        }
    });

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
    
    document.getElementById('settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
    
        let titleElement = getBy('#input-title');
        let minRangeElement = getBy('#input-min-range');
        let maxRangeElement = getBy('#input-max-range');
        let maxAttemptsElement = getBy('#input-max-attempts');
        let gameLevelElement = getBy('#game-level');
    
    
    
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
            ui.gameArea.show();
    
    
            ui.reset();
            game = new Game({minRange, maxRange, maxAttempts, allowDuplicateGuesses});
            ui.settings.disabled = true
            ui.gameArea.disabled = false;
    
            // game.play();
        } else {
            titleElement.value = '';
            minRangeElement.value = '';
            maxRangeElement.value = '';
            maxAttemptsElement.value = '';
            ui.reset();
    
            ui.gameArea.hide();
        }
    
    });
}