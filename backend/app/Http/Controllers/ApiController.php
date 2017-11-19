<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    /**
     * Register a user and create a valid token.
     *
     * @param RegistrationRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegistrationRequest $request)
    {
        return $request->handle();
    }

    /**
     * Sign in user and create a valid token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        if (auth()->attempt([
            'email'    => $request->input('email'),
            'password' => $request->input('password')])) {

            $user = auth()->user();
            $token = $user->createToken('login')->accessToken;

            return response()->json([
                'user'  => $user['name'],
                'token' => $token
            ], 200);
        }

        return response()->json(['message' => 'Please, check your credentials.'], 422);
    }
}
