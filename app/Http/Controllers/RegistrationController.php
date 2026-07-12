<?php
namespace App\Http\Controllers;
use App\Models\Registration;
use App\Services\AdminNotificationService;
use App\Traits\GeneratesReferenceCode;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\StoreRegistrationRequest;
use App\Mail\RegistrationInstructionsMail;
use App\Mail\NewRegistrationAdminNotification;

class RegistrationController extends Controller
{
    use GeneratesReferenceCode;

    /**
     * Affiche le formulaire d'inscription.
     */
    public function create(string $type = 'etudiant')
    {
        if (!in_array($type, ['etudiant', 'chercheur', 'exposant'])) {
            abort(404);
        }

        return Inertia::render('Auth/Register', [
            'registrationType' => $type,
        ]);
    }

    /**
     * Gère une nouvelle demande d'inscription en créant un utilisateur en attente.
     */
    public function store(StoreRegistrationRequest $request): RedirectResponse
    {
        $ref_code = $this->generateRefCode(Registration::class, 'JSSED-');

        $data = $request->validated();
        $data['ref_code'] = $ref_code;
        $data['status'] = 'pending_approval';
        $data['consent_ip'] = $request->ip();

        $registration = Registration::create($data);

        // Envoyer l'e-mail d'instructions de paiement à l'utilisateur.
        Mail::to($registration->email)->queue(new RegistrationInstructionsMail($registration));

        // Notification par e-mail aux administrateurs (un envoi individuel mis en file d'attente par admin).
        AdminNotificationService::notifyAdmins(NewRegistrationAdminNotification::class, $registration);

        return back()->with('registration_data', $registration);
    }
}
