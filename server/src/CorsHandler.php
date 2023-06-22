<?php

namespace ScandiwebAPI;


class CorsHandler
{
    /**
     * Handles preflight requests by setting the appropriate CORS headers
     */
    public static function handlePreflightRequest()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            $allowedOrigins = array(
                'http://scandiweb.doublethinker.pw',
                'http://www.scandiweb.doublethinker.pw'
            );
            $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

            if (in_array($origin, $allowedOrigins)) {
                header("Access-Control-Allow-Origin: $origin");
                header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
                header("Access-Control-Allow-Headers: Content-Type");
                header("Content-Length: 0");
                header("Content-Type: text/plain");
                exit();
            }
        }
    }

    /**
     * Sets the CORS headers for regular requests
     */
    public static function setCorsHeaders()
    {
        $allowedOrigins = array(
            'http://scandiweb.doublethinker.pw',
            'http://www.scandiweb.doublethinker.pw'
        );
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

        if (in_array($origin, $allowedOrigins)) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type");
            header('Content-type: application/json');
        }
    }
}
