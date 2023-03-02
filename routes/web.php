<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ClientesController;
use App\Http\Controllers\CreditosController;
use App\Http\Controllers\FormatosController;
use App\Http\Controllers\MunicipioController;

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

Route::get('/aplicacionPagos', function () {
    return Inertia::render('AplicacionPagos');
})->middleware(['auth', 'verified'])->name('aplicacionPagos');


Route::get('/grupos/list', [ClientesController::class, 'listGrupos'])->middleware(['auth', 'verified'])->name('listGrupos');
Route::post('/grupos/create', [ClientesController::class, 'createGrupos'])->middleware(['auth', 'verified'])->name('createGrupos');

Route::post('/clientes/create', [ClientesController::class, 'createClientes'])->middleware(['auth', 'verified'])->name('createCliente');
Route::get('/clientes/list', [ClientesController::class, 'listClientes'])->middleware(['auth', 'verified'])->name('listCliente');
Route::get('/clientes/edit/{id}', [ClientesController::class, 'viewEditCliente'])->middleware(['auth', 'verified'])->name('editCliente');
Route::post('/clientes/params', [ClientesController::class, 'consDynamicClients'])->middleware(['auth', 'verified'])->name('clientsParams');

Route::post('/clientes/update/client', [ClientesController::class, 'updateDatosCliente'])->middleware(['auth', 'verified'])->name('updateCliente');
Route::post('/clientes/update/aval', [ClientesController::class, 'updateDatosAval'])->middleware(['auth', 'verified'])->name('updateAval');

Route::get('/municipios', [MunicipioController::class, 'viewMunicipios'])->middleware(['auth', 'verified'])->name('viewMunicipios');
Route::get('/municipios/list', [MunicipioController::class, 'listMunicipios'])->middleware(['auth', 'verified'])->name('listMunicipios');
Route::post('/municipios/create', [MunicipioController::class, 'createMunicipios'])->middleware(['auth', 'verified'])->name('createMunicipios');
Route::post('/municipios/edit', [MunicipioController::class, 'editMunicipios'])->middleware(['auth', 'verified'])->name('editMunicipios');

Route::get('formatos/pagos', [FormatosController::class, 'formatoCobros'])->middleware(['auth', 'verified'])->name('formatoCobro');



Route::post('/aplicar-pagos', [AplicacionPagosController::class, 'store'])->middleware(['auth', 'verified'])->name('aplicarPagosStore');
Route::get('/creditos', [CreditosController::class, 'index'])->middleware(['auth', 'verified'])->name('creditosIndex');
// Route::get('/creditos', [CreditosController::class, 'index'])->middleware(['auth', 'verified'])->name('creditosIndex');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';
