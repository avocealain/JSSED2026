import React from 'react';

const fallbackTimelineEvents = [
    { id: 'tl-1', date_event: '2026-07-15', titre: 'Ouverture de l\'appel à communications', description: null },
    { id: 'tl-2', date_event: '2026-08-15', titre: 'Clôture de la soumission des résumés', description: null },
    { id: 'tl-3', date_event: '2026-08-30', titre: 'Notification aux auteurs', description: null },
    { id: 'tl-4', date_event: '2026-09-01', titre: 'Ouverture des inscriptions', description: null },
    { id: 'tl-5', date_event: '2026-09-15', titre: 'Début des journées scientifiques (JSSED)', description: null },
    { id: 'tl-6', date_event: '2026-09-18', titre: 'Cérémonie de clôture', description: null }
];

const TimelineItem = ({ date, title, description, status, isLast }) => {
    const dotClasses = {
        done: 'bg-gray-400 dark:bg-gray-500',
        current: 'bg-yellow-500 dark:bg-yellow-400 ring-4 ring-yellow-500/20 dark:ring-yellow-400/20',
        todo: 'bg-gray-300 dark:bg-gray-600',
    };

    const dateClasses = {
        done: 'text-gray-500 dark:text-gray-400',
        current: 'text-yellow-600 dark:text-yellow-400 font-bold',
        todo: 'text-emerald-600 dark:text-emerald-400',
    };

    const titleClasses = {
        done: 'text-gray-500 dark:text-gray-400',
        current: 'text-gray-900 dark:text-white font-bold',
        todo: 'text-gray-900 dark:text-white',
    };

    return (
        <div className="relative pl-8">
            {/* Point sur la ligne */}
            <div className={`absolute left-0 top-1 h-3 w-3 rounded-full transition-all ${dotClasses[status] || dotClasses.todo}`}></div>
            {/* Ligne verticale */}
            {!isLast && <div className="absolute left-[5px] top-4 h-full w-px bg-gray-300 dark:bg-gray-600"></div>}

            <p className={`text-sm font-semibold ${dateClasses[status] || dateClasses.todo}`}>{new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <h3 className={`mt-1 text-lg ${titleClasses[status] || titleClasses.todo}`}>{title}</h3>
            {description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>}
        </div>
    );
};

export default function TimelineSection({ timelineEvents = [] }) {
    // Utilise les données de la base de données si elles existent, sinon les données par défaut.
    const initialEvents = timelineEvents && timelineEvents.length > 0 ? timelineEvents : fallbackTimelineEvents;

    if (!Array.isArray(initialEvents) || initialEvents.length === 0) {
        return null;
    }

    // Logique pour déterminer dynamiquement le statut de chaque événement
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliser à minuit pour une comparaison juste

    // Trouver l'index du premier événement qui est aujourd'hui ou dans le futur
    const currentEventIndex = initialEvents.findIndex(event => {
        const eventDate = new Date(event.date_event);
        // Corriger le fuseau horaire pour éviter les erreurs de décalage d'un jour
        eventDate.setMinutes(eventDate.getMinutes() + eventDate.getTimezoneOffset());
        return eventDate >= today;
    });

    const processedEvents = initialEvents.map((event, index) => {
        let status;
        if (currentEventIndex === -1) {
            // Si tous les événements sont passés
            status = 'done';
        } else if (index < currentEventIndex) {
            status = 'done';
        } else if (index === currentEventIndex) {
            status = 'current';
        } else {
            status = 'todo';
        }
        return { ...event, status };
    });

    return (
        <section id="timeline" className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête de la section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-500/10 text-yellow-800 dark:text-yellow-400 font-semibold tracking-wider uppercase text-xs">
                        Calendrier
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Dates clés JSSED 2026
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Les étapes de la 2ᵉ édition, de l'appel à communications jusqu'à la cérémonie de clôture.
                    </p>
                    <div className="mt-4 text-sm bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 p-3 rounded-lg inline-block">
                        Calendrier en cours de finalisation — dates indicatives
                    </div>
                </div>

                {/* Timeline */}
                <div className="max-w-2xl mx-auto space-y-12">
                    {processedEvents.map((event, index) => (
                        <TimelineItem
                            key={event.id}
                            date={event.date_event}
                            title={event.titre}
                            description={event.description}
                            status={event.status}
                            isLast={index === processedEvents.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
