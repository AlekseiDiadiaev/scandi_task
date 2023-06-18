<?php

namespace ScandiwebAPI\Models;

class BooksProductsModel extends ProductsModel
{
    protected $typeName = 'books';

    public function createOne()
    {   
        ['weight' => $weight, 'sku' => $sku] = $_POST;
        $secondSql = "INSERT INTO books (sku, weight) values ('{$sku}', '{$weight}')";

        $transaction = parent::createOne();
        return  $transaction($secondSql);
    }

}


