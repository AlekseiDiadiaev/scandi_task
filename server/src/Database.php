<?php

namespace ScandiwebAPI;

use ScandiwebAPI\Controllers\ErrorController;

require_once __DIR__.'/config/configDb.php';

class Database
{

    public static function getConnection()
    {
        $conn = mysqli_connect(HOST, USERNAME, PASSWORD, DB_NAME);
        if (!$conn) {
            ErrorController::run(500, mysqli_connect_error());
        }
      
        return $conn;
    }
}