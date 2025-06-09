<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller 
{
	public function updateShippingAddress(Request $request)
	{
		$request->validate([
			'shipping_address' => 'required|string|max:255',
		]);

		$user = auth()->user();
		$user->shipping_address = $request->shipping_address;
		$user->save();

		return response()->json([
			'message' => 'Dirección de envío actualizada correctamente.',
			'shipping_address' => $user->shipping_address,
		]);
	}

	public function getShippingAddress()
	{
		$user = auth()->user();

		return response()->json([
			'shipping_address' => $user->shipping_address,
		]);
	}

	public function changePassword(Request $request)
	{
		$request->validate([
			'current_password' => 'required',
			'new_password' => 'required|min:8',
		], 
		[
			'current_password.required' => 'La contraseña actual es obligatoria.',
			'new_password.required' => 'La nueva contraseña es obligatoria.',
			'new_password.min' => 'La nueva contraseña debe tener al menos 8 caracteres.',
		]);

		$user = auth()->user();

		if (!Hash::check($request->current_password, $user->password)) {
			return response()->json(['message' => 'La contraseña actual es incorrecta.'], 400);
		}

		$user->password = Hash::make($request->new_password);
		$user->save();

		return response()->json(['message' => 'Contraseña actualizada correctamente.']);
	}
}

