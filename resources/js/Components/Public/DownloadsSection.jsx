import React from 'react';

export default function DownloadsSection() {
    // Tableau des documents. Si 'fileUrl' est vide, le badge "BIENTÔT" s'affichera.
    const documents = [
        {
            id: 1,
            title: 'Appel à communications',
            description: 'Document officiel de l\'appel (PDF)',
            fileUrl: '', // Laisse vide pour afficher "BIENTÔT"
            isReady: false
        },
        {
            id: 2,
            title: 'Gabarit de résumé',
            description: 'Modèle Word — Arial 12 pt, interligne 1,5',
            fileUrl: '',
            isReady: false
        },
        {
            id: 3,
            title: 'Guide de participation',
            description: 'Informations détaillées (PDF)',
            fileUrl: '/documents/guide-participation.pdf', // Lien réel
            isReady: true
        },
        {
            id: 4,
            title: 'Programme 2026',
            description: 'Planning complet des 3 jours (PDF)',
            fileUrl: '',
            isReady: false
        }
    ];

    return (
        <section id="telechargements" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
                        Documents & Ressources
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors">
                        Téléchargements
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Documents officiels de l'événement : appel à communications, gabarit de résumé, actes et programme.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc) => (
                        <a
                            key={doc.id}
                            href={doc.isReady ? doc.fileUrl : '#'}
                            target={doc.isReady ? "_blank" : "_self"}
                            rel="noreferrer"
                            className={`flex items-center p-5 rounded-2xl border ${doc.isReady ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600' : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 cursor-default'} transition-all duration-300`}
                        >
                            {/* Icône Fichier */}
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${doc.isReady ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>

                            {/* Textes */}
                            <div className="flex-grow">
                                <h3 className={`text-base font-bold ${doc.isReady ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {doc.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                    {doc.description}
                                </p>
                            </div>

                            {/* Badge d'état */}
                            <div className="flex-shrink-0 ml-2">
                                {!doc.isReady && (
                                    <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-bold tracking-wide">
                                        BIENTÔT
                                    </span>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
