<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::post('login',[AuthController::class,'login']);

Route::group(['middleware'=>'auth:sanctum'],static function (){
    Route::post('logout',[AuthController::class,'logout']);
    Route::apiResource('category',CategoryController::class);
});