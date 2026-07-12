import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Legal() {
    return (
        <div className="min-h-screen bg-[#0b1727] text-gray-300 font-sans selection:bg-emerald-500 selection:text-white">
            <Head title="Mentions légales & Confidentialité - JSSED" />

            {/* En-tête simple pour le retour */}
            <header className="border-b border-gray-800 bg-[#0b1727]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="text-emerald-500 hover:text-emerald-400 font-medium inline-flex items-center transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Retour à l'accueil
                    </Link>
                </div>
            </header>

            <main className="py-16 sm:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Titre principal */}
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-4 rounded-full bg-emerald-900/30 text-emerald-400 text-xs font-bold tracking-widest uppercase border border-emerald-800/50 mb-6">
                            Mentions légales
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            Confidentialité & conditions
                        </h1>
                    </div>

                    {/* Contenu textuel */}
                    <div className="space-y-12 text-base sm:text-lg leading-relaxed">

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Responsable du traitement</h2>
                            <p>
                                Les données collectées via ce site sont traitées par l'École Nationale de Statistique, de Planification et de Démographie (ENSPD), Université de Parakou, Bénin, dans le cadre de l'organisation des Journées Scientifiques (JSSED).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Données collectées & finalités</h2>
                            <p className="mb-4">
                                Nous collectons uniquement les données nécessaires au traitement de votre soumission ou inscription : identité, coordonnées, institution, et contenu scientifique soumis. Ces données servent exclusivement à :
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>l'évaluation scientifique des communications par le comité ;</li>
                                <li>la gestion des inscriptions et des paiements ;</li>
                                <li>la communication officielle relative à l'événement.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Confidentialité & sécurité</h2>
                            <p>
                                Vos données ne sont ni vendues ni cédées à des tiers. Elles sont transmises de façon sécurisée et conservées de manière confidentielle, avec un accès restreint aux seuls membres habilités de l'organisation. Les échanges sont protégés et les accès d'administration sont sécurisés.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Conservation</h2>
                            <p>
                                Les données sont conservées le temps nécessaire à l'organisation de l'édition concernée, puis archivées ou supprimées conformément à notre politique de conservation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Vos droits</h2>
                            <p>
                                Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, écrivez à <a href="mailto:jssed.enspd.up.2026@gmail.com" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-800">jssed.enspd.up.2026@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Cookies</h2>
                            <p>
                                Ce site n'utilise pas de cookies de suivi publicitaire. Seul un stockage local technique (préférence de thème, brouillon de formulaire et suivi de vos soumissions sur cet appareil) est utilisé pour votre confort.
                            </p>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    );
}
