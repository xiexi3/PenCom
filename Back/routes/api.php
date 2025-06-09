<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/cuenta', [AuthController::class, 'login']);
Route::post('/regenerate/code', [AuthController::class, 'regenerateCode']);
Route::post('/regenerate/password', [AuthController::class, 'regeneratePassword']);

// esto aqui de mientras sino no funca sin autorizacion
Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/productos', [ProductoController::class, 'store']);
    Route::put('/productos/{id}', [ProductoController::class, 'update']);
    Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::delete('/cart', [CartController::class, 'clear']);

    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);

    Route::get('/user-details', [AuthController::class, 'userDetails']);
    Route::put('/user/shipping-address', [AuthController::class, 'updateShippingAddress']);
    Route::post('/user/profile-picture', [AuthController::class, 'updateProfilePicture']);
    Route::get('/user/shipping-address', [UserController::class, 'getShippingAddress']);
    Route::post('/change-password', [UserController::class, 'changePassword']);

    //
});

Route::middleware(['auth:sanctum'])->get('/user-details', [AuthController::class, 'userDetails']);

// Route::middleware(['auth:sanctum', 'admin'])->group(function () {
//     Route::post('/productos', [ProductoController::class, 'store']);
//     Route::put('/productos/{id}', [ProductoController::class, 'update']);
//     Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);
// });