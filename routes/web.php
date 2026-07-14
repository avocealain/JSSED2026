
<?php
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\Auth\ForcePasswordChangeController;
use App\Http\Controllers\SubmissionController;
use App\Http\Middleware\ForcePasswordChange;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Routes Publiques
|--------------------------------------------------------------------------
*/
Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/programme', [PublicController::class, 'programme'])->name('programme');

Route::middleware('guest')->group(function () {
    Route::get('/inscription/{type?}', [RegistrationController::class, 'create'])->name('inscription.form');
    Route::post('/inscription', [RegistrationController::class, 'store'])->name('inscription.store');
});

Route::get('/mentions-legales', function () {
    return Inertia::render('Public/Legal');
})->name('legal');

/*
|--------------------------------------------------------------------------
| Routes Authentifiées (Participants)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', ForcePasswordChange::class])->group(function () {
    Route::get('/dashboard', function (Request $request) {
      
        return Inertia::render('Dashboard', [
            'submissions' => $request->user()->submissions()->latest()->get(),
        ]);
    })->name('dashboard');


    Route::get('/soumission', [SubmissionController::class, 'create'])->name('submission.create');

    Route::post('/soumission', [SubmissionController::class, 'store'])->name('submission.store');
    // Routes pour l'édition et la mise à jour
    Route::get('/soumission/{submission}/edit', [SubmissionController::class, 'edit'])->name('submission.edit');
    Route::put('/soumission/{submission}', [SubmissionController::class, 'update'])->name('submission.update');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/password/force-change', [ForcePasswordChangeController::class, 'edit'])->name('password.force.edit');
    Route::patch('/password/force-change', [ForcePasswordChangeController::class, 'update'])->name('password.force.update');
});

/*
|--------------------------------------------------------------------------
| Routes Administrateur (Back-Office)
|--------------------------------------------------------------------------
|
| Ces routes nécessitent que l'utilisateur soit authentifié ET qu'il ait
| le rôle 'admin'. Le middleware 'admin' sera à créer.
|
*/
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/registrations/{registration}/approve', [DashboardController::class, 'approve'])->name('registrations.approve');
    Route::post('/registrations/{registration}/reject', [DashboardController::class, 'reject'])->name('registrations.reject');

    // Routes pour la gestion des soumissions
    Route::get('/submissions', [\App\Http\Controllers\Admin\SubmissionController::class, 'index'])->name('submissions.index');
    Route::get('/submissions/{submission}', [\App\Http\Controllers\Admin\SubmissionController::class, 'show'])->name('submissions.show');
    Route::patch('/submissions/{submission}/status', [\App\Http\Controllers\Admin\SubmissionController::class, 'updateStatus'])->name('submissions.updateStatus');

    // Route pour la gestion des intervenants (en construction)
    Route::get('/speakers', function () {
        return "Page en construction";
    })->name('speakers.index');
});

require __DIR__.'/auth.php';

Route::get('/installation-secrete-db', function () {
    try {
        // 1. Exécuter les migrations en toute sécurité (sans effacer les données existantes)
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        
        // 2. Exécuter les seeders
        \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
        
        return '🚀 Succès : Migrations et Seeders exécutés ! (Pense à supprimer cette route immédiatement)';
    } catch (\Exception $e) {
        return '❌ Erreur : ' . $e->getMessage();
    }
});