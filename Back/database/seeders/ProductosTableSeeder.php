<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Support\Facades\DB;

class ProductosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Eliminar los productos existentes
        Producto::truncate();
        DB::table('compatibilidades')->truncate();  // Truncar la tabla de compatibilidades también si es necesario

        // Habilitar nuevamente las restricciones de claves foráneas
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Crear categorías
        $categoria_componente = Categoria::create(['nombre' => 'Componentes', 'descripcion' => 'Componentes de ordenador']);
        $categoria_ordenador = Categoria::create(['nombre' => 'Ordenadores', 'descripcion' => 'Ordenadores completos']);
    
        // Insertar productos de componentes
        // Producto::create([
        //     'nombre' => 'Procesador Intel i7 12700K',
        //     'descripcion' => 'Procesador de alto rendimiento...',
        //     'precio' => 450,
        //     'tipo' => 'componente',
        //     'categoria_id' => $categoria_componente->id,
        //     'imagen_url' => 'ruta_imagen.jpg',
        // ]);
        
        // Producto::create([
        //     'nombre' => 'Tarjeta Gráfica NVIDIA RTX 3080',
        //     'descripcion' => 'Tarjeta gráfica de gama alta...',
        //     'precio' => 1200,
        //     'tipo' => 'componente',
        //     'categoria_id' => $categoria_componente->id,
        //     'imagen_url' => 'ruta_imagen.jpg',
        // ]);
    
        // Producto::create([
        //     'nombre' => 'Placa Base ASUS ROG Strix Z590-E',
        //     'descripcion' => 'Placa base de alta gama...',
        //     'precio' => 250,
        //     'tipo' => 'componente',
        //     'categoria_id' => $categoria_componente->id,
        //     'imagen_url' => 'ruta_imagen.jpg',
        // ]);
    
        // // Agrega más productos de componentes aquí...
    
        // // Insertar productos de ordenadores
        // Producto::create([
        //     'nombre' => 'PC Gaming Alienware Aurora R12',
        //     'descripcion' => 'PC gaming de alto rendimiento...',
        //     'precio' => 2500,
        //     'tipo' => 'ordenador',
        //     'categoria_id' => $categoria_ordenador->id,
        //     'imagen_url' => 'ruta_imagen.jpg',
        // ]);
    
        // Producto::create([
        //     'nombre' => 'PC de Oficina HP ProDesk 400 G7',
        //     'descripcion' => 'PC de oficina eficiente...',
        //     'precio' => 600,
        //     'tipo' => 'ordenador',
        //     'categoria_id' => $categoria_ordenador->id,
        //     'imagen_url' => 'ruta_imagen.jpg',
        // ]);
    
        // Producto::create([
        //     'nombre' => 'PC Gaming Corsair Vengeance i7200',
        //     'descripcion' => 'PC gaming con rendimiento excepcional...',
        //     'precio' => 1600,
        //     'tipo' => 'ordenador',
        //     'categoria_id' => $categoria_ordenador->id,
        //     'imagen_url' => 'ruta_imagen.jpg',
        // ]);

        // Componentes
        Producto::create([
            'nombre' => 'AMD Ryzen 7 7800X3D 4.2 GHz/5 GHz',
            'descripcion' => 'Procesador de alto rendimiento con 8 núcleos y 16 hilos, ideal para gaming y edición.',
            'precio' => '386.90',
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'componente1.png',
        ]);

        Producto::create([
            'nombre' => 'MSI MPG B550 GAMING PLUS',
            'descripcion' => 'Placa base con chipset B550, compatible con procesadores AMD Ryzen.',
            'precio' => '119.90',
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'componente2.png',
        ]);

        Producto::create([
            'nombre' => 'WD Black SN850X SSD 1TB M.2 2280 PCIe Gen4 NVMe',
            'descripcion' => 'Unidad SSD NVMe de 1TB, ideal para velocidad extrema y altas capacidades de almacenamiento.',
            'precio' => '85.98',
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'componente3.png',
        ]);

        Producto::create([
            'nombre' => 'WD Black SN850X SSD 2TB M.2 2280 PCIe Gen4 NVMe Heatsink',
            'descripcion' => 'SSD NVMe de 2TB con disipador de calor, ideal para gaming y tareas de alto rendimiento.',
            'precio' => '149.99',
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'componente4.png',
        ]);

        Producto::create([
            'nombre' => 'Tempest PSU PRO 650W 80+ Bronze Fuente de Alimentación',
            'descripcion' => 'Fuente de alimentación de 650W, certificación 80+ Bronze, adecuada para PCs gaming.',
            'precio' => '35.49',
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'componente5.png',
        ]);

        Producto::create([
            'nombre' => 'AMD Ryzen 7 5700X 3.4GHz Box sin Ventilador',
            'descripcion' => 'Procesador AMD Ryzen 7 con 8 núcleos, ideal para tareas multitarea y gaming.',
            'precio' => '178.90',
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'componente6.png',
        ]);

        Producto::create([
            'nombre' => 'Corsair RMe Series RM750e 750W 80 Plus Gold Modular',
            'descripcion' => 'Fuente de alimentación modular de 750W, con certificación 80 Plus Gold.',
            'precio' => '109.99',
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'componente7.png',
        ]);

        Producto::create([
            'nombre' => 'MSI GeForce RTX 4070 Ti GAMING X SLIM 12GB GDDR6X DLSS3',
            'descripcion' => 'Tarjeta gráfica RTX 4070 Ti con 12GB de GDDR6X, ideal para juegos de alta calidad y renderizado.',
            'precio' => '899.90',
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'componente8.png',
        ]);

        Producto::create([
            'nombre' => 'Forgeon Azoth 360 ARGB Kit de Refrigeración Líquida 360mm Negro',
            'descripcion' => 'Sistema de refrigeración líquida con iluminación ARGB, adecuado para altas temperaturas de procesadores.',
            'precio' => '105.49',
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'componente9.png',
        ]);

        Producto::create([
            'nombre' => 'MSI GeForce RTX 4060 Gaming X NV Edition 8GB GDDR6 DLSS3',
            'descripcion' => 'Tarjeta gráfica RTX 4060 Gaming con 8GB de GDDR6, ideal para gamers y creadores de contenido.',
            'precio' => '359.90',
            'tipo' => 'componente',
            'categoria_id' => $categoria_componente->id,
            'imagen_url' => 'componente10.png',
        ]);

        // Ordenadores
        Producto::create([
            'nombre' => 'HP 15S-eq2167ns AMD Ryzen 5 5500U/16GB/512GB SSD/15.6"',
            'descripcion' => 'Ordenador portátil con procesador AMD Ryzen 5, 16GB RAM y 512GB SSD.',
            'precio' => '469.00',
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ordenador1.png',
        ]);
        
        Producto::create([
            'nombre' => 'HP Victus 15-fa0053ns Intel Core i5-12450H/16GB/512GB SSD/RTX 3050/15.6"',
            'descripcion' => 'PC de gaming con procesador Intel i5, 16GB de RAM, 512GB SSD y RTX 3050.',
            'precio' => '679.00',
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ordenador2.png',
        ]);
    
        Producto::create([
            'nombre' => 'Acer Nitro V 15 ANV15-51-51PQ Intel Core i5-13420H/16GB/1TB SSD/RTX 3050/15.6"',
            'descripcion' => 'PC de alto rendimiento con Intel i5, 16GB de RAM, 1TB SSD y RTX 3050.',
            'precio' => '729.00',
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ordenador3.png',
        ]);
    
        Producto::create([
            'nombre' => 'MSI Pulse 17 B13VFK-687XES Intel Core i7-13700H/32GB/1TB SSD/RTX 4060/17.3"',
            'descripcion' => 'PC gaming con procesador Intel i7, 32GB RAM, 1TB SSD y RTX 4060.',
            'precio' => '1399.00',
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ordenador4.png',
        ]);
    
        Producto::create([
            'nombre' => 'ASUS Vivobook Go E1504FA-NJ642W AMD Ryzen 5 7520U/8GB/512GB SSD/Radeon 610M/15.6"',
            'descripcion' => 'Ordenador portátil con AMD Ryzen 5, 8GB de RAM y 512GB SSD.',
            'precio' => '429.00',
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ordenador5.png',
        ]);
    
        Producto::create([
            'nombre' => 'MSI MAG Infinite S3 13NUE-688EU i7-13700F/16GB/1TB SSD/RTX 4070',
            'descripcion' => 'PC de alto rendimiento con Intel i7, 16GB RAM, 1TB SSD y RTX 4070.',
            'precio' => '1699.00',
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ordenador6.png',
        ]);
    
        Producto::create([
            'nombre' => 'HP Slim Desktop S01-pF2027ns Intel Core i5-12400/8GB/256GB SSD',
            'descripcion' => 'PC de oficina compacto con Intel Core i5, 8GB RAM y 256GB SSD.',
            'precio' => '439.00',
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ordenador7.png',
        ]);
    
        Producto::create([
            'nombre' => 'ASUS U500MA-75700G0090 AMD Ryzen 7 5700G/16GB/512GB SSD',
            'descripcion' => 'PC portátil con AMD Ryzen 7, 16GB RAM y 512GB SSD.',
            'precio' => '549.00',
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ordenador8.png',
        ]);
    
        Producto::create([
            'nombre' => 'Medion Erazer Engineer P10 MD35338 Intel Core i5-12400F/16GB/512GB SSD/RTX 3060',
            'descripcion' => 'PC de gaming con procesador Intel i5, 16GB RAM, 512GB SSD y RTX 3060.',
            'precio' => '839.00',
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ordenador9.png',
        ]);
    
        Producto::create([
            'nombre' => 'MSI MAG Infinite S3 13NUC5-1212XES i7-13700F/16GB/1TB SSD/RTX 4060',
            'descripcion' => 'PC de alto rendimiento con Intel i7, 16GB RAM, 1TB SSD y RTX 4060.',
            'precio' => '1199.00',
            'tipo' => 'ordenador',
            'categoria_id' => $categoria_ordenador->id,
            'imagen_url' => 'ordenador10.png',
        ]);
    }
}
