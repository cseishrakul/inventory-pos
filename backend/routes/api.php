<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\SubCategoryController;
use App\Manager\ScriptManager;
use Illuminate\Support\Facades\Route;


// Route::get('test',[ScriptManager::class,'getLocationData']);

Route::get('divisions',[DivisionController::class,'index']);
Route::get('districts/{id}',[DistrictController::class,'index']);
Route::get('areas/{id}',[AreaController::class,'index']);


Route::post('login',[AuthController::class,'login']);

Route::group(['middleware'=>'auth:sanctum'],static function (){
    Route::post('logout',[AuthController::class,'logout']);

    // GetCategoryName&ID
    Route::get('get-category-list',[CategoryController::class,'get_category_list']);

    Route::apiResource('category',CategoryController::class);
    Route::apiResource('sub-category',SubCategoryController::class);
    Route::apiResource('brand',BrandController::class);
});