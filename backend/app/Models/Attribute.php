<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Attribute extends Model
{
    /** @use HasFactory<\Database\Factories\AttributeFactory> */
    use HasFactory;
    protected $fillable = ['name','status','user_id'];

    public function getAttributeList(){
        return self::query()->with(['user','value','value.user:id,name'])->orderBy('updated_at','desc')->paginate(50);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function value(){
        return $this->hasMany(AttributeValue::class);
    }
}
