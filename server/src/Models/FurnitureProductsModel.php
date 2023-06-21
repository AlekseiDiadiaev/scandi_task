<?php

namespace ScandiwebAPI\Models;

class FurnitureProductsModel extends ProductsModel
{
    protected $typeName = 'furniture';

    public function createOne()
    {
        $requestPayload = file_get_contents('php://input');
        ['height' => $height, 'width' => $width, 'length' => $length, 'sku' => $sku] = json_decode($requestPayload, true);

        $secondSql = "INSERT INTO furniture (sku, height, width, length) values ('{$sku}', '{$height}', '{$width}', '{$length}')";

        $transaction = parent::createOne();
        return  $transaction($secondSql);
    }
}
