<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MunicipiosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $municipios = [
            ['nombreMunicipio' => 'El Pericon'],
            ['nombreMunicipio' => 'Las Animas'],
            ['nombreMunicipio' => 'Huamachapa'],
            ['nombreMunicipio' => 'Los Saucitos'],
            ['nombreMunicipio' => 'Perota Seca'],
            ['nombreMunicipio' => 'El Carrizo'],
            ['nombreMunicipio' => 'San Francisco'],
            ['nombreMunicipio' => 'Tacunapa Centro'],
            ['nombreMunicipio' => 'Tacunapa'],
            ['nombreMunicipio' => 'Mexcaltepec'],
            ['nombreMunicipio' => 'Buena Vista'],
            ['nombreMunicipio' => 'Laguinilla'],
            ['nombreMunicipio' => 'Colotepec'],
            ['nombreMunicipio' => 'Cruz Quemada'],
            ['nombreMunicipio' => 'Tamarindo'],
            ['nombreMunicipio' => 'San Jose la Hacienda'],
            ['nombreMunicipio' => 'Ayutla 1'],
            ['nombreMunicipio' => 'Ayutla 2'],
            ['nombreMunicipio' => 'Pozolapa'],
            ['nombreMunicipio' => 'Tonala 1'],
            ['nombreMunicipio' => 'Tonala 2'],
            ['nombreMunicipio' => 'La Union'],
            ['nombreMunicipio' => 'El Guineo'],
            ['nombreMunicipio' => 'Zapote'],
            ['nombreMunicipio' => 'Tlachimala'],
            ['nombreMunicipio' => 'Azuzuca'],
            ['nombreMunicipio' => 'Las Isletas'],
            ['nombreMunicipio' => 'Colorada'],
            ['nombreMunicipio' => 'Ocotito'],
            ['nombreMunicipio' => 'Mazitan'],
            ['nombreMunicipio' => 'Palo Blanco'],
            ['nombreMunicipio' => 'Acahuizatla'],

        ];

        DB::table('municipios')->insert($municipios);
    }
}
