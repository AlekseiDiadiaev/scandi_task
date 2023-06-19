<?php

namespace ScandiwebAPI\Controllers;

class ErrorController 
{
    public static function run($errorMsg = "Not found") {
        http_response_code(404);
        print_r('{"status": false, "message": "' . $errorMsg . '"}');   
        die();
    }
}


