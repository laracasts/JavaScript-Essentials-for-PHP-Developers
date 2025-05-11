<?php
session_start();

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

$input = null;

function castValues($data) {
    foreach ($data as $key => $value) {
        if (is_array($value)) {
            $data[$key] = castValues($value); // handle nested arrays
        } elseif (is_numeric($value)) {
            $data[$key] = $value + 0; // converts to int or float
        } elseif (is_string($value)) {
            // check if it's a recognizable boolean string
            $boolVal = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            $data[$key] = $boolVal ?? $value; // cast to bool if valid, else leave as string
        }
    }
    return $data;
}



// Handle JSON
if (stripos($contentType, 'application/json') === 0) {
    $input = file_get_contents('php://input');
} elseif (!empty($_POST)) {
    $input = json_encode(castValues($_POST));
} else {
    http_response_code(400);

    echo json_encode(['error' => 'No valid input provided']);

    exit;
}

// Save to session
$_SESSION['game'] = $input;

// Send response
echo json_encode(['status' => 'ok', 'stored' => $_SESSION['game']]);