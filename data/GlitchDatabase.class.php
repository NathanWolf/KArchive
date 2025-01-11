<?php

namespace com\elmakers\glitch;

use Exception;

require_once 'Database.class.php';

// This uses the same database as the glitch website, in case we ever want to merge them
class GlitchDatabase extends Database {

    public function getModels() {
        $models = $this->getAll('persona_model');
        return $this->index($models);
    }
}
