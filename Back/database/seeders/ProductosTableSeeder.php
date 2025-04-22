<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\Categoria;

class ProductosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear categorías
        $categoria_componente = Categoria::create(['nombre' => 'Componentes', 'descripcion' => 'Componentes de ordenador']);
        $categoria_ordenador = Categoria::create(['nombre' => 'Ordenadores', 'descripcion' => 'Ordenadores completos']);
    
        // Insertar productos de componentes
        Producto::create([
            'nombre' => 'Procesador Intel i7 12700K',
            'descripcion' => 'Procesador de alto rendimiento...',
            'precio' => 450,
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'ruta_imagen.jpg',
        ]);
        
        Producto::create([
            'nombre' => 'Tarjeta Gráfica NVIDIA RTX 3080',
            'descripcion' => 'Tarjeta gráfica de gama alta...',
            'precio' => 1200,
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'ruta_imagen.jpg',
        ]);
    
        Producto::create([
            'nombre' => 'Placa Base ASUS ROG Strix Z590-E',
            'descripcion' => 'Placa base de alta gama...',
            'precio' => 250,
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'ruta_imagen.jpg',
        ]);
    
        // Agrega más productos de componentes aquí...
    
        // Insertar productos de ordenadores
        Producto::create([
            'nombre' => 'PC Gaming Alienware Aurora R12',
            'descripcion' => 'PC gaming de alto rendimiento...',
            'precio' => 2500,
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ruta_imagen.jpg',
        ]);
    
        Producto::create([
            'nombre' => 'PC de Oficina HP ProDesk 400 G7',
            'descripcion' => 'PC de oficina eficiente...',
            'precio' => 600,
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ruta_imagen.jpg',
        ]);
    
        Producto::create([
            'nombre' => 'PC Gaming Corsair Vengeance i7200',
            'descripcion' => 'PC gaming con rendimiento excepcional...',
            'precio' => 1600,
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ruta_imagen.jpg',
        ]);
    }
}
