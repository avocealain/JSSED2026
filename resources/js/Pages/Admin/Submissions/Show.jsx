import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Show({ submission, ateliers }) {
    const { flash } = usePage().props;
    const { data, setData, patch, processing } = useForm({
        status: submission.status,
    });

    // Fonction pour afficher de beaux badges de statut
    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        const labels = {
            pending: 'En attente',
            approved: 'Approuvée',
            rejected: 'Rejetée',
        };
        return (
            <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full border ${styles[status] || 'bg-gray-100'}`}>
                {labels[status] || status}
            </span>
        );
    };

    // Soumission du formulaire de changement de statut
    const handleStatusUpdate = (e) => {
        e.preventDefault();
        patch(route('admin.submissions.updateStatus', submission.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Détails de la soumission</h2>}>
            <Head title={`Soumission ${submission.ref_code}`} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Bouton Retour & Flash Message */}
                    <div className="mb-6">
                        <Link href={route('admin.submissions.index')} className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center transition-colors">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Retour à la liste
                        </Link>

                        {flash?.success && (
                            <div className="mt-4 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-md shadow-sm">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div className="ml-3"><p className="text-sm text-emerald-700 font-medium">{flash.success}</p></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Colonne de gauche : Informations Principales (70%) */}
                        <div className="lg:w-2/3 space-y-6">

                            {/* Carte Titre et Auteur */}
                            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                                        {submission.titre}
                                    </h3>
                                    <div className="ml-4">{getStatusBadge(submission.status)}</div>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-mono bg-gray-50 dark:bg-gray-900 inline-block px-3 py-1 rounded-md">
                                    Réf : {submission.ref_code}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Auteur Principal</p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                                            {submission.user?.prenom} {submission.user?.nom}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{submission.user?.email}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                            {submission.user?.institution || 'Non spécifié'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Format de présentation</p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                                            {submission.format === 'oral' ? '🎤 Communication orale' : '📄 Poster scientifique'}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                            <span className="font-medium">Langue :</span> {submission.langue === 'fr' ? 'Français' : 'Anglais'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Carte Résumé Scientifique */}
                            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                                    <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    Résumé scientifique
                                </h4>
                                <div className="prose max-w-none text-gray-700 dark:text-gray-300 text-justify leading-relaxed">
                                    {submission.resume ? submission.resume : <span className="italic text-gray-400">Aucun résumé fourni.</span>}
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Mots-clés :</p>
                                    <div className="flex flex-wrap gap-2">
                                        {submission.keywords ? submission.keywords.split(',').map((keyword, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                                {keyword.trim()}
                                            </span>
                                        )) : <span className="text-sm text-gray-400 italic">Non spécifiés</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Colonne de droite : Statut et Méta (30%) */}
                        <div className="lg:w-1/3 space-y-6">

                            {/* Carte d'Action (Statut) */}
                            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border-t-4 border-emerald-500">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Décision</h4>
                                <form onSubmit={handleStatusUpdate}>
                                    <div className="mb-4">
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Changer le statut de la soumission</label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                        >
                                            <option value="pending">En attente d'évaluation</option>
                                            <option value="approved">Approuvée</option>
                                            <option value="rejected">Rejetée</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-400 transition-colors"
                                    >
                                        {processing ? 'Mise à jour...' : 'Appliquer la décision'}
                                    </button>
                                </form>
                            </div>

                            {/* Carte Méta Données */}
                            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Informations complémentaires</h4>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Date de soumission</p>
                                        <p className="text-sm text-gray-900 dark:text-white font-medium">
                                            {new Date(submission.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Source de financement</p>
                                        <p className="text-sm text-gray-900 dark:text-white">
                                            {submission.financement || <span className="text-gray-400 italic">Aucun financement déclaré</span>}
                                        </p>
                                    </div>

                                    {submission.coauthors && submission.coauthors.length > 0 && (
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Co-auteurs</p>
                                            <ul className="space-y-2">
                                                {submission.coauthors.map((author, idx) => (
                                                    <li key={idx} className="text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-700">
                                                        <span className="font-semibold text-gray-800 dark:text-gray-200">{author.prenom} {author.nom}</span>
                                                        <br />
                                                        <span className="text-gray-500 text-xs">{author.institution}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
