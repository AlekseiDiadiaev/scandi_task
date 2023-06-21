<?php

namespace ScandiwebAPI;

use Exception;
use ScandiwebAPI\Controllers\ErrorController;

require_once __DIR__ . '/config/configDb.php';

class Database
{

    /**
     * Establishes a database connection
     * @return \mysqli Database connection object
     */
    public static function getConnection()
    {
        $conn = mysqli_connect(HOST, USERNAME, PASSWORD, DB_NAME);
        if (!$conn) {
            ErrorController::run(500, mysqli_connect_error());
        }

        return $conn;
    }

    /**
     * Executes a prepared statement with provided SQL, types, and arguments
     * @param \mysqli $conn Database connection object
     * @param string $sql SQL query
     * @param string $types String representing the types of the arguments
     * @param array $arguments Array of arguments for the prepared statement
     * @return \mysqli_stmt|false Prepared statement object or false on failure
     * @throws \Exception if an error occurs during statement execution
     */
    public static function executeStmt($conn, $sql, $types, $arguments)
    {
        try {
            $stmt = $conn->prepare($sql);
            $stmt->bind_param($types, ...$arguments);
            $stmt->execute();
            return $stmt;
        } catch (\Throwable  $e) {
            // ErrorController::run();
            throw new \Exception($e->getMessage());
        }
    }
}
