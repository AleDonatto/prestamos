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
        Schema::create('aval', function (Blueprint $table) {
            $table->id('idAval');
            $table->string('nombre');
            $table->string('apellido_paterno');
            $table->string('apellido_materno');
            $table->string('curp');
            $table->string('telefono');
            $table->string('celular');
            $table->string('estado');
            $table->string('municipio');
            $table->string('poblado');
            $table->string('calle');
            $table->string('referencia');
            $table->string('garantias');
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
        Schema::dropIfExists('aval');
    }
};
