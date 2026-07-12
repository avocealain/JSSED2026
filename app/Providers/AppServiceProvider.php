<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {   
        if (env('APP_ENV') !== 'local') {
            URL::forceScheme('https'); // Force les liens internes en HTTPS
            URL::forceRootUrl(env('APP_URL')); 
            $this->app['request']->server->set('HTTPS', 'on'); 
        }
    }
}