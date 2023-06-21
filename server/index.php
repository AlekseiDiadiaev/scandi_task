<?php
require './vendor/autoload.php';

use ScandiwebAPI\Router;
use ScandiwebAPI\CorsHandler;

CorsHandler::handlePreflightRequest();
CorsHandler::setCorsHeaders();

Router::run();
