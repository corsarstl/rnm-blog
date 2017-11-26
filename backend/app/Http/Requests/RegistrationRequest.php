<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;

class RegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/'
            ]
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required'     => 'The name field is required.',
            'name.string'       => 'The name field must be a string.',
            'name.max'          => 'The name field must be no longer than 255 characters.',
            'email.required'    => 'The email field is required.',
            'email.email'       => 'The email field is not a valid email address.',
            'email.max'         => 'The email field must be no longer than 255 characters.',
            'email.unique'      => 'The user with such email already exists.',
            'password.required' => 'The password field is required.',
            'password.string'   => 'The password field must be a string.',
            'password.min'      => 'The password must be at least 8 characters.',
            'password.regex'    => 'The password must contain at least one uppercase and lowercase letters, one number and one special character.'
        ];
    }

    /**
     * Handle registration request.
     * Register a user and create a valid token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function handle()
    {
        $user = User::create([
            'name'     => $this->input('name'),
            'email'    => $this->input('email'),
            'password' => bcrypt($this->input('password'))
        ]);

        $token = $user->createToken('login')->accessToken;

        return response()->json([
            'user'  => $user,
            'token' => $token
        ], 200);
    }
}
