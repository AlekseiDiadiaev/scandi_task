<?php

namespace ScandiwebAPI\Models;

class BooksProductsModel extends ProductsModel
{
    protected $typeName = 'books';

    /**
     * Creates a new record in the products and books tables
     * @return string SKU value of the created record
     */
    public function createOne()
    {
        $requestPayload = file_get_contents('php://input');
        ['weight' => $weight, 'sku' => $sku] = json_decode($requestPayload, true);

        $secondSql = "INSERT INTO books (sku, weight) values (?, ?)";

        $transaction = parent::createOne();

        return $transaction($secondSql, 'sd', [$sku, $weight]);
    }
}
