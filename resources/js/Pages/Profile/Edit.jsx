import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link, usePage } from '@inertiajs/react';

// Icônes pour les boutons d'action
const DocumentPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const Squares2x2Icon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;

export default function Edit({ auth, mustVerifyEmail, status }) {
    const { user } = auth;
    const initials = (user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '');

    // Choix dynamique du layout en fonction du rôle
    const Layout = user.role === 'admin' ? AdminLayout : AuthenticatedLayout;

    const QuickActionButton = ({ href, icon, children }) => (
        <Link href={href} className="btn-action-list">
            {icon}
            {children}
        </Link>
    );

    return (
        <Layout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon Profil</h2>}>
            <Head title="Profil" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Colonne de Gauche: Carte de profil et actions */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Carte de Profil */}
                    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center">
                        <div className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl font-bold">{initials}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.prenom} {user.nom}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.institution}</p>
                    </div>

                    {/* Actions Rapides */}
                    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Actions Rapides</h3>
                        <div className="space-y-3">
                            {user.role === 'admin' ? (
                                <QuickActionButton href={route('admin.dashboard')} icon={<Squares2x2Icon />}>
                                    Tableau de Bord Admin
                                </QuickActionButton>
                            ) : (
                                <>
                                    <QuickActionButton href={route('dashboard')} icon={<DocumentTextIcon />}>
                                        Mes Soumissions
                                    </QuickActionButton>
                                    <QuickActionButton href={route('submission.create')} icon={<DocumentPlusIcon />}>
                                        Nouvelle Soumission
                                    </QuickActionButton>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Colonne de Droite: Formulaires */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 shadow-md sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 shadow-md sm:rounded-lg">
                        <UpdatePasswordForm />
                    </div>

                    <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 shadow-md sm:rounded-lg">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </Layout>
    );
}