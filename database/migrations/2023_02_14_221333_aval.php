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
        Schema::create('avales', function (Blueprint $table) {
            $table->id('idAval');
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
        Schema::dropIfExists('avales');
    }
};
