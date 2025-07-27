<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = ['name', 'slug', 'serial', 'status', 'description', 'image', 'user_id'];

    final public function storeCategory(array $input)
    {
        self::query()->create($input);
    }
}
