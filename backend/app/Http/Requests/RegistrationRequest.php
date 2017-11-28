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
            'username'                        => 'required|string|min:3|max:20',
            'email'                           => 'required|email|max:30|unique:users',
            'passwords.password'              => [
                                                    'required',
                                                    'min:8',
                                                    'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/',
                                                    'confirmed'
            ],
            'passwords.password_confirmation' => 'required'
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
            'username.required'            => 'The username field is required.',
            'username.string'              => 'The username field must be a string.',
            'username.min'                 => 'The username field must be at least 3 characters long.',
            'username.max'                 => 'The username field must be no longer than 20 characters.',
            'email.required'               => 'The email field is required.',
            'email.email'                  => 'The email field is not a valid email address.',
            'email.max'                    => 'The email field must be no longer than 30 characters.',
            'email.unique'                 => 'The user with such email already exists.',
            'passwords.password.required'  => 'The password field is required.',
            'passwords.password.min'       => 'The password must be at least 8 characters long.',
            'passwords.password.regex'     => 'The password must contain at least one uppercase and lowercase letters, one digit and one special character.',
            'passwords.password.confirmed' => 'The password is not confirmed.'
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
            'name'     => $this->input('username'),
            'email'    => $this->input('email'),
            'password' => bcrypt($this->input('passwords.password'))
        ]);

        $token = $user->createToken('login')->accessToken;

        return response()->json([
            'user'  => $user,
            'token' => $token
        ], 200);
    }
}
