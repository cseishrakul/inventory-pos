<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('login',[AuthController::class,'login']);

Route::group(['middleware'=>'auth:sanctum'],static function (){
    Route::post('logout',[AuthController::class,'logout']);
});