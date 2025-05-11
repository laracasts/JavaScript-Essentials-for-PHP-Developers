const jsonContentType = 'application/json';

async function getJson(url) {
    const response = await fetch(url, {
        headers: {
            'Accept' : 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error("Response wasn't ok.");
    }

    return await response.json();
}

async function sendFormData({
    minRange, maxRange, maxAttempts,
    secretNumber, allowDuplicateGuesses, history
}) {
    const formData = new FormData();
    formData.append('minRange', minRange);
    formData.append('maxRange', maxRange);
    formData.append('maxAttempts', maxAttempts);
    formData.append('secretNumber', secretNumber);
    formData.append('allowDuplicateGuesses', allowDuplicateGuesses);
    
    history.forEach(element => {
        formData.append('history[]', element);
    });

    await fetch('save.php', {
        method: 'POST',
        body: formData
    });
}

async function sendJson(stateObj) {
    await fetch('save.php', {
        headers: {
            'Content-Type': jsonContentType,
            'Accept': jsonContentType,
        },
        method: 'POST',
        body: JSON.stringify(stateObj)
    });
}


export async function clearGameState() {
    return await getJson('clear.php');
}

export async function getGameState() {
    return await getJson('get.php');
};

export async function saveGameState(stateObj) {
    // await sendFormData(stateObj);
    await sendJson(stateObj);
};