import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

// Affiche le ticket de succès après inscription.
const RegistrationSuccess = ({ regData }) => {
    const formatType = (type) => {
        switch (type) {
            case 'etudiant': return 'Étudiant / Doctorant';
            case 'chercheur': return 'Enseignant-chercheur / Praticien';
            case 'exposant': return 'Stand / Exposition';
            default: return type || 'Non spécifié';
        }
    };

    return (
        <GuestLayout>
            <Head title="Pré-inscription Réussie" />
            <div className="text-center py-8">
                {/* Icône de validation */}
                <svg className="mx-auto h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                
                <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                    Pré-inscription enregistrée avec succès !
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                   <span className="font-bold text-orange-500">ATTENTION</span> : Un email contenant les instructions de paiement via le Trésor Public vous a été envoyé. Veuillez le consulter pour finaliser votre inscription. Si vous ne le trouvez pas, vérifiez votre dossier de <span className="font-bold">spam</span> ou contactez l'<strong href="mailto:jssed.enspd.up.2026@gmail.com">Administration</strong> pour assistance.
                </p>

                {/* Ticket Récapitulatif */}
                <div className="mt-8 w-full max-w-md mx-auto text-left bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm space-y-5">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Code de référence</p>
                        <p className="font-mono text-xl font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 inline-block mt-1 px-3 py-1 rounded-md">
                            {regData?.ref_code}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nom complet</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">{regData?.prenom} {regData?.nom}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Catégorie</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">{formatType(regData?.type)}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email de contact</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">{regData?.email}</p>
                    </div>
                </div>

                <div className="mt-10">
                    <Link
                        href={route('home')}
                        className="btn-primary inline-flex items-center justify-center px-8 py-3 text-base shadow-md hover:shadow-lg"
                    >
                        OK, retourner à l'accueil
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
};

// Formulaire d'inscription principal.
export default function Register({ registrationType }) {
    // Récupération des props Inertia.
    // Récupération des données flash de session.
    const { flash } = usePage().props;
    const regData = flash?.registration_data;
    const successMessage = flash?.success;

    // Initialisation du formulaire.
    const { data, setData, post, processing, errors, reset } = useForm({
        type: registrationType || 'etudiant',
        prenom: '',
        nom: '',
        email: '',
        tel: '',
        institution: '',
        pays: 'Bénin',
        consent: false,
    });

    // Soumission du formulaire.
    const submit = (e) => {
        e.preventDefault();
        post(route('inscription.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    // Si l'inscription a réussi, affiche le ticket.
    if (regData) {
        return <RegistrationSuccess regData={regData} />;
    }

    // Sinon, affiche le formulaire.
    return (
        <GuestLayout>
            <Head title="Inscription aux JSSED 2026" />
            
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Formulaire d'inscription
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Remplissez ce formulaire pour initier votre inscription.
                </p>
            </div>
            
            {successMessage && (
                <div className="mb-6 font-medium text-sm text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    {successMessage}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                
                {/* Catégorie */}
                <div>
                    <InputLabel htmlFor="type" value="Catégorie *" />
                    <select
                        id="type"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        required
                    >
                        <option value="etudiant">Étudiant / Doctorant — 10 000 FCFA</option>
                        <option value="chercheur">Enseignant-chercheur / Praticien — 20 000 FCFA</option>
                        <option value="exposant">Stand / Exposition — 60 000 FCFA</option>
                    </select>
                    <InputError message={errors.type} className="mt-2" />
                </div>

                {/* Prénom & Nom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="prenom" value="Prénom *" />
                        <TextInput
                            id="prenom"
                            type="text"
                            name="prenom"
                            value={data.prenom}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('prenom', e.target.value)}
                            required
                        />
                        <InputError message={errors.prenom} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="nom" value="Nom *" />
                        <TextInput
                            id="nom"
                            type="text"
                            name="nom"
                            value={data.nom}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('nom', e.target.value)}
                            required
                        />
                        <InputError message={errors.nom} className="mt-2" />
                    </div>
                </div>

                {/* Email & Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="email" value="Email *" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="tel" value="Téléphone" />
                        <TextInput
                            id="tel"
                            type="tel"
                            name="tel"
                            value={data.tel}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('tel', e.target.value)}
                        />
                        <InputError message={errors.tel} className="mt-2" />
                    </div>
                </div>

                {/* Institution & Pays */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="institution" value="Institution" />
                        <TextInput
                            id="institution"
                            type="text"
                            name="institution"
                            value={data.institution}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('institution', e.target.value)}
                        />
                        <InputError message={errors.institution} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="pays" value="Pays *" />
                        <select
                            id="pays"
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                            value={data.pays}
                            onChange={(e) => setData('pays', e.target.value)}
                            required
                        >
                            <option value="Bénin">Bénin</option>
                            <option value="Togo">Togo</option>
                            <option value="Niger">Niger</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Sénégal">Sénégal</option>
                            <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                            <option value="France">France</option>
                            <option value="Autre">Autre</option>
                        </select>
                        <InputError message={errors.pays} className="mt-2" />
                    </div>
                </div>

                {/* Consentement */}
                <div className="block mt-2">
                    <label className="flex items-start">
                        <input
                            type="checkbox"
                            name="consent"
                            checked={data.consent}
                            onChange={(e) => setData('consent', e.target.checked)}
                            className="mt-1 rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-blue-600 shadow-sm focus:ring-blue-500"
                            required
                        />
                        <span className="ms-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            J'accepte la politique de confidentialité et certifie que les informations fournies sont exactes.
                        </span>
                    </label>
                    <InputError message={errors.consent} className="mt-2" />
                </div>

                {/* Bouton de soumission */}
                <div className="pt-4 flex items-center justify-end">
                    <PrimaryButton className="w-full md:w-auto px-8 py-3" disabled={processing}>
                        {processing ? 'Traitement en cours...' : 'Finaliser la pré-inscription'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}