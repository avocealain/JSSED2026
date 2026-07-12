import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function ForceChangePassword() {
    const { flash } = usePage().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('password.force.update'), { preserveScroll: true });
    };

    return (
        <GuestLayout>
            <Head title="Changement de mot de passe" />

            <div className="max-w-md mx-auto">
                <div className="mb-6 p-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700" role="alert">
                    <span className="font-bold">Action requise :</span> Pour des raisons de sécurité, vous devez personnaliser votre mot de passe avant de continuer.
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="current_password" value="Mot de passe temporaire" />
                        <TextInput
                            id="current_password"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <InputError message={errors.current_password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Nouveau mot de passe" />
                        <TextInput
                            id="password"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirmer le nouveau mot de passe" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <PrimaryButton disabled={processing}>Mettre à jour le mot de passe</PrimaryButton>
                </form>
            </div>
        </GuestLayout>
    );
}