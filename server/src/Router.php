<?php

namespace ScandiwebAPI;

use ScandiwebAPI\Controllers\ErrorController;

class Router
{
    private static $CONTROLLER_NAMESPACE = 'ScandiwebAPI\Controllers\\';

    public static function run()
    {
        if (empty($_GET)) {
            self::routeError();
        }
        $method =  $_SERVER['REQUEST_METHOD'];
        $uri = trim($_GET['q'], '/');

        switch ($method) {
            case 'GET':
                if (!self::routeGETMethod($uri)) {
                    self::routeError();
                }
                break;
            case 'POST':
                if (!self::routePOSTMethod($uri)) {
                    self::routeError();
                }
                break;
            case 'DELETE':
                if (!self::routeDELETEMethod($uri)) {
                    self::routeError();
                }
                break;
        }
    }

    private static function routeGETMethod($uri)
    {
        $segments = explode('/', $uri);
        
        $nameController = self::$CONTROLLER_NAMESPACE . ucfirst($segments[0]) .  'Controller';
        if (!class_exists($nameController)) {
            return false;
        }

        $controller = new $nameController;
       

        if (count($segments) === 1) {
            $controller->readAll();
        } 
        return true;
    }

    private static function routePOSTMethod($uri)
    {
        $segments = explode('/', $uri);
        if (count($segments) === 1) return false;

        $nameController = self::$CONTROLLER_NAMESPACE . ucfirst($segments[1]) . ucfirst($segments[0]) .  'Controller';
        if (!class_exists($nameController)) {
            return false;
        }

        $controller = new $nameController;

        $controller->createOne();
        return true;
    }

    private static function routeDELETEMethod($uri)
    {
        $segments = explode('/', $uri);
        if (count($segments) === 1) return false;

        $nameController = self::$CONTROLLER_NAMESPACE . ucfirst($segments[0]) .  'Controller';
        if (!class_exists($nameController)) {
            return false;
        }

        $controller = new $nameController;
        $controller->deleteOneByID($segments[1]);

        return true;
    }

    private static function routeError()
    {
        ErrorController::run();
    }

}
