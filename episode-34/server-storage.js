export async function clearGameState() {
    
}

export async function getGameState() {
    const params = new URLSearchParams({
        minRange: 1,
        maxRange: 10,
        maxAttempts: 5,
        allowDuplicateGuesses: false,
        secretNumber: 7
    });

    const response = await fetch(`get.php?${params}`, {
        headers: {
            'Accept' : 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error("Response wasn't ok.");
    }

    return await response.json();
};

export async function saveGameState(stateObj) {
    
};