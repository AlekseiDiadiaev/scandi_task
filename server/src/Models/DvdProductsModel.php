<?php

namespace ScandiwebAPI\Models;

class DvdProductsModel extends ProductsModel
{
    protected $typeName = 'dvd';

    /**
     * Creates a new record in the products and dvd tables
     * @return string SKU value of the created record
     */
    public function createOne()
    {
        $requestPayload = file_get_contents('php://input');
        ['size' => $size, 'sku' => $sku] = json_decode($requestPayload, true);
        $secondSql = "INSERT INTO dvd (sku, size) values (?, ?)";

        $transaction = parent::createOne();

        return $transaction($secondSql, 'si', [$sku, $size]);
    }
}
