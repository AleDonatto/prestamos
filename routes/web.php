<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ClientesController;
use App\Http\Controllers\CreditosController;
use App\Http\Controllers\AplicacionPagosController;
use App\Http\Controllers\FormatosController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\GruposController;
use App\Http\Controllers\ControlPagoController;
use App\Http\Controllers\CarteraVencidaController;
use App\Http\Controllers\EstimasController;

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
    return Inertia::render('Auth/Login', [
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

Route::get('/carteraFinalizada', function () {
    return Inertia::render('CarteraFinalizada');
})->middleware(['auth', 'verified'])->name('carteraFinalizada');


Route::get('/carteraVencida', function () {
    return Inertia::render('CarteraVencida');
})->middleware(['auth', 'verified'])->name('carteraVencida');

Route::get('/pruebas', function (){
    return Inertia::render('Pruebas');
})->middleware(['auth', 'verified'])->name('pruebas');


Route::get('/grupos/list', [ClientesController::class, 'listGrupos'])->middleware(['auth', 'verified'])->name('listGrupos');
Route::post('/grupos/create', [ClientesController::class, 'createGrupos'])->middleware(['auth', 'verified'])->name('createGrupos');
Route::get('/grupos-show/{nombre}', [ClientesController::class, 'showGrupo'])->middleware(['auth', 'verified'])->name('showGrupo');

Route::post('/clientes/create', [ClientesController::class, 'createClientes'])->middleware(['auth', 'verified'])->name('createCliente');
Route::get('/clientes/list', [ClientesController::class, 'listClientes'])->middleware(['auth', 'verified'])->name('listCliente');
Route::get('/clientes/edit/{id}', [ClientesController::class, 'viewEditCliente'])->middleware(['auth', 'verified'])->name('editCliente');
Route::post('/clientes/params', [ClientesController::class, 'consDynamicClients'])->middleware(['auth', 'verified'])->name('clientsParams');
Route::post('/clientes-registrar-renovacion', [ClientesController::class, 'renovarCliente'])->middleware(['auth', 'verified'])->name('renovarCliente');
Route::get('/cliente/credito/{id}', [ClientesController::class, 'getCreditoCliente'])->middleware(['auth', 'verified'])->name('creditoCliente');

Route::post('/clientes/update/client', [ClientesController::class, 'updateDatosCliente'])->middleware(['auth', 'verified'])->name('updateCliente');
Route::post('/clientes/update/aval', [ClientesController::class, 'updateDatosAval'])->middleware(['auth', 'verified'])->name('updateAval');
Route::get('/clientes-edit/{id}', [ClientesController::class, 'editCliente'])->middleware(['auth', 'verified'])->name('editClienteAPI');

Route::get('/clients/delete/{id}', [ClientesController::class, 'deleteClient'])->middleware(['auth','verified'])->name('deleteClient');

Route::get('/municipios', [MunicipioController::class, 'viewMunicipios'])->middleware(['auth', 'verified'])->name('viewMunicipios');
Route::get('/municipios/list', [MunicipioController::class, 'listMunicipios'])->middleware(['auth', 'verified'])->name('listMunicipios');
Route::post('/municipios/create', [MunicipioController::class, 'createMunicipios'])->middleware(['auth', 'verified'])->name('createMunicipios');
Route::post('/municipios/edit', [MunicipioController::class, 'editMunicipios'])->middleware(['auth', 'verified'])->name('editMunicipios');
Route::post('/municipios/delete', [MunicipioController::class, 'deleteMunicpio'])->middleware(['auth', 'verified'])->name('deleteMunicipio');

Route::get('/grupos', [GruposController::class, 'viewGrupos'])->middleware(['auth', 'verified'])->name('viewGrupos');
Route::post('/grupos/delete', [GruposController::class, 'deleteGrupos'])->middleware(['auth', 'verified'])->name('deleteGrupos');
Route::post('/grupos/edit', [GruposController::class, 'editGrupos'])->middleware(['auth', 'verified'])->name('editGrupos');

Route::get('formatos/pagos', [FormatosController::class, 'formatoCobros'])->middleware(['auth', 'verified'])->name('formatoCobro');


Route::post('/creditos', [CreditosController::class, 'index'])->middleware(['auth', 'verified'])->name('creditosIndex');
Route::post('/aplicar-pagos', [AplicacionPagosController::class, 'store'])->middleware(['auth', 'verified'])->name('aplicarPagosStore');
Route::post('/aplicar-pagos-get-by-client', [AplicacionPagosController::class, 'getPagos'])->middleware(['auth', 'verified'])->name('aplicarPagosGetPagos');
Route::post('/aplicar-pagos-delete', [AplicacionPagosController::class, 'delete'])->middleware(['auth', 'verified'])->name('aplicarPagosDelete');
Route::post('/aplicar-pagos-pdf', [AplicacionPagosController::class, 'reportePdfVista1'])->middleware(['auth', 'verified'])->name('aplicarPagosReportePdfVista1');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::get('/generar-control-pago/{idCliente}', [ControlPagoController::class, 'generacion'])->middleware(['auth', 'verified'])->name('generarControlPagos');
Route::get('/generar-control-pago/{idCliente}', [ControlPagoController::class, 'generacion'])->name('generarControlPagos');
Route::get('/generar-control-pago', [ControlPagoController::class, 'generacionTodosClientes'])->name('generarTodosClientes');
Route::get('/mostrar-control-pago/{idCliente}', [ControlPagoController::class, 'controlPorCliente'])->name('controlPorCliente');
Route::delete('/control-pagos-delete/{id}', [ControlPagoController::class, 'eliminarPago'])->name('eliminarPago');
Route::post('/realizar-control-pagos', [ControlPagoController::class, 'realizarPago'])->name('realizarPago');
Route::post('/control-pagos-lista', [ControlPagoController::class, 'index'])->middleware(['auth', 'verified'])->name('controlPagosIndex');

Route::get('/cartera-vencida', [CarteraVencidaController::class, 'index'])->name('carteraVencidaIndex');
Route::get('/cartera-vencida-reporte', [CarteraVencidaController::class, 'reporteExcel'])->name('carteraVencidaReporte');
Route::post('/cartera-vencida-municipio', [CarteraVencidaController::class, 'indexByMunicipio'])->name('carteraVencidaReporteByMunicipio');
Route::get('/cartera-vencida-reporte-municipio/{idMunicipio}', [CarteraVencidaController::class, 'reporteExcelIdMunicipio'])->name('reporteExcelIdMunicipio');

Route::get('/estimas/edit/{id}/dia/{dia}', [EstimasController::class, 'viewGetEstima'])->middleware(['auth', 'verified'])->name('viewGetEstima');
Route::post('/estimas', [EstimasController::class, 'getEstimas'])->middleware(['auth', 'verified'])->name('getEstimas');
Route::post('/estimas-generate', [EstimasController::class, 'generarEstimas'])->middleware(['auth', 'verified'])->name('generarEstimas');
Route::post('/estimas-guardar', [EstimasController::class, 'guardarResultadoEstimas'])->middleware(['auth', 'verified'])->name('guardarResultadoEstimas');
Route::post('/estimas-get-dia', [EstimasController::class, 'getEstimasDeSemanaPorDia'])->middleware(['auth', 'verified'])->name('getEstimasDeSemanaPorDia');
Route::get('/estimas-res-delete/{id}', [EstimasController::class, 'deleteEstimaResultados'])->middleware(['auth', 'verified'])->name('deleteEstimaResultados');
Route::post('/estimas-semana-pdf', [EstimasController::class, 'generarEstimaPDF'])->middleware(['auth', 'verified'])->name('deleteEstimaResultados');
Route::post('/estimas-editar', [EstimasController::class, 'editarResultadoEstimas'])->middleware(['auth', 'verified'])->name('guardarResultadoEstimas');


require __DIR__.'/auth.php';
