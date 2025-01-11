<?php
header("Content-Type: application/json");
require_once 'GlitchDatabase.class.php';

try {
    $db = new \com\elmakers\glitch\GlitchDatabase();
    $models = $db->getModels();
    $response = array(
        'success' => true,
        'models' => $models
    );
} catch (Exception $ex) {
    $response = array(
        'success' => false,
        'message' => $ex->getMessage()
    );
}

echo json_encode($response);
