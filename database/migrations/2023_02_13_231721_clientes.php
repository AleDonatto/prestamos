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
        Schema::create('clientes', function (Blueprint $table) {
            $table->id('idCliente');
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
            $table->string('refrencias');
            $table->string('garantias');
            //$table->string('plazos');
            //$table->string('monto');
            $table->date('diaAlta');
            $table->unsignedBigInteger('grupo_id');
            $table->foreign('grupo_id')->references('idGrupos')->on('grupos');
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
        Schema::dropIfExists('clientes');
    }
};
