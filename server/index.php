<?php
require './vendor/autoload.php';

use ScandiwebAPI\Router;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: json/application');

Router::run();
