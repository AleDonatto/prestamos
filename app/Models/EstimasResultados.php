<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Municipios;

class EstimasResultados extends Model
{
    use HasFactory;

    protected $table = 'estimas_resultados';
    protected $primaryKey = 'id';
    protected $appends = ['nombre_municipio'];


    public function getNombreMunicipioAttribute()
    {
        $muni = Municipios::where('idMunicipio', $this->idMunicipio)->get();

        if ($muni->count() > 0){
            return $muni[0]->nombreMunicipio;
        }

        return '';
    }

}
