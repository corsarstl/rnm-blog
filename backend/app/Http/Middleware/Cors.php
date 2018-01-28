<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //Trusted client domains
        $trusted_domains = ["http://rnm-blog.media.s3-website.eu-west-2.amazonaws.com"];

        if(isset($request->server()['HTTP_ORIGIN'])) {
            $origin = $request->server()['HTTP_ORIGIN'];

            if(in_array($origin, $trusted_domains)) {
                header('Access-Control-Allow-Origin: ' . $origin);
                header('Access-Control-Allow-Headers: Origin, Content-Type');
                header('Access-Control-Allow-Headers: Content-Type, Authorization');
                header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            }
        }

        return $next($request);
    }
}
