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
        Schema::create('aplicacion_pagos', function (Blueprint $table) {
            $table->id();

            $table->integer('monto');
            $table->integer('plazo');
            $table->unsignedBigInteger('cliente_id');
            $table->foreign('cliente_id')->references('idCliente')->on('clientes');

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
        Schema::dropIfExists('aplicacion_pagos');
    }
};