<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['game'])) {
    echo $_SESSION['game'];
} else {
    echo json_encode(null);
}