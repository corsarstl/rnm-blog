<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Validation\ValidationException;

class ApiController extends Controller
{
    use ValidatesRequests;

    /**
     * Register a user and create a valid token
     * Return user and token                            // !!!UPDATE WHAT IT RETURNS!!!
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password'))
        ]);

        $token = $user->createToken('login')->accessToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }
}
