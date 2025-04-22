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
        Schema::create('categorias', function (Blueprint $table) {
            $table->id();  // Crea una columna auto-incremental llamada id
            $table->string('nombre');  // Nombre de la categoría (e.g., "Procesadores", "Ordenadores")
            $table->text('descripcion')->nullable();  // Descripción de la categoría (opcional)
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
        Schema::dropIfExists('categorias');
    }
};
