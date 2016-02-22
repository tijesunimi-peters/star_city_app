<?php
 
namespace App\Http\Middleware;
 
use Closure;
 
class StarMakersAuthenticate
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
        if (\Auth::guest("star_makers")) {
            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            } else {
                return redirect()->guest('star_makers/login');
            }
        }
 
        return $next($request);
    }
}