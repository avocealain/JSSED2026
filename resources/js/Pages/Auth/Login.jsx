import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const inputClasses = "mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 transition-colors shadow-sm";

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-[#0b1727]">
            <Head title="Connexion - JSSED" />

            {/* En-tête / Logo */}
            <div className="mb-8 text-center">
                <Link href="/" className="inline-block">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tighter mb-1">JSSED</span>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">ENSPD — Univ. de Parakou</span>
                    </div>
                </Link>
                <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                    Connectez-vous à votre compte
                </h2>
            </div>

            {/* Carte du formulaire */}
            <div className="w-full sm:max-w-md px-8 py-10 bg-white dark:bg-gray-800 shadow-xl overflow-hidden sm:rounded-2xl border border-gray-100 dark:border-gray-700">

                {status && (
                    <div className="mb-6 font-medium text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-lg">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Champ Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Adresse e-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={inputClasses}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{errors.email}</p>}
                    </div>

                    {/* Champ Mot de passe */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Mot de passe
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 transition-colors"
                                >
                                    Oublié ?
                                </Link>
                            )}
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className={inputClasses}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-2 font-medium">{errors.password}</p>}
                    </div>

                    {/* Case à cocher : Se souvenir de moi */}
                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
                        />
                        <label htmlFor="remember" className="ml-3 block text-sm text-gray-600 dark:text-gray-400">
                            Se souvenir de moi
                        </label>
                    </div>

                    {/* Bouton de soumission */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {processing ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    Pas encore de compte ?{' '}
                    <Link href={route('register')} className="font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 transition-colors">
                        S'inscrire
                    </Link>
                </div>
            </div>
        </div>
    );
}
