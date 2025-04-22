<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Compatibilidad extends Model
{
    use HasFactory;

    protected $table = 'compatibilidades';
    protected $fillable = ['producto_1_id', 'producto_2_id', 'tipo_relacion'];

    public function producto1()
    {
        return $this->belongsTo(Producto::class, 'producto_1_id');
    }

    public function producto2()
    {
        return $this->belongsTo(Producto::class, 'producto_2_id');
    }
}
