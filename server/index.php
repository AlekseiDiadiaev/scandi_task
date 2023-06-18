<?php
require './vendor/autoload.php';

use ScandiwebAPI\Router;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: json/application');

Router::run();

