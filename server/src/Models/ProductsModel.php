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

    /**
     * Reads all records from the products table
     * @return array Array with data of the records
     */
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
            ErrorController::run(500, mysqli_error($this->conn));
        }

        $result = [];
        if (mysqli_num_rows($response) > 0) {
            while ($row = mysqli_fetch_assoc($response)) {
                $result[] = $row;
            }
        }

        $filteredResult = array_map(function ($item) {
            return array_filter($item, function ($value) {
                return !is_null($value);
            });
        }, $result);

        return $filteredResult;
    }

     /**
     * Reads a single record from the products table based on SKU
     * @param string $sku SKU value
     * @return array|false Array with data of the record or false if not found
     */
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
            ErrorController::run(500, mysqli_error($this->conn));
        }

        if (mysqli_num_rows($response)) {
            $result = mysqli_fetch_assoc($response);
            return array_filter($result, function ($value) {
                return !is_null($value);
            });
        }

        return false;
    }

    /**
     * Deletes a single record from the products table based on SKU
     * @param string $sku SKU value
     * @return string SKU value of the deleted record
     */
    public function deleteOneByID($sku)
    {
        $productType = $this->getType($sku);

        $this->conn->begin_transaction();

        try {
            $response1 = $this->conn->query("DELETE FROM products WHERE sku = '{$sku}'");
            if (!$response1) {
                throw new \Exception(mysqli_error($this->conn));
            };

            $response2 = $this->conn->query("DELETE FROM $productType WHERE sku = '{$sku}'");
            if (!$response2) {
                throw new \Exception(mysqli_error($this->conn));
            };

            $this->conn->commit();
        } catch (\Exception $e) {

            $this->conn->rollback();
            ErrorController::run(404, $e->getMessage());
        }
        return $sku;
    }
    
     /**
     * Creates a new record in the products table
     * @param string $secondSql The second SQL query
     * @return Closure Anonymous function to handle the creation of a record
     */
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
                ErrorController::run(404, $e->getMessage());
            }

            return $sku;
        };
    }

    private function getType($sku)
    {
        $selectSql = "SELECT type FROM products WHERE sku = '{$sku}'";

        $result = mysqli_query($this->conn, $selectSql);

        if (!$result) {
            ErrorController::run(500, mysqli_error($this->conn));
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
