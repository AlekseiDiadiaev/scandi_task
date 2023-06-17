<?php

namespace ScandiwebAPI\Models;

use ScandiwebAPI\Database;

abstract class Model
{
    protected $typeName;
    private $conn;

    public function __construct()
    {
        $this->conn = Database::getConnection();
    }

    public function readAll()
    {   
        $sql = 'SELECT * FROM products';
        $result = mysqli_query($this->conn, $sql);

        if (!$result) {
            echo "Ошибка запроса: " . mysqli_error($this->conn);
        }
        $res = [];
    
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $res[] = $row;
            }
        } 
    
        mysqli_close($this->conn);
        print_r($res);
    }

    public function readOneByID($id)
    {
        echo 'read id' . $id . ' ' . $this->typeName;
    }  

    public function createOne($id)
    {
        echo 'create ' . $this->typeName;
    }

    public function deleteOneByID($id)
    {
        echo 'delete id' . $id . ' ' . $this->typeName;
    } 

    public function updateOneByID($id)
    {
        echo 'update id' . $id . ' ' . $this->typeName;
    }
}


