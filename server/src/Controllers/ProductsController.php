<?php

namespace ScandiwebAPI\Controllers;

use ScandiwebAPI\Models\ProductsModel;

class ProductsController
{
    protected $MODELS_NAMESPACE = 'ScandiwebAPI\Models\\';
    protected $typeName;

    final public function readAll()
    {
        $model = new ProductsModel;
        $res = $model->readAll();
        $filteredRes = array_map(function ($item) {
            return array_filter($item, function ($value) {
                return !is_null($value);
            });
        }, $res);
        print_r(json_encode($filteredRes));
    }

    final public function readOne($sku)
    {
        $model = new ProductsModel;
        $res = $model->readOne($sku);
        if (!$res) {
            print_r('[]');;
        } else {
            $filteredRes = array_filter($res, function ($value) {
                return !is_null($value);
            });

            print_r(json_encode($filteredRes));
        }
    }

    final public function checkUnique($sku)
    {
        $model = new ProductsModel;
        $res = $model->readOne($sku);
        if (!$res) {
            print_r('{"is_unique": true}');
        } else {
            print_r('{"is_unique": false}');
        }
    }

    public function createOne()
    {
        if (!$this->typeName) {
            return;
        }
        $model = $this->getModel();

        $res = $model->createOne();
        if ($res) {
            http_response_code(201);
            print_r('{"status": true, "message": "Product created. SKU: '. $res .'"}');
        };
    }

    final public function deleteOneByID($sku)
    {
        $model = new ProductsModel;

        $res = $model->deleteOneByID($sku);
        if ($res) {
            http_response_code(200);
            print_r('{"status": true, "message": "Products deleted"}');
        };
    }

    private function getModel()
    {
        $nameModel = $this->MODELS_NAMESPACE . ucfirst($this->typeName) . 'ProductsModel';
        return new $nameModel;
    }
}
