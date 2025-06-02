<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    public function index()
    {
        // try {
        //     $productos = Producto::with(['categoria', 'compatibilidades'])->get();
        //     return response()->json([
        //         'message' => 'Productos obtenidos correctamente',
        //         'data' => $productos
        //     ], 200);
        // } catch (\Exception $e) {
        //     return response()->json([
        //         'message' => 'Error al obtener los productos',
        //         'error' => $e->getMessage()
        //     ], 500);
        // }

        $productos = Producto::with(['categoria', 'compatibilidades'])->get();
        return response()->json($productos);
    }

    public function show($id)
    {
        try {
            // $producto = Producto::with(['categoria', 'compatibilidades'])->findOrFail($id);
            // return response()->json([
            //     'message' => 'Producto obtenido correctamente',
            //     'data' => $producto
            // ], 200);
            $producto = Producto::with(['categoria', 'compatibilidades'])->findOrFail($id);
            return response()->json($producto);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:255',
                'descripcion' => 'required|string|min:10|max:200',
                'precio' => 'required|numeric|min:0',
                'tipo' => 'required|string|max:255',
                'categoria_id' => 'required|exists:categorias,id',
                'imagen_url' => 'nullable|string|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $producto = Producto::create($request->all());
            return response()->json([
                'message' => 'Producto creado correctamente',
                'data' => $producto
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $producto = Producto::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'nombre' => 'sometimes|required|string|max:255',
                'descripcion' => 'sometimes|required|string',
                'precio' => 'sometimes|required|numeric|min:0',
                'tipo' => 'sometimes|required|string|max:255',
                'categoria_id' => 'sometimes|required|exists:categorias,id',
                'imagen_url' => 'nullable|string|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $producto->update($request->all());
            return response()->json([
                'message' => 'Producto actualizado correctamente',
                'data' => $producto
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $producto = Producto::findOrFail($id);
            $producto->delete();
            return response()->json([
                'message' => 'Producto eliminado correctamente',
                'id' => $id
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
