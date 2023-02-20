<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ClientesController;
use App\Http\Controllers\FormatosController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/clientes', function () {
    return Inertia::render('Clientes');
})->middleware(['auth', 'verified'])->name('clientes');

Route::get('/grupos/list', [ClientesController::class, 'listGrupos'])->middleware(['auth', 'verified'])->name('listGrupos');
Route::post('/grupos/create', [ClientesController::class, 'createGrupos'])->middleware(['auth', 'verified'])->name('createGrupos');

Route::post('/clientes/create', [ClientesController::class, 'createClientes'])->middleware(['auth', 'verified'])->name('createCliente');
Route::get('/clientes/list', [ClientesController::class, 'listClientes'])->middleware(['auth', 'verified'])->name('listCliente');
Route::get('/clientes/edit/{id}', [ClientesController::class, 'viewEditCliente'])->middleware(['auth', 'verified'])->name('editCliente');

Route::post('/clientes/update/client', [ClientesController::class, 'updateDatosCliente'])->middleware(['auth', 'verified'])->name('updateCliente');
Route::post('/clientes/update/aval', [ClientesController::class, 'updateDatosAval'])->middleware(['auth', 'verified'])->name('updateAval');

Route::get('formatos/pagos', [FormatosController::class, 'formatoCobros'])->middleware(['auth', 'verified'])->name('formatoCobro');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
