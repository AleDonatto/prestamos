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
            $table->string('nombre', 100);
            $table->string('apellido_paterno', 100);
            $table->string('apellido_materno', 100);
            $table->string('curp', 20);
            $table->string('telefono', 12);
            $table->string('celular', 12);
            $table->string('estado', 100);
            $table->string('municipio', 100);
            $table->string('poblado', 100);
            $table->string('calle', 100);
            $table->string('referencias', 100);
            $table->string('garantias', 100);
            //$table->string('plazos');
            //$table->string('monto');
            $table->date('diaAlta');
            $table->unsignedBigInteger('grupo_id');
            $table->foreign('grupo_id')->references('idGrupo')->on('grupos');
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
