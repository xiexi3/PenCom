<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusHistory;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['items', 'statusHistory'])
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Historial de pedidos obtenido correctamente',
            'data' => $orders
        ], 200);
    }

    public function show($id)
    {
        $order = Order::with(['items', 'statusHistory'])
            ->where('user_id', auth()->id())
            ->findOrFail($id);

        return response()->json([
            'message' => 'Detalles del pedido obtenidos correctamente',
            'data' => $order
        ], 200);
    }

    // public function store(Request $request)
    // {
    //     try {
    //         $user = auth()->user();
    //         $cartItems = CartItem::where('user_id', $user->id)->get();

    //         if ($cartItems->isEmpty()) {
    //             return response()->json([
    //                 'message' => 'El carrito está vacío'
    //             ], 400);
    //         }

    //         DB::beginTransaction();

    //         // Crear la orden
    //         $order = Order::create([
    //             'user_id' => $user->id,
    //             'order_number' => 'PED-' . date('Ymd') . '-' . str_pad(Order::count() + 1, 4, '0', STR_PAD_LEFT),
    //             'total_amount' => $cartItems->sum(function($item) {
    //                 return $item->quantity * $item->product->precio;
    //             }),
    //             'status' => 'completado', // Cambiado directamente a completado
    //             'address' => $request->address,
    //             'notes' => $request->notes
    //         ]);

    //         // Crear los items de la orden
    //         foreach ($cartItems as $cartItem) {
    //             OrderItem::create([
    //                 'order_id' => $order->id,
    //                 'product_id' => $cartItem->product_id,
    //                 'product_name' => $cartItem->product->nombre,
    //                 'quantity' => $cartItem->quantity,
    //                 'unit_price' => $cartItem->product->precio,
    //                 'subtotal' => $cartItem->quantity * $cartItem->product->precio
    //             ]);
    //         }

    //         // Registrar el estado inicial como completado
    //         OrderStatusHistory::create([
    //             'order_id' => $order->id,
    //             'status' => 'completado',
    //             'notes' => 'Pedido completado automáticamente'
    //         ]);

    //         // Vaciar el carrito
    //         CartItem::where('user_id', $user->id)->delete();

    //         DB::commit();

    //         return response()->json([
    //             'message' => 'Pedido completado correctamente',
    //             'data' => $order
    //         ], 201);

    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         return response()->json([
    //             'message' => 'Error al procesar el pedido',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    public function store(Request $request)
    {
        try {
            $user = auth()->user();

            // Obtener los elementos del carrito del usuario
            $cartItems = CartItem::where('user_id', $user->id)->get();

            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'El carrito está vacío.'], 400);
            }

            // Crear el pedido
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => uniqid('ORDER-'),
                'total_amount' => $cartItems->sum(fn($item) => $item->quantity * $item->product->precio),
                'address' => $request->address,
                'notes' => $request->notes ?? null,
            ]);

            // Crear los elementos del pedido
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'product_name' => $cartItem->product->nombre,
                    'quantity' => $cartItem->quantity,
                    'unit_price' => $cartItem->product->precio,
                    'subtotal' => $cartItem->quantity * $cartItem->product->precio,
                ]);
            }

            // Vaciar el carrito
            CartItem::where('user_id', $user->id)->delete();

            return response()->json(['message' => 'Pedido realizado con éxito.', 'order' => $order], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al realizar el pedido.', 'error' => $e->getMessage()], 500);
        }
    }

} 