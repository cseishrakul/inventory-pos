<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PDO;

class SubCategory extends Model
{
    use HasFactory;
    public const IMAGE_UPLOAD_PATH = 'images/uploads/subcategory/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/subcategory_thumb/';

    protected $fillable = ['category_id', 'name', 'slug', 'serial', 'status', 'description', 'image', 'user_id'];

    final public function storeSubCategory(array $input)
    {
        return self::query()->create($input);
    }

    final public function getAllSubCategories(array $input){
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();
        if(!empty($input['search'])){
            $query->where('name','like','%'.$input['search'].'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'],$input['direction']??'asc');
        }

        return $query->with('user:id,name','category:id,name')->paginate($per_page);
    }


    final public function user(){
        return $this->belongsTo(User::class);
    }

    final public function category(){
        return $this->belongsTo(Category::class);
    }
}
