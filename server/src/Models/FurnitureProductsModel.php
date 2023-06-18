<?php

namespace ScandiwebAPI\Models;

class FurnitureProductsModel extends ProductsModel
{
    protected $typeName = 'furniture';

    public function createOne()
    {   
        ['height' => $height, 'width' => $width, 'length' => $length, 'sku' => $sku] = $_POST;
        $secondSql = "INSERT INTO furniture (sku, height, width, length) values ('{$sku}', '{$height}', '{$width}', '{$length}')";

        $transaction = parent::createOne();
        return  $transaction($secondSql);
    }
}


