<?php

namespace ScandiwebAPI;

use ScandiwebAPI\Controllers\ErrorController;

class Router
{
    private static $CONTROLLER_NAMESPACE = 'ScandiwebAPI\Controllers\\';

    /**
     * Runs the router to handle incoming requests
     */
    public static function run()
    {
        if (empty($_GET)) {
            ErrorController::run();
        }
        $method =  $_SERVER['REQUEST_METHOD'];
        $uri = trim($_GET['q'], '/');

        switch ($method) {
            case 'GET':
                self::routeGETMethod($uri);
            case 'POST':
                self::routePOSTMethod($uri);
            case 'DELETE':
                self::routeDELETEMethod($uri);
            default:
                ErrorController::run();
        }
    }

    /**
     * Routes the GET method request based on the URI
     * @param string $uri Request URI
     */
    private static function routeGETMethod($uri)
    {
        $segments = explode('/', $uri);

        $nameController = self::$CONTROLLER_NAMESPACE . ucfirst($segments[0]) .  'Controller';
        if (!class_exists($nameController)) {
            return;
        }

        $controller = new $nameController;

        if (count($segments) === 1) {
            $controller->readAll();
        }

        if (count($segments) === 2) {
            $controller->readOne($segments[1]);
        }

        if (count($segments) === 3 && $segments[1] === 'isunique') {
            $controller->checkUnique($segments[2]);
        }
    }

    /**
     * Routes the POST method request based on the URI
     * @param string $uri Request URI
     */
    private static function routePOSTMethod($uri)
    {
        $segments = explode('/', $uri);
        if (count($segments) < 2) return;

        $nameController = self::$CONTROLLER_NAMESPACE . ucfirst($segments[1]) . ucfirst($segments[0]) .  'Controller';
        if (!class_exists($nameController)) {
            return;
        }

        $controller = new $nameController;

        if (count($segments) === 2) {
            $controller->createOne();
        }
    }

    /**
     * Routes the DELETE method request based on the URI
     * @param string $uri Request URI
     */
    private static function routeDELETEMethod($uri)
    {
        $segments = explode('/', $uri);
        if (count($segments) === 1) return;

        $nameController = self::$CONTROLLER_NAMESPACE . ucfirst($segments[0]) .  'Controller';
        if (!class_exists($nameController)) {
            return;
        }

        $controller = new $nameController;

        if (count($segments) === 2) {
            $controller->deleteOneByID($segments[1]);
        }
    }
}
