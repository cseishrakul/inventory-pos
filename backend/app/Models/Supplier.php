<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = ['details', 'email', 'logo', 'name', 'phone', 'status', 'user_id'];

    const STATUS_ACTIVE = 1;
    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE_TEXT = 'Active';
    const STATUS_INACTIVE_TEXT = 'Inactive';

    const  LOGO_WIDTH = 800;
    const  LOGO_HEIGHT = 800;

    const  LOGO_THUMB_WIDTH = 200;
    const  LOGO_THUMB_HEIGHT = 200;

    const IMAGE_UPLOAD_PATH = 'images/uploads/supplier/';
    const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/supplier_thumb/';


    public function prepareData(array $input, $auth)
    {
        $supplier['details'] = $input['details'] ?? '';
        $supplier['email'] = $input['email'] ?? '';
        $supplier['name'] = $input['name'] ?? '';
        $supplier['phone'] = $input['phone'] ?? '';
        $supplier['status'] = $input['status'];
        $supplier['user_id'] = $auth->id();

        return $supplier;
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function getSupplierList($input)
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with('address', 'address.division:id,name', 'address.district:id,name', 'address.area:id,name', 'user:id,name');
        if (!empty($input['search'])) {
            $query->where('name', 'like', '%' . $input['search'] . '%')->orWhere('phone', 'like', '%' . $input['search'] . '%')->orWhere('email', 'like', '%' . $input['search'] . '%');
        }

        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }

        return $query->paginate($per_page);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
