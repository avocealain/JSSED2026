import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        institution: user.institution,
        pays: user.pays,
        tel: user.tel,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Informations du Profil</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Mettez à jour les informations de profil et l'adresse e-mail de votre compte.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="prenom" value="Prénom" />
                        <TextInput id="prenom" className="mt-1 block w-full" value={data.prenom} onChange={(e) => setData('prenom', e.target.value)} required isFocused autoComplete="given-name" />
                        <InputError className="mt-2" message={errors.prenom} />
                    </div>
                    <div>
                        <InputLabel htmlFor="nom" value="Nom" />
                        <TextInput id="nom" className="mt-1 block w-full" value={data.nom} onChange={(e) => setData('nom', e.target.value)} required autoComplete="family-name" />
                        <InputError className="mt-2" message={errors.nom} />
                    </div>
                    <div className="md:col-span-2">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput id="email" type="email" className="mt-1 block w-full" value={data.email} onChange={(e) => setData('email', e.target.value)} required autoComplete="username" />
                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div>
                        <InputLabel htmlFor="institution" value="Institution" />
                        <TextInput id="institution" className="mt-1 block w-full" value={data.institution} onChange={(e) => setData('institution', e.target.value)} autoComplete="organization" />
                        <InputError className="mt-2" message={errors.institution} />
                    </div>
                    <div>
                        <InputLabel htmlFor="tel" value="Téléphone" />
                        <TextInput id="tel" className="mt-1 block w-full" value={data.tel} onChange={(e) => setData('tel', e.target.value)} autoComplete="tel" />
                        <InputError className="mt-2" message={errors.tel} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Votre adresse e-mail n'est pas vérifiée.
                            <Link href={route('verification.send')} method="post" as="button" className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Cliquez ici pour renvoyer l'e-mail de vérification.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                Un nouveau lien de vérification a été envoyé à votre adresse e-mail.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Enregistrer</PrimaryButton>
                    <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-sm text-gray-600">Enregistré.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}