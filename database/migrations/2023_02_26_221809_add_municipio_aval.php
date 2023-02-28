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
        Schema::table('avales', function (Blueprint $table) {
            //
            $table->dropColumn('municipio');
            $table->unsignedBigInteger('municipio_id');
            $table->foreign('municipio_id')->references('idMunicipio')->on('municipios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('avales', function (Blueprint $table) {
            //
            $table->dropForeign('avales_municipio_id_foreign');
            $table->dropColumn('municipio_id');
            
            //$table->dropColumn('municipio');
        });
    }
};
