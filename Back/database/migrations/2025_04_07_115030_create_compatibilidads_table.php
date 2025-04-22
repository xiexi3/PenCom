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
        Schema::create('compatibilidades', function (Blueprint $table) {
            $table->id();  // Crea una columna auto-incremental llamada id
            $table->foreignId('producto_1_id')->constrained('productos')->onDelete('cascade');  // Relación con el primer producto
            $table->foreignId('producto_2_id')->constrained('productos')->onDelete('cascade');  // Relación con el segundo producto
            $table->string('tipo_relacion');  // Tipo de relación (por ejemplo, "compatible")
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
        Schema::dropIfExists('compatibilidads');
    }
};
