<?php

session_start();

header('Content-Type: application/json');

if (!isset($_GET['minRange'])) {
    echo json_encode(null);
} else {
    echo json_encode([
        'minRange' => (int)$_GET['minRange'],
        'maxRange' => (int)$_GET['maxRange'],
        'maxAttempts' => (int)$_GET['maxAttempts'],
        'allowDuplicateGuesses' => (bool)$_GET['allowDuplicateGuesses'],
        'secretNumber' => (int)$_GET['secretNumber'],
        'history' => []
    ]);
}
// echo json_encode([
//         'minRange' => 1,
//         'maxRange' => 20,
//         'maxAttempts' => 7,
//         'allowDuplicateGuesses' => false,
//         'secretNumber' => 15,
//         'history' =>  [1,10],
// ]);