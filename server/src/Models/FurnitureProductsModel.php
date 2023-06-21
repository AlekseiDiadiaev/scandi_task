<?php

namespace ScandiwebAPI\Models;

class FurnitureProductsModel extends ProductsModel
{
    protected $typeName = 'furniture';

    /**
     * Creates a new record in the products and furniture tables
     * @return string SKU value of the created record
     */
    public function createOne()
    {
        $requestPayload = file_get_contents('php://input');
        ['height' => $height, 'width' => $width, 'length' => $length, 'sku' => $sku] = json_decode($requestPayload, true);

        $secondSql = "INSERT INTO furniture (sku, height, width, length) values (?, ?, ?, ?)";

        $transaction = parent::createOne();

        return $transaction($secondSql, 'siii', [$sku, $height, $width, $length]);
    }
}
