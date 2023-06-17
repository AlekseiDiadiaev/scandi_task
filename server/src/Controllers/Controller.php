<?php

namespace ScandiwebAPI\Controllers;

abstract class Controller
{
    protected $typeName;
    protected $MODELS_NAMESPACE = 'ScandiwebAPI\Models\\';

    public function readAll()
    {
        $model = $this->getModel();
        $model->readAll();
    }

    public function readOneByID($id)
    {
        $model = $this->getModel();
        $model->readOneByID($id);
    }  

    public function createOne($id)
    {
        $model = $this->getModel();
        $model->createOne($id);
    }

    public function deleteOneByID($id)
    {
        $model = $this->getModel();
        $model->deleteOneByID($id);
    } 

    public function updateOneByID($id)
    {
        $model = $this->getModel();
        $model->updateOneByID($id);
    }

    private function getModel()
    {
        $nameModel = $this->MODELS_NAMESPACE . $this->typeName . 'Model';
        
        return new $nameModel;
    }
     
}



