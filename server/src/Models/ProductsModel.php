<?php

namespace ScandiwebAPI\Models;

use ScandiwebAPI\Database;
use ScandiwebAPI\Controllers\ErrorController;

class ProductsModel
{
    protected $typeName;
    protected $conn;

    public function __construct()
    {
        $this->conn = Database::getConnection();
    }

    public function readAll()
    {
        $sql = 'SELECT products.id, products.sku,
            products.name, products.price, products.type,
            furniture.height, furniture.width, furniture.length,
            books.weight, dvd.size  
            FROM products
            LEFT JOIN furniture ON products.sku = furniture.sku
            LEFT JOIN books ON products.sku = books.sku
            LEFT JOIN dvd ON products.sku = dvd.sku ';
        $response = mysqli_query($this->conn, $sql);

        if (!$response) {
            ErrorController::run();
        }
        $res = [];

        if (mysqli_num_rows($response) > 0) {
            while ($row = mysqli_fetch_assoc($response)) {
                $res[] = $row;
            }
        }

        return $res;
    }

    public function readOne($sku)
    {
        $sql = "SELECT products.id, products.sku,
            products.name, products.price, products.type,
            furniture.height, furniture.width, furniture.length,
            books.weight, dvd.size  
            FROM products
            LEFT JOIN furniture ON products.sku = furniture.sku
            LEFT JOIN books ON products.sku = books.sku
            LEFT JOIN dvd ON products.sku = dvd.sku
            WHERE products.sku = '{$sku}'";
        $response = mysqli_query($this->conn, $sql);

        if (!$response) {
            ErrorController::run();
        }

        if (mysqli_num_rows($response)) {
            return mysqli_fetch_assoc($response);
        }

        return false;
    }

    public function deleteOneByID($sku)
    {
        $productType = $this->getType($sku);

        $this->conn->begin_transaction();

        try {
            $this->conn->query("DELETE FROM products WHERE sku = '{$sku}'");

            $this->conn->query("DELETE FROM $productType WHERE sku = '{$sku}'");

            $this->conn->commit();
        } catch (\Exception $e) {

            $this->conn->rollback();
            ErrorController::run();
        }
        return true;
    }

    protected function createOne()
    {
        return function ($secondSql) {
            $requestPayload = file_get_contents('php://input');
            ['name' => $name, 'price' => $price, 'sku' => $sku] = json_decode($requestPayload, true);
            
            $firstSql = "INSERT INTO products (sku, name, price, type) values ('{$sku}', '{$name}', {$price}, '{$this->typeName}')";

            $this->conn->begin_transaction();
            try {
        
                $response1 = $this->conn->query($firstSql);
                if (!$response1) { 
                    throw new \Exception(mysqli_error($this->conn)); 
                };

                $response2 = $this->conn->query($secondSql);
                if (!$response2) { 
                    throw new \Exception(mysqli_error($this->conn)); 
                };

                $this->conn->commit();
            } catch (\Exception $e) {
                $this->conn->rollback();
                ErrorController::run($e->getMessage());
            }

            return $sku;
        };
    }

    private function getType($sku)
    {
        $selectSql = "SELECT type FROM products WHERE sku = '{$sku}'";

        $result = mysqli_query($this->conn, $selectSql);

        if (!$result) {
            ErrorController::run();
        }

        $productType = '';

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $productType = $row['type'];
            }
        }

        return  $productType;
    }
}
