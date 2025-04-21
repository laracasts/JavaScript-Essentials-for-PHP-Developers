// Modules
import { ui, init } from './ui.js';

init();

document.addEventListener('game:over', function(e) {
    const secretNumber = e.detail.secretNumber;

    ui.showFeedback(`Game over! The secret number is ${secretNumber}.`);
    ui.settings.disabled = false;
    ui.gameArea.disabled = true;
});

document.addEventListener('game:guess', function(e) {
    const {guess, result, remainingAttempts} = e.detail;

    ui.updateHistory(`${guess} is ${result}`);
    ui.showFeedback(`You have ${remainingAttempts} remaining attempts.`);
});



document.addEventListener('ui:submit-guess', function(e) {
    const {guess, game} = e.detail;

    // validate the guess
    if (isNaN(guess) || guess < game.minRange || guess > game.maxRange) {
        ui.showFeedback(`Please enter a valid number from 
            ${game.minRange} and ${game.maxRange}`);

        ui.resetGuess();
        return;
    }

    // check guess
    game.checkGuess(guess);

    ui.resetGuess();
});

document.addEventListener('ui:end-game', function() {
    ui.settings.disabled = false;
});
