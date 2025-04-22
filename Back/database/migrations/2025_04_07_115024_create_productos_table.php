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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();  // Crea una columna auto-incremental llamada id
            $table->string('nombre');  // Nombre del producto (e.g., "Intel i7 12700K")
            $table->text('descripcion');  // Descripción detallada del producto
            $table->decimal('precio', 10, 2);  // Precio del producto (con 2 decimales)
            $table->enum('tipo', ['componente', 'ordenador']);  // Tipo de producto (componente u ordenador)
            $table->string('imagen_url')->nullable();  // URL de la imagen del producto (opcional)
            $table->foreignId('categoria_id')->constrained()->onDelete('cascade');  // Relación con la tabla 'categorias'
            $table->timestamps();  // Crea las columnas created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
};
