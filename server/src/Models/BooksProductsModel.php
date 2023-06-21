<?php

namespace ScandiwebAPI\Models;

class BooksProductsModel extends ProductsModel
{
    protected $typeName = 'books';

    public function createOne()
    {
        $requestPayload = file_get_contents('php://input');
        ['weight' => $weight, 'sku' => $sku] = json_decode($requestPayload, true);

        $secondSql = "INSERT INTO books (sku, weight) values ('{$sku}', '{$weight}')";

        $transaction = parent::createOne();
        return  $transaction($secondSql);
    }
}
