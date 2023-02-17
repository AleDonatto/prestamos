<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aval extends Model
{
    use HasFactory;

    protected $table = 'avales';
    protected $primaryKey = 'idAval';

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
    ];

}
