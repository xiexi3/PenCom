<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cartItems = CartItem::with('product')
            ->where('user_id', $user->id)
            ->get();

        return response()->json([
            'message' => 'Carrito obtenido correctamente',
            'data' => $cartItems
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:productos,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = Auth::user();
        $product = Producto::findOrFail($request->product_id);

        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => $user->id,
                'product_id' => $product->id
            ],
            [
                'quantity' => $request->quantity
            ]
        );

        return response()->json([
            'message' => 'Producto añadido al carrito correctamente',
            'data' => $cartItem
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $user = Auth::user();
        $cartItem = CartItem::where('user_id', $user->id)
            ->findOrFail($id);

        $cartItem->update([
            'quantity' => $request->quantity
        ]);

        return response()->json([
            'message' => 'Cantidad actualizada correctamente',
            'data' => $cartItem
        ], 200);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $cartItem = CartItem::where('user_id', $user->id)
            ->findOrFail($id);

        $cartItem->delete();

        return response()->json([
            'message' => 'Producto eliminado del carrito correctamente'
        ], 200);
    }

    public function clear()
    {
        $user = Auth::user();
        CartItem::where('user_id', $user->id)->delete();

        return response()->json([
            'message' => 'Carrito vaciado correctamente'
        ], 200);
    }
} 