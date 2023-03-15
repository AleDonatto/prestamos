<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('control_pagos', function (Blueprint $table) {
            $table->id();
            $table->double('monto', 10, 2);
            $table->integer('semana');
            $table->unsignedBigInteger('cliente_id');
            $table->unsignedBigInteger('credito_id');
            $table->date('fechaSemana');
            $table->date('fechaPago')->nullable();
            $table->date('deleted_at')->nullable();
            $table->foreign('cliente_id')->references('idCliente')->on('clientes');
            $table->foreign('credito_id')->references('idCredito')->on('creditos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('control_pagos');
    }
};
