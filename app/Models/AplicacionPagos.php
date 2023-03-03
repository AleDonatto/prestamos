<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AplicacionPagos extends Model
{
    use HasFactory;

    protected $table = 'aplicacion_pagos';
    protected $primaryKey = 'id';

}
