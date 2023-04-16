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
        Schema::create('estimas_resultados', function (Blueprint $table) {
            $table->id();

            $table->string('horario');
            $table->integer('idMunicipio');
            $table->integer('idEstimaSemana');
            $table->integer('dia');
            //150
            $table->integer('nPrimerPrestamo');
            $table->integer('montoPrimerPrestamo');
            //200
            $table->integer('nSegundoPrestamo');
            $table->integer('montoSegundoPrestamo');
            //250
            $table->integer('nTercerPrestamo');
            $table->integer('montoTercerPrestamo');
            //300
            $table->integer('nCuartoPrestamo');
            $table->integer('montoCuartoPrestamo');
            //350
            $table->integer('nQuintoPrestamo');
            $table->integer('montoQuintoPrestamo');
            //400
            $table->integer('nSextoPrestamo');
            $table->integer('montoSextoPrestamo');
            //450
            $table->integer('nSeptimoPrestamo');
            $table->integer('montoSeptimoPrestamo');
            //500
            $table->integer('nOctavoPrestamo');
            $table->integer('montoOctavoPrestamo');
            
            $table->integer('totalMonto');
            $table->integer('totalAbonos');
            
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
        Schema::dropIfExists('estimas_resultados');
    }
};
