import React from 'react';
import { Link } from '@inertiajs/react';

const pricingTiers = [
    {
        type: 'etudiant',
        name: 'Étudiant / Doctorant',
        price: '10 000',
        price_early: 'Après le 30 août 2026 : <strong>15 000 FCFA</strong>',
        features: [
            'Accès à tous les ateliers',
            'Livre des résumés',
            'Certificat de participation',
            'Réseautage scientifique',
        ],
        highlight: false,
    },
    {
        type: 'chercheur', // Modifié ici (était 'enseignant')
        name: 'Enseignant-chercheur / Praticien',
        price: '20 000',
        price_early: 'Après le 30 août 2026 : <strong>25 000 FCFA</strong>',
        features: [
            'Accès à tous les ateliers',
            'Livre des résumés & Actes',
            'Certificat de participation',
            'Présentation prioritaire',
            'Réseautage scientifique',
        ],
        highlight: true,
    },
    {
        type: 'exposant', // Modifié ici (était 'stand')
        name: 'Stand / Exposition',
        price: '60 000',
        price_early: 'Après le 30 août 2026 : <strong>70 000 FCFA</strong>',
        features: [
            "Espace d'exposition dédié",
            'Visibilité auprès des participants',
            '2 badges participant inclus',
            'Mention dans le programme',
            'Accès au réseautage',
        ],
        highlight: false,
    },
];

const PricingCard = ({ type, name, price, highlight, features, price_early }) => (
    <div className={`relative flex flex-col rounded-lg shadow-lg p-8 text-center bg-white dark:bg-gray-800 border transition-transform duration-300 ${highlight ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/50 dark:ring-blue-400/50 transform lg:scale-105 z-10' : 'border-gray-200 dark:border-gray-700'}`}>
        {highlight && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">Recommandé</div>}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
        <div className="mt-4 flex items-baseline justify-center">
            <span className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{price}</span>
            <span className="ml-1 text-xl font-semibold text-gray-500 dark:text-gray-400">FCFA</span>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Tarif préférentiel</p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: price_early }}></p>

        <ul role="list" className="my-6 space-y-4 text-sm text-left text-gray-600 dark:text-gray-400">
            {features.map((feature) => (
                <li key={feature} className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>

        <div className="mt-auto flex-grow flex items-end">
            <Link
                href={route('inscription.form', { type: type })}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
                {type === 'exposant' ? 'Réserver →' : 'S\'inscrire →'}
            </Link>
        </div>
    </div>
);

export default function PricingSection() {
    return (
        <section id="tarifs" className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/10 text-green-800 dark:text-green-400 font-semibold tracking-wider uppercase text-xs">
                        Frais de participation
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Tarifs d'inscription
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Tarifs préférentiels avant le 30 août 2026. Les frais sont à régler en ligne (Trésor Public du Bénin).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-up delay-300">
                    {pricingTiers.map((tier) => (<PricingCard key={tier.type} {...tier} />))}
                </div>

                <div className="mt-16 max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800/50 p-8 rounded-lg text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Procédure de Paiement — Trésor Public du Bénin</h3>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        {/* Informations pour le paiement */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-gray-800 dark:text-gray-200">Informations requises</h4>
                            <div className="text-gray-600 dark:text-gray-400 space-y-2">
                                <p><strong>Plateforme :</strong> <a href="https://tresorbenin.bj/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">tresorbenin.bj</a> (section eQuittance)</p>
                                <p><strong>Numéro de compte :</strong> <span className="font-mono text-gray-800 dark:text-gray-200">000001048692</span></p>
                                <p><strong>Clé RIB :</strong> <span className="font-mono text-gray-800 dark:text-gray-200">20</span></p>
                                <p><strong>Intitulé :</strong> <span className="font-semibold text-gray-800 dark:text-gray-200">ENSPD — JSSED 2026</span></p>
                            </div>
                        </div>

                        {/* Procédure à suivre */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-gray-800 dark:text-gray-200">Procédure à suivre</h4>
                            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                                <li>Effectuer le paiement en ligne sur la plateforme.</li>
                                <li>Conserver précieusement le reçu (eQuittance).</li>
                                <li>
                                    Envoyer le reçu à <a href="mailto:jssed.enspd.up.2026@gmail.com" className="text-blue-600 hover:underline">jssed.enspd.up.2026@gmail.com</a>.
                                </li>
                                <li>Votre compte sera validé sous 48h ouvrables après vérification.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
