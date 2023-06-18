<?php

namespace ScandiwebAPI\Controllers;

class ErrorController 
{
    public static function run() {
        http_response_code(404);
        print_r('{"status": false, "message": "Not found"}');   
        die();
    }
}


