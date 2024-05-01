<?php

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;
use App\Http\Controllers\postController;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;

Route::get('/', function () {
    return view('welcome');
});



Route::get('/list', [userController::class, 'list']) ->middleware(\App\Http\Middleware\CorsMiddleware::class);
Route::post('/create', [userController::class, 'create'])->middleware(\App\Http\Middleware\CorsMiddleware::class);
Route::put('/update/{id}', [userController::class, 'update']) ->middleware(\App\Http\Middleware\CorsMiddleware::class);
Route::delete('/delete/{id}', [userController::class, 'delete']) ->middleware(\App\Http\Middleware\CorsMiddleware::class);

Route::post('/data', [userController::class, 'datos']) ->middleware(\App\Http\Middleware\CorsMiddleware::class);

//pruebas

// crear la ruta para el metodo create con el controlador userController
// Route::post('/create', function () {
    
// }) ->middleware(\App\Http\Middleware\CorsMiddleware::class);

// Route::get('/update/{id}', [userController::class, 'update']);


// Route::get('/create', [postController::class, 'create']);


