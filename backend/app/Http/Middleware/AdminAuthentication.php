<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class AdminAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param         $request
     * @param Closure $next
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::guard('api')->check()) {

            if (Auth::guard('api')->user()->is_admin == true)
            {
                return $next($request);
            }
        }

        $message = 'You are not administrator.';

        return response()->json(['message' => $message], 401);
    }
}
