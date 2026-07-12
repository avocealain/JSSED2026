import { usePage } from '@inertiajs/react';

import React from 'react';
import { Link } from '@inertiajs/react';

const StatItem = ({ value, label }) => (
    <div className="text-center">
        {/* En mode clair : vert émeraude foncé | En mode sombre : blanc */}
        <p className="text-3xl font-bold text-emerald-700 dark:text-white">{value}</p>
        {/* En mode clair : gris moyen | En mode sombre : gris clair */}
        <p className="mt-1 text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400">{label}</p>
    </div>
);

const FeatureCard = ({ icon, title, description }) => (
    <div className="text-center p-6">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mx-auto mb-6">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
);

export default function AboutSection() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <>
            <section id="apropos" className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* En-tête de la section */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-semibold tracking-wider uppercase text-xs">
                            À propos
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Les JSSED 2026
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Les Journées Scientifiques de la Statistique, de l'Évaluation et de la Démographie réunissent chercheurs, praticiens et décideurs pour échanger sur les défis du continent. Une organisation de l'ENSPD en collaboration avec l'EDSAE — Université de Parakou.
                        </p>
                    </div>

                    {/* Grille des caractéristiques */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20 animate-fade-in-up">
                        <FeatureCard
                            icon={<svg className="h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                            title="Conférences-débats"
                            description="Des sessions plénières et des tables rondes animées par des experts de renommée internationale."
                        />
                        <FeatureCard
                            icon={<svg className="h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                            title="Communications & posters"
                            description="Présentez vos travaux de recherche et partagez vos résultats avec la communauté scientifique."
                        />
                        <FeatureCard
                            icon={<svg className="h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                            title="Expositions"
                            description="Un espace dédié aux institutions, entreprises et startups pour présenter leurs innovations et services."
                        />
                    </div>

                    {/* Encart Hommage */}
                    <div className="max-w-4xl mx-auto bg-emerald-50 dark:bg-emerald-900/30 border-l-4 border-emerald-500 p-8 rounded-r-lg mb-16 animate-fade-in-up">
                        <div className="inline-block mb-3 px-3 py-1 rounded-full bg-emerald-200 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-semibold text-xs">
                            Hommage
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Professeur Mouftaou AMADOU SANNI
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Cette deuxième édition des JSSED est dédiée au Professeur Mouftaou AMADOU SANNI, figure emblématique de la démographie africaine, qui prendra sa retraite en octobre 2025. Son immense contribution à la formation et à la recherche a marqué des générations de statisticiens et démographes sur le continent.
                        </p>
                    </div>

                    {/* Boutons d'action */}
                    <div className="text-center animate-fade-in-up">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            {user ? (
                                <Link href={route('logout')} method="post" as="button" className="w-full sm:w-auto inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300">
                                    Se déconnecter
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="w-full sm:w-auto inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300">
                                        Connexion / Soumettre un résumé
                                    </Link>
                                    <a href="/#tarifs" className="w-full sm:w-auto inline-block px-8 py-3 border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white font-semibold rounded-lg transition-colors duration-300">
                                        S'inscrire à l'événement
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Strip */}
            {/* En mode clair : fond très clair | En mode sombre : fond noir/gris très foncé */}
            <div className="bg-emerald-50/50 dark:bg-black/20 py-8 border-t border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                        <StatItem value="3" label="Ateliers thématiques" />
                        <StatItem value="2ᵉ" label="Édition JSSED" />
                        <StatItem value="300" label="Mots max. par résumé" />
                        <StatItem value="FR / EN" label="Langues acceptées" />
                    </div>
                </div>
            </div>
        </>
    );
}
