<?php

namespace ScandiwebAPI;

require_once __DIR__.'/config/configDb.php';

class Database
{

    public static function getConnection()
    {
        $conn = mysqli_connect(HOST, USERNAME, PASSWORD, DB_NAME);
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
      
        return $conn;
    }
}