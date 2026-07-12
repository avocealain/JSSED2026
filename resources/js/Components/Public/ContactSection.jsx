import React from 'react';

const committees = [
    { avatar: 'D', name: "Direction ENSPD", role: "Présidence d'honneur" },
    { avatar: 'S', name: "Comité scientifique", role: "Évaluation des résumés" },
    { avatar: 'O', name: "Comité organisateur", role: "Logistique & programme" },
    { avatar: 'C', name: "Comité communication", role: "Promotion & médias" },
];

const contactMethods = [
    {
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
        type: 'Email officiel',
        value: 'jssed.enspd.up.2026@gmail.com',
        href: 'mailto:jssed.enspd.up.2026@gmail.com'
    },
    {
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>,
        type: 'Téléphone',
        value: '+229 01 95 34 11 65',
        href: 'tel:+2290195341165'
    },
    {
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>,
        type: 'Téléphone',
        value: '+229 01 96 41 92 30',
        href: 'tel:+2290196419230'
    },
    {
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>,
        type: 'Adresse',
        value: 'ENSPD — Université de Parakou, Bénin',
        href: '#'
    }
];

const CommitteeMember = ({ avatar, name, role }) => (
    <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-rose-200 dark:bg-rose-900/50 flex items-center justify-center">
            <span className="text-xl font-bold text-rose-800 dark:text-rose-300">{avatar}</span>
        </div>
        <div>
            <p className="font-bold text-gray-900 dark:text-white">{name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
    </div>
);

const ContactMethod = ({ icon, type, value, href }) => {
    const isLink = href !== '#';
    const Tag = isLink ? 'a' : 'div';

    return (
        <Tag href={isLink ? href : undefined} className={`flex items-start space-x-4 p-4 rounded-lg ${isLink ? 'hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors' : ''}`}>
            <div className="flex-shrink-0 h-8 w-8 text-rose-600 dark:text-rose-400 mt-1">
                {icon}
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{type}</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{value}</p>
            </div>
        </Tag>
    );
};

export default function ContactSection() {
    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-[#0b1727]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête de la section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-800 dark:text-rose-400 font-semibold tracking-wider uppercase text-xs">
                        Contact & Comité
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Nous contacter
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Pour toute question relative aux soumissions, aux inscriptions ou à la logistique.
                    </p>
                </div>

                {/* Grille de contact */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
                    {/* Colonne gauche: Comité */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comité d'organisation</h3>
                        <div className="space-y-6">
                            {committees.map((member) => <CommitteeMember key={member.name} {...member} />)}
                        </div>
                    </div>

                    {/* Colonne droite: Coordonnées */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Coordonnées</h3>
                        <div className="space-y-2">
                            {contactMethods.map((method) => <ContactMethod key={method.type + method.value} {...method} />)}
                        </div>
                        {/* Callout pour l'objet de l'email */}
                        <div className="mt-6 bg-rose-100 dark:bg-rose-900/50 border-l-4 border-rose-500 text-rose-800 dark:text-rose-200 p-4 rounded-r-lg">
                            <p className="text-sm">
                                Pour toute question relative aux soumissions, veuillez préciser l'objet de votre email en mentionnant "Soumission JSS-ED 2026" dans le sujet.
                            </p>
                        </div>
                    </div>
                </div>

{/* Carte Google Maps */}
                <div className="mt-20 max-w-7xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Plan d'accès</h3>

                    <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 h-[300px] font-sans">
                        
                        {/* Nouvelle carte de type Google Maps superposée */}
                        <div className="absolute top-2.5 left-2.5 z-10 bg-white dark:bg-gray-900 p-3 rounded shadow-md border border-gray-100 dark:border-gray-800 flex items-start gap-4 max-w-[360px]">
                            
                            {/* Informations (Gauche) */}
                            <div className="flex flex-col">
                                <h4 className="text-[1.05rem] font-medium text-gray-900 dark:text-white leading-tight">
                                    ENSPD - Université de Parakou
                                </h4>
                                <p className="text-[13px] text-gray-600 dark:text-gray-400 mt-1">
                                    Route de l'Université, Parakou, Bénin
                                </p>
                                
                                {/* Note et Avis */}
                                <div className="flex items-center mt-1.5 text-[13px] text-gray-700 dark:text-gray-300">
                                    <span className="font-medium mr-1">4,5</span>
                                    {/* Icône Étoile Google */}
                                    <svg className="w-3.5 h-3.5 text-[#fbbc04] fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                    </svg>
                                    <a href="#" className="text-[#1a73e8] dark:text-blue-400 hover:underline ml-1">(128)</a>
                                    
                                    {/* Icône Info */}
                                    <svg className="w-4 h-4 ml-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Boutons d'action (Droite) */}
                            <div className="flex items-center gap-1.5 shrink-0 mt-1">
                                {/* Bouton Agrandir le plan */}
                                <a href="https://maps.google.com/?q=Université+de+Parakou" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors" title="Agrandir le plan">
                                    <svg className="w-[22px] h-[22px] text-[#1a73e8] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                                
                                {/* Bouton Itinéraire (Losange Google) */}
                                <a href="https://maps.google.com/maps?daddr=Université+de+Parakou" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors" title="Itinéraire">
                                    <svg className="w-6 h-6 text-[#1a73e8] dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M21.71 11.29l-9-9a.996.996 0 00-1.41 0l-9 9a.996.996 0 000 1.41l9 9c.39.39 1.02.39 1.41 0l9-9a.996.996 0 000-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Iframe Google Maps */}
                        <iframe
                            title="Université de Parakou — plan d'accès"
                            src="https://maps.google.com/maps?q=Université+de+Parakou&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full border-0"
                            allowFullScreen=""
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}