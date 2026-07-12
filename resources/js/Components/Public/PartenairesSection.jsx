import React from 'react';

const partenaires = [
    {
        nom: 'ENSPD',
        logo: '/logos/Logo_ENSPD.jpg',
        url: 'https://enspd.u-parakou.bj/',
    },
    {
        nom: 'Université de Parakou',
        logo: '/logos/Logo_UP.jpg',
        url: 'https://u-parakou.bj/',
    },
    {
        nom: 'EDSAE',
        logo: '/logos/Logo_EDSAE.jpg',
        url: '#',
    },
    {
        nom: 'INStaD',
        logo: '/logos/Logo_INStaD.png',
        url: 'https://instad.bj/',
    },
    {
        nom: "Annales de l'UP",
        logo: '/logos/logo_ANALES-UP.png',
        url: '#',
    },
];

const PartenaireCard = ({ nom, logo, url }) => {
    const isExternal = url && url.startsWith('http');
    const Tag = url && url !== '#' ? 'a' : 'div';
    const hasWhiteBg = logo.endsWith('.jpg');

    return (
        <Tag
            href={Tag === 'a' ? url : undefined}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group flex flex-col items-center justify-start p-6 text-center border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 h-40 transition-all duration-300 hover:shadow-lg hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:-translate-y-1"
        >
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 h-10 flex items-center justify-center">{nom}</h4>
            <div className="flex-grow flex items-center justify-center w-full">
                <img
                    src={logo}
                    alt={`Logo de ${nom}`}
                    className={`max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${hasWhiteBg ? 'dark:mix-blend-multiply' : ''}`}
                />
            </div>
        </Tag>
    );
};

export default function PartenairesSection() {
    return (
        <section className="bg-white dark:bg-gray-900 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Titre de la section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/10 text-green-800 dark:text-green-400 font-semibold tracking-wider uppercase text-xs">
                        Partenaires
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Partenaires & Soutiens
                    </h2>
                </div>

                {/* Grille des partenaires */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 animate-fade-in-up max-w-5xl mx-auto">
                    {partenaires.map((partenaire) => (
                        <PartenaireCard key={partenaire.nom} {...partenaire} />
                    ))}
                    {/* Carte d'appel à l'action */}
                    <a href="mailto:jssed.enspd.up.2026@gmail.com" className="group flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-transparent h-40 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:-translate-y-1">
                        <div className="text-emerald-600 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">Devenir partenaire</p>
                    </a>
                </div>
            </div>
        </section>
    );
}