import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

const fallbackSpeakers = [
    { id: 'fb-s1', nom: 'Hommage', type: 'Session plénière', affiliation: 'Pr. Mouftaou AMADOU SANNI — premier Directeur de l\'ENSPD' },
    { id: 'fb-s2', nom: 'Conférence inaugurale', type: 'Keynote', affiliation: 'Intervenant invité — à confirmer' },
    { id: 'fb-s3', nom: 'Conférence finale', type: 'Keynote', affiliation: 'Intervenant invité — à confirmer' }
];

const fallbackProgram = {
    '2026-09-15': [
        { id: 'fb-p1', heure_debut: '09:00', heure_fin: '10:30', type: 'Plénière', titre: 'Cérémonie d\'ouverture & hommage au Pr. Mouftaou AMADOU SANNI', description: 'Session plénière d\'hommage' },
        { id: 'fb-p2', heure_debut: '11:00', heure_fin: '12:30', type: 'Conférence', titre: 'Conférence inaugurale', description: 'Thème principal des journées' }
    ],
    '2026-09-16': [
        { id: 'fb-p3', heure_debut: '09:00', heure_fin: '12:30', type: 'Atelier', titre: 'Atelier 1 — Dynamiques démographiques & transformations socio-environnementales', description: 'Communications orales' },
        { id: 'fb-p4', heure_debut: '14:00', heure_fin: '17:00', type: 'Posters', titre: 'Session de présentation des posters', description: '' }
    ],
    '2026-09-17': [
        { id: 'fb-p5', heure_debut: '09:00', heure_fin: '12:30', type: 'Atelier', titre: 'Atelier 2 — Données, méthodes statistiques & innovations', description: 'Communications orales' },
        { id: 'fb-p6', heure_debut: '14:00', heure_fin: '17:00', type: 'Atelier', titre: 'Atelier 3 — Évaluation des politiques publiques & pilotage du développement', description: 'Communications orales' }
    ],
    '2026-09-18': [
        { id: 'fb-p7', heure_debut: '09:00', heure_fin: '11:00', type: 'Exposition', titre: 'Expositions & démonstrations d\'outils', description: '' },
        { id: 'fb-p8', heure_debut: '11:30', heure_fin: '13:00', type: 'Plénière', titre: 'Conférence finale & cérémonie de clôture', description: 'Capitalisation des acquis' }
    ]
};

const SpeakerCard = ({ role, name, description }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50 text-center h-full flex flex-col items-center justify-center">
        <div className="flex-shrink-0 h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-teal-800 dark:text-teal-300">
                {name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mt-1">{role}</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
);

const SessionItem = ({ time, type, title, description }) => (
    <div className="flex items-start space-x-4 py-4">
        <p className="w-32 text-right font-mono text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">{time}</p>
        <div className="relative w-full">
            <div className="flex items-center space-x-3">
                <span className="text-xs font-bold uppercase px-2 py-1 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300">{type}</span>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
            </div>
            {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
    </div>
);

export default function Programme({ speakers = [], programSessions = {} }) {
    const formatDay = (dateString, index) => {
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        const dayNumber = index + 1;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
        return `Jour ${dayNumber} · ${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`;
    };

    const displaySpeakers = speakers && speakers.length > 0 ? speakers : fallbackSpeakers;
    const displayProgram = programSessions && Object.keys(programSessions).length > 0 ? programSessions : fallbackProgram;

    return (
        <GuestLayout>
            <Head title="Programme Complet - JSSED 2026" />
            <div className="py-20 bg-gray-50 dark:bg-[#0b1727]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-500/10 text-teal-800 dark:text-teal-400 font-semibold tracking-wider uppercase text-xs">
                            Programme & Intervenants
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Programme Complet des JSSED 2026
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Retrouvez le déroulé détaillé des journées, les intervenants et les sessions thématiques.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto mb-20">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Intervenants d'honneur</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {displaySpeakers.map((speaker) => (
                                <SpeakerCard
                                    key={speaker.id}
                                    role={speaker.type || 'Conférence'}
                                    name={speaker.nom}
                                    description={speaker.affiliation || speaker.bio || ''}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Programme détaillé</h2>
                        <div className="space-y-12">
                            {Object.entries(displayProgram).map(([date, daySessions], index) => (
                                <div key={date}>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b-2 border-teal-500/30 pb-2 mb-4">
                                        {formatDay(date, index)}
                                    </h3>
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700/50">
                                        {daySessions.map((session) => (
                                            <SessionItem
                                                key={session.id}
                                                time={`${session.heure_debut.slice(0, 5)} - ${session.heure_fin.slice(0, 5)}`}
                                                type={session.type}
                                                title={session.titre}
                                                description={session.description}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
