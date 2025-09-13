<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = ['details','email','logo','name','phone','status','user_id'];

    const STATUS_ACTIVE = 1;
    const STATUS_INACTIVE = 0;

    const  LOGO_WIDTH = 800;
    const  LOGO_HEIGHT = 800;

    const  LOGO_THUMB_WIDTH = 200;
    const  LOGO_THUMB_HEIGHT = 200;

    const IMAGE_UPLOAD_PATH = 'images/uploads/supplier/';
    const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/supplier_thumb/';


    public function prepareData(array $input,$auth){
        $supplier['details'] = $input['details'] ?? '';
        $supplier['email'] = $input['email'] ?? '';
        $supplier['name'] = $input['name'] ?? '';
        $supplier['phone'] = $input['phone'] ?? '';
        $supplier['status'] = $input['status'];
        $supplier['user_id'] = $auth->id();

        return $supplier;
    }

    public function address(){
        return $this->morphOne(Address::class,'addressable');
    }

}
