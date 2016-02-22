<?php
 
namespace App\Http\Middleware;
 
use Closure;
use Illuminate\Contracts\Auth\Guard;
 
class StarsAuthenticate
{

    protected $auth;
   
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }
    public function handle($request, Closure $next)
    {
        if (\Auth::guest("stars")) {
            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            } else {
                return redirect()->guest('stars/login');
            }
        }
 
        return $next($request);
    }
}