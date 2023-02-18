<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'clientes';
    protected $primaryKey = 'idCliente';

    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'curp', 
        'telefono', 
        'celular',
        'estado', 
        'municipio',
        'poblado', 
        'calle', 
        'referencias',
        'garantias',
        //'plazos', 
        //'monto', 
        'diaAlta',
        'grupo_id'
    ];
}
