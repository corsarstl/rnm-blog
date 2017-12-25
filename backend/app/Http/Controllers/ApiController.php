<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
     * Sign in the user and create a valid token.
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

            return response()->json(['data' => [
                'user'  => $user,
                'token' => $token
            ]], 200);
        }

        return response()->json(['message' => 'Please, check your credentials.'], 422);
    }

    /**
     * Logout the user and delete his oauth token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        DB::table('oauth_access_tokens')
            ->where('user_id', $request->get('id'))
            ->delete();

        return response()->json(['message' => 'You are logged out.'], 200);
    }
}
