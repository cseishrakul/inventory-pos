<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    public const IMAGE_UPLOAD_PATH = 'images/uploads/brand/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/brand_thumb/';


    protected $fillable = ['name', 'slug', 'serial', 'status', 'description', 'logo', 'user_id'];

    final public function storeBrand(array $input)
    {
        self::query()->create($input);
    }


    final public function getAllBrands(array $input)
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();
        if (!empty($input['search'])) {
            $query->where('name', 'like', '%' . $input['search'] . '%');
        }

        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }

        return $query->with('user:id,name')->orderBy('serial', 'asc')->paginate($per_page);
    }


     public function user()
    {
        return $this->belongsTo(User::class);
    }
}
