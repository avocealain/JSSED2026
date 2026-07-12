import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
export default function Index({ submissions, filters }) {
    const { flash } = usePage().props;

    const statusClass = (status) => {
        return {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        }[status] || 'bg-gray-100 text-gray-800';
    };

    const handleFilterChange = (status) => {
        router.get(route('admin.submissions.index'), { status }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusChange = (submission, newStatus) => {
        if (!confirm(`Êtes-vous sûr de vouloir ${newStatus === 'approved' ? 'approuver' : 'rejeter'} cette soumission : "${submission.titre}" ?`)) {
            return;
        }
        router.patch(route('admin.submissions.updateStatus', submission.id), {
            status: newStatus
        }, {
            preserveScroll: true,
        });
    };

    const filterStatuses = [
        { value: null, label: 'Tous' },
        { value: 'pending', label: 'En attente' },
        { value: 'approved', label: 'Approuvées' },
        { value: 'rejected', label: 'Rejetées' },
    ];

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestion des Soumissions</h2>}>
            <Head title="Gestion des Soumissions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center space-x-2 mb-6">
                                <span className="text-sm font-medium text-gray-700">Filtrer par statut:</span>
                                {filterStatuses.map(status => (
                                    <button
                                        key={status.value || 'all'}
                                        onClick={() => handleFilterChange(status.value)}
                                        className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                                            filters.status == status.value // Use == for null/undefined comparison
                                                ? 'bg-emerald-500 text-white shadow'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >{status.label}</button>
                                ))}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Réf.</th>
                                            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                                            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auteur</th>
                                            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                                            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="w-1/6 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {submissions.data.map((submission) => (
                                            <tr key={submission.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.ref_code}</td>
                                                <td className="px-6 py-4 whitespace-normal break-words text-sm font-semibold text-gray-900">{submission.titre}</td>                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.user.prenom} {submission.user.nom}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass(submission.status)}`}>
                                                        {submission.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(submission.created_at).toLocaleDateString('fr-FR')}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        {submission.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleStatusChange(submission, 'approved')}
                                                                    className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                                    title="Approuver"
                                                                >
                                                                    Approuver
                                                                </button>
                                                                <button
                                                                    onClick={() => handleStatusChange(submission, 'rejected')}
                                                                    className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                                    title="Rejeter"
                                                                >
                                                                    Rejeter
                                                                </button>
                                                            </>
                                                        )}
                                                        <Link href={route('admin.submissions.show', submission.id)} className="text-indigo-600 hover:text-indigo-900">Détails</Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {submissions.data.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Aucune soumission trouvée.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination className="mt-6" links={submissions.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
