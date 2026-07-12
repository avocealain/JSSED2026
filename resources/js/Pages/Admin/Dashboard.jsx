import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';

export default function Dashboard({ pendingRegistrations, approvedUsers, filters }) {
    const { post, processing } = useForm();
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // Débouncage de la recherche pour limiter les requêtes.
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const params = { approved_page: approvedUsers.current_page };
        if (debouncedSearch) params.search = debouncedSearch;
        if (type) params.type = type;
        router.get(route('admin.dashboard'), params, {
            preserveState: true,
            replace: true,
        });
    }, [debouncedSearch, type]);

    const handleApprove = (id) => {
        if (confirm('Voulez-vous vraiment approuver cette inscription ?')) {
            post(route('admin.registrations.approve', id), { preserveScroll: true });
        }
    };

    const handleReject = (id) => {
        if (confirm('Voulez-vous vraiment rejeter cette inscription ?')) {
            post(route('admin.registrations.reject', id), { preserveScroll: true });
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'search') setSearch(value);
        if (name === 'type') setType(value);
    };

    const resetFilters = () => {
        setSearch('');
        setType('');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Gestion des Pré-inscriptions</h2>}>
            <Head title="Tableau de bord Administrateur" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* TABLEAU 1 : EN ATTENTE */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm sm:rounded-xl p-6 transition-colors">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Pré-inscriptions en attente</h2>

                        {pendingRegistrations.length > 0 ? (
                            <div className="overflow-x-auto">
                                {/* Ajout de table-fixed */}
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                    <tr>
                                        {/* Répartition de l'espace (total 12/12) */}
                                        <th className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nom Complet</th>
                                        <th className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                        <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pays</th>
                                        <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                        <th className="w-2/12 px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {pendingRegistrations.map((registration) => (
                                        <tr key={registration.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            {/* break-words pour le texte normal */}
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm font-medium text-gray-900 dark:text-white">
                                                {registration.prenom} {registration.nom}
                                            </td>
                                            {/* break-all pour l'email */}
                                            <td className="px-6 py-4 whitespace-normal break-all text-sm text-gray-600 dark:text-gray-300">
                                                {registration.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-600 dark:text-gray-300">
                                                {registration.pays}
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-600 dark:text-gray-300 capitalize">
                                                {registration.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal text-right text-sm font-medium">
                                                <div className="flex flex-col xl:flex-row gap-2 justify-end">
                                                    <button onClick={() => handleApprove(registration.id)} disabled={processing} className="btn-primary bg-emerald-600 hover:bg-emerald-700 py-1.5 px-3 text-xs">Approuver</button>
                                                    <button onClick={() => handleReject(registration.id)} disabled={processing} className="btn-secondary text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 py-1.5 px-3 text-xs dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-900/20">Rejeter</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                                <p className="text-gray-500 dark:text-gray-400">Aucune pré-inscription en attente.</p>
                            </div>
                        )}
                    </div>

                    {/* TABLEAU 2 : APPROUVÉS */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm sm:rounded-xl p-6 mt-8 transition-colors">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Liste des Participants (Approuvés)</h2>

                        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
                            <div className="w-full md:w-1/2">
                                <input
                                    type="text"
                                    name="search"
                                    value={search}
                                    onChange={handleFilterChange}
                                    placeholder="Rechercher par nom, email, institution..."
                                    className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <select
                                    name="type"
                                    value={type}
                                    onChange={handleFilterChange}
                                    className="w-full sm:w-auto border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                >
                                    <option value="">Tous les types</option>
                                    <option value="etudiant">Étudiant</option>
                                    <option value="chercheur">Chercheur</option>
                                    <option value="exposant">Exposant</option>
                                </select>
                                <button onClick={resetFilters} className="btn-secondary w-full sm:w-auto">
                                    Réinitialiser
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {/* Ajout de table-fixed */}
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
                                <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr>
                                    {/* Répartition de l'espace (total 12/12) */}
                                    <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nom Complet</th>
                                    <th className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                    <th className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Institution</th>
                                    <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pays</th>
                                    <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                    <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Inscrit le</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {approvedUsers.data.length > 0 ? (
                                    approvedUsers.data.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-normal break-words">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.prenom} {user.nom}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal break-all">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal break-words">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{user.institution || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal break-words">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{user.pays}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 capitalize border border-emerald-200 dark:border-emerald-800">
                                                        {user.type}
                                                    </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(user.created_at)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/30">
                                            Aucun participant trouvé pour les filtres sélectionnés.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={approvedUsers.links} className="mt-6" />

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
