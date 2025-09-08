<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use Illuminate\Support\Facades\Route;

Route::post('login',[AuthController::class,'login']);

Route::group(['middleware'=>'auth:sanctum'],static function (){
    Route::post('logout',[AuthController::class,'logout']);

    // GetCategoryName&ID
    Route::get('get-category-list',[CategoryController::class,'get_category_list']);

    Route::apiResource('category',CategoryController::class);
    Route::apiResource('sub-category',SubCategoryController::class);
});