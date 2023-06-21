<?php

namespace ScandiwebAPI\Controllers;

use ScandiwebAPI\Models\ProductsModel;
use ScandiwebAPI\Controllers\ErrorController;

class ProductsController
{
    protected $MODELS_NAMESPACE = 'ScandiwebAPI\Models\\';
    protected $typeName;

    /**
     * Retrieves all records from the products table
     */
    final public function readAll()
    {
        $model = new ProductsModel;
        $result = $model->readAll();
        print_r(json_encode($result));
        die();
    }

    /**
     * Checks if a given SKU is unique in the products table
     * @param string $sku SKU value
     */
    final public function readOne($sku)
    {
        $model = new ProductsModel;
        $result = $model->readOne($sku);
        if (!$result) {
            ErrorController::run(404);
        } else {
            print_r(json_encode($result));
        }
        die();
    }

    /**
     * Checks if a given SKU is unique in the products table
     * @param string $sku SKU value
     */
    final public function checkUnique($sku)
    {
        $model = new ProductsModel;
        $result = $model->readOne($sku);
        if (!$result) {
            print_r('{"is_unique": true}');
        } else {
            print_r('{"is_unique": false}');
        }
        die();
    }

    /**
     * Creates a new product record
     */
    public function createOne()
    {
        if (!$this->typeName) {
            return;
        }
        $model = $this->getModel();

        $result = $model->createOne();
        if ($result) {
            http_response_code(201);
            print_r('{"status": true, "message": "Product created. SKU: ' . $result . '"}');
        };
        die();
    }

    /**
     * Deletes a product record based on SKU
     * @param string $sku SKU value
     */
    final public function deleteOneByID($sku)
    {
        $model = new ProductsModel;

        $result = $model->deleteOneByID($sku);
        if ($result) {
            http_response_code(200);
            print_r('{"status": true, "message": "Products ' . $result . ' deleted"}');
        };
        die();
    }

    /**
     * Returns an instance of the appropriate model based on the typeName property
     * @return \ProductsModel Instance of the corresponding model
     */
    private function getModel()
    {
        $modelName = $this->MODELS_NAMESPACE . ucfirst($this->typeName) . 'ProductsModel';
        return new $modelName;
    }
}
