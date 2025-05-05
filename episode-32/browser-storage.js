const gameStateKey = 'game-state';

export function clearGameState() {
    return new Promise(function(resolve, reject) {
        try {
            localStorage.removeItem(gameStateKey);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

export function getGameState() {
    return new Promise(function(resolve, reject) {
        try {
            const state = JSON.parse(localStorage.getItem(gameStateKey));
            resolve(state);
        } catch (err) {
            reject(err);
        }
    });
};

export function saveGameState(stateObj) {
    return new Promise(function(resolve, reject) {
        try {
            localStorage.setItem(gameStateKey, JSON.stringify(stateObj));
            resolve();
        } catch (err) {
            reject(err);
        }
    });
};