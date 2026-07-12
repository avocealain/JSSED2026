import React from 'react';

const ateliersData = [
    {
        numero: 'Atelier 01',
        titre: 'Dynamiques démographiques et socio-environnementales',
        description: 'Interactions entre dynamiques de population et mutations environnementales et sociales en Afrique subsaharienne.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></svg>,
        points: [
            'Croissance démographique, urbanisation & pression sur les ressources',
            'Mobilités, migrations & changements climatiques',
            'Santé, fécondité, mortalité & vulnérabilités environnementales',
            "Systèmes de peuplement, de production & d'occupation de l'espace",
            'Résilience des populations face aux chocs socio-environnementaux',
        ],
    },
    {
        numero: 'Atelier 02',
        titre: 'Données, méthodes statistiques & innovations pour l\'analyse du développement',
        description: 'Outils, méthodes et innovations analytiques au service de la production et de l\'analyse des données.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></svg>,
        points: [
            'Production, qualité & gouvernance des données en Afrique',
            'Méthodes statistiques avancées (modélisation, IA, Big Data)',
            'Analyse spatiale & systèmes d\'information géographique (SIG)',
            'Enquêtes, systèmes d\'information & données administratives',
            'Innovations numériques pour la collecte & l\'analyse des données',
        ],
    },
    {
        numero: 'Atelier 03',
        titre: 'Évaluation des politiques publiques & pilotage du développement durable',
        description: 'Décision, impact et action publique : mesurer, suivre et améliorer les interventions de développement.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4a3 3 0 0 1 0 6M21 20c0-2.5-1.5-4.7-3.7-5.6"/></svg>,
        points: [
            'Évaluation d\'impact des politiques publiques & projets',
            'Suivi-évaluation des programmes de développement',
            'Prise de décision fondée sur les données probantes',
            'Gouvernance, planification & efficacité des interventions',
            'Intégration des enjeux démographiques & environnementaux',
        ],
    },
];

const AtelierCard = ({ numero, titre, description, icon, points }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="flex items-start justify-between">
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">{numero}</p>
            <span className="h-10 w-10 text-emerald-500">{icon}</span>
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{titre}</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-400 text-sm flex-grow">
            {points.map((point, index) => (
                <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-1.5 w-1.5 bg-emerald-500 rounded-full mr-3 mt-1.5"></span>
                    <span>{point}</span>
                </li>
            ))}
        </ul>
    </div>
);

const InfoItem = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg">
        <h4 className="text-md font-bold text-gray-800 dark:text-gray-200">{title}</h4>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">{children}</div>
    </div>
);

export default function AteliersSection() {
    return (
        <section id="aac" className="bg-gray-50 dark:bg-gray-900/50 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête de la section */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-semibold tracking-wider uppercase text-xs">
                        Appel à Communications
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Trois ateliers scientifiques
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Soumettez vos travaux dans l'un des trois ateliers thématiques. Communications orales, posters et expositions sont acceptés.
                    </p>
                </div>

                {/* Grille des ateliers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
                    {ateliersData.map((atelier) => (
                        <AtelierCard key={atelier.numero} {...atelier} />
                    ))}
                </div>

                {/* Informations complémentaires */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-up delay-300">
                    <InfoItem title="Format du résumé">
                        <p>300 mots maximum · Police Arial 12 pt · Interligne 1,5 · Format Word (.docx) · 3 à 5 mots-clés.</p>
                    </InfoItem>
                    <InfoItem title="Valorisation">
                        <p>Livre des résumés · Actes des journées (Annales de l'Université de Parakou) · Synthèse finale · Réseautage scientifique.</p>
                    </InfoItem>
                    <InfoItem title="Contact soumission">
                        <p>
                            <a href="mailto:jssed.enspd.up.2026@gmail.com" className="text-emerald-600 hover:underline">jssed.enspd.up.2026@gmail.com</a>
                            <br />
                            <em>Objet: JSSED – Résumé – Atelier N°X</em>
                        </p>
                    </InfoItem>
                </div>
            </div>
        </section>
    );
}
