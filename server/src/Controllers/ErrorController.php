<?php

namespace ScandiwebAPI\Controllers;

class ErrorController
{
    public static function run($statusCode = 404, $errorMsg = "Not found")
    {
        http_response_code($statusCode);
        print_r('{"status": false, "message": "' . $errorMsg . '"}');
        die();
    }
}
