<?php

namespace ScandiwebAPI;

class Database
{

    private static $HOST = "localhost";
    private static $DB_NAME = "scandiweb_api";
    private static $USERNAME = "root";
    private static $PASSWORD = "";

    public static function getConnection()
    {
        $conn = mysqli_connect(self::$HOST, self::$USERNAME, self::$PASSWORD, self::$DB_NAME);
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
      
        return $conn;
    }
}