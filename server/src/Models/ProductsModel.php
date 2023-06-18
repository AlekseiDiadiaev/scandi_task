<?php

namespace ScandiwebAPI\Models;

use ScandiwebAPI\Database;

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
        $result = mysqli_query($this->conn, $sql);

        if (!$result) {
            echo "Ошибка запроса: " . mysqli_error($this->conn);
        }
        $res = [];
    
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $res[] = $row;
            }
        } 
        
        return $res;
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
            return false;
        }
        return true;
    } 

    protected function createOne()
    {   
        return function($secondSql){
            ['name' => $name, 'price' => $price, 'sku' => $sku] = $_POST;
            $firstSql = "INSERT INTO products (sku, name, price, type) values ('{$sku}', '{$name}', {$price}, '{$this->typeName}')";

            $this->conn->begin_transaction();
            try {
                $this->conn->query($firstSql);

                $this->conn->query($secondSql);

                $this->conn->commit();

            } catch (\Exception $e) {
                $this->conn->rollback();
                return false;
            }
            return true;
        };
    }

    private function getType($sku)
    {
        $selectSql = "SELECT type FROM products WHERE sku = '{$sku}'";

        $result = mysqli_query($this->conn, $selectSql);
        
        if (!$result) {
            echo "Ошибка запроса: " . mysqli_error($this->conn);
            return false;
        }

        $productType = '';

        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $productType = $row['type'];
            }
        } 

        return  $productType;
    }
}


