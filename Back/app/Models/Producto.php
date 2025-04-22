<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';
    protected $fillable = ['nombre', 'descripcion', 'precio', 'tipo', 'categoria_id', 'imagen_url'];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function compatibilidades()
    {
        return $this->belongsToMany(Producto::class, 'compatibilidades', 'producto_1_id', 'producto_2_id');
    }
}