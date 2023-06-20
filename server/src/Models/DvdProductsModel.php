<?php

namespace ScandiwebAPI\Models;

class DvdProductsModel extends ProductsModel
{
    protected $typeName = 'dvd';

    public function createOne()
    {   
        $requestPayload = file_get_contents('php://input');
        ['size' => $size, 'sku' => $sku] = json_decode($requestPayload, true);
        $secondSql = "INSERT INTO dvd (sku, size) values ('{$sku}', '{$size}')";

        $transaction = parent::createOne();
        return  $transaction($secondSql);
    }
}


