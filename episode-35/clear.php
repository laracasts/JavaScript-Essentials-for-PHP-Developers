<?php
session_start();
$_SESSION = [];


echo json_encode(['status' => 'ok', 'message' => 'Session cleared.']);
