<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ControlPagos extends Model
{
    use HasFactory;

    protected $table = 'control_pagos';
    protected $primaryKey = 'id';
   
    protected $appends = ['status_pago'];

    /**
     * Pagado Verde
     * Pendiente Blanco
     * Vencido Rojo
     */
    public function getStatusPagoAttribute()
    {
        $fechaActual = date("Y-m-d");
        if( !is_null($this->fechaPago) ){
            return "pagado";
        }

        if($fechaActual > $this->fechaSemana ) {
            return "vencido";
        }

        return "pendiente";
    }

}
