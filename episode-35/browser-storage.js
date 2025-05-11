const gameStateKey = 'game-state';

export async function clearGameState() {
    localStorage.removeItem(gameStateKey);
}

export async function getGameState() {
    return JSON.parse(localStorage.getItem(gameStateKey));
};

export async function saveGameState(stateObj) {
    localStorage.setItem(gameStateKey, JSON.stringify(stateObj));
};