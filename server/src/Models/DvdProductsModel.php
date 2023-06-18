<?php

namespace ScandiwebAPI\Models;

class DvdProductsModel extends ProductsModel
{
    protected $typeName = 'dvd';

    public function createOne()
    {   
        ['size' => $size, 'sku' => $sku] = $_POST;
        $secondSql = "INSERT INTO dvd (sku, size) values ('{$sku}', '{$size}')";

        $transaction = parent::createOne();
        return  $transaction($secondSql);
    }
}


