<?php

namespace App\Http\Middleware;

use App\Models\UserMenu;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class MenuAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, int $menuId): Response
    {
        $hasAccess = DB::table('user_menu_user_role')
            ->where([
                'user_menu_id' => $menuId,
                'user_role_id' => Auth::user()->user_role_id
            ])
            ->exists();

        if ($hasAccess) {
            return $next($request);
        }
        
        return redirect()->route('home')->with('error', 'Anda tidak memiliki akses ke halaman ini.');

    }
}
