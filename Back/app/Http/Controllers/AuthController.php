<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        //validaciones de campos que viajan en la request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);

        //en caso de cumplir las validaciones, se crea el nuevo usuario en bbdd
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        //se devuelve respuesta con los datos del nuevo usuario
        return response()->json(['data' => ['user'=>$user]]);
    }

    public function login(Request $request)
    {
        //validaciones de campos que viajan en la request
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        //en caso de cumplir las validaciones, se comprueban las credenciales
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        //en caso de credenciales correctas, se recupera la información del usuario
        $user = User::where('email', $request['email'])->firstOrFail();

        //se crea y almacena el token de autenticación
        $token = $user->createToken('auth_token')->plainTextToken;

        //se devuelve respuesta con los datos del usuario logado 
        return response()->json(['data'=> [
            'accessToken' => $token,
            'toke_type' => 'Bearer',
            'user' => $user]
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return ['message' => 'Usuario deslogado'];
    }

    public function regenerateCode(Request $request)
    {
        //validaciones de campos que viajan en la request
        $request->validate(['email' => 'required|email|exists:users']);

        //en caso de cumplir las validaciones, se genera un código aleatorio
        $codigo = rand(0000, 9999);

        //se eliminan de la tabla password_resets de bbdd  
        //todos los registros de códigos asociados al email que llega cómo entrada
        DB::table('password_resets')->where(['email' => $request->email])->delete();

        //se inserta en la tabla password_resets de bbdd el código generado asociado al email,
        //también se le asigna un timestamp con el momento actual para gestionar la caducidad
        //del código generado.
        //"Carbon" es una librería de PHP para trabajar con fechas y horas de forma cómoda
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $codigo,
            'created_at' => Carbon::now()
        ]);

        //en un proceso real, tendriamos que añadir desarrollo aquí
        //para enviar por email el código generado, y que el usuario
        //pudiese continuar con el segundo paso del proceso
    
        //se devuelve la salida con un mensaje informativo
        return ['message' => 'envío realizado'];
    }

    public function regeneratePassword(Request $request)
    {
        //validaciones de campos que viajan en la request
        $request->validate(['email' => 'required|email|exists:users',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required','token' => 'required']);

        //en caso de cumplir las validaciones, se consulta en bbdd si el código (token) 
        //es el que está asociado al email en la tabla password_resets
        $updatePassword = DB::table('password_resets')
            ->where(['email' => $request->email,'token' => $request->token])->first();

        //si no se encuentra registro en la consulta anterior, se devuelve error
        if (!$updatePassword) {return response()->json(['message' => 'Código inválido'], 401);}

        //esta parte es para ver si el código ha expirado
        //en este caso se implementa para que expire en un minuto
        //en caso de haber expirado se devuelve error
        $fechaActual=Carbon::now();
        $fechaCodMasUnMin=Carbon::parse($updatePassword->created_at)->addMinute(1);
        if($fechaActual->gt($fechaCodMasUnMin)) {return response()->json(['message' => 'Código expirado'], 401);}

        //en caso de superar todas las validaciones, se actualiza la password hasheada en bbdd
        User::where('email', $request->email)->update(['password' => Hash::make($request->password)]);

        //se eliminan los registros de la tabla password_resets asociados al email de entrada
        DB::table('password_resets')->where(['email' => $request->email])->delete();

        //se devuelve la salida con un mensaje informativo
        return ['message' => 'Contraseña modificada correctamente'];
    }

    public function user()
    {
        return response()->json(['data'=>['user' => auth()->user()]]);
    }

    
}
