import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTheme } from '@/Hooks/useTheme';
import ThemeToggle from '@/Components/ThemeToggle';

export default function PublicLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { url } = usePage();

    // GESTİON Des liens d'ancrage pour qu'ils fonctionnent depuis n'importe quelle page
    const isHomePage = url === '/';
    const getAnchorLink = (anchor) => (isHomePage ? anchor : `/${anchor}`);

    const navLinks = [
        { href: getAnchorLink('#apropos'), label: 'À propos', isAnchor: true },
        { href: getAnchorLink('#ateliers'), label: 'Ateliers', isAnchor: true },
        { href: getAnchorLink('#programme'), label: 'Programme', isAnchor: true },
        { href: route('login'), label: 'Connexion/Soumettre', isAnchor: false },
        { href: getAnchorLink('#tarifs'), label: 'Inscription', isAnchor: true },
        { href: getAnchorLink('#contact'), label: 'Contact', isAnchor: true },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans antialiased">

            {/* Bannière d'alerte : News Ticker */}
            <div className="bg-[#0b1727] border-b border-gray-800 py-2 text-sm sm:text-base z-50 relative overflow-hidden flex items-center cursor-default">
                <div className="animate-ticker text-gray-300">
                    <span className="mx-8">
                        <strong className="text-emerald-500 font-bold uppercase">📢 Appel à communications ouvert</strong>
                    </span>
                    <span className="mx-8">
                        🗓️ Soumission des résumés jusqu'au 15 août 2026.
                    </span>
                    <span className="mx-8 text-amber-400 font-semibold tracking-wide">
                        ⚠️ IMPORTANT : Veuillez d'abord vous inscrire (créer un compte) pour pouvoir déposer vos résumés.
                    </span>
                    <span className="mx-8">
                        📍 Du 15 au 18 septembre 2026, Université de Parakou.
                    </span>
                </div>
            </div>

            {/* En-tête de la page */}
            <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href={route('home')} className="flex items-center space-x-3">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 tracking-tighter">JSSED</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">ENSPD — Univ. de Parakou</span>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation pour ordinateur */}
                        <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-6 xl:space-x-8">
                            {navLinks.map(link => (
                                link.isAnchor ? (
                                    <a key={link.label} href={link.href} className="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-150 ease-in-out text-sm">
                                        {link.label}
                                    </a>
                                ) : (
                                    <Link key={link.label} href={link.href} className="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-150 ease-in-out text-sm">
                                        {link.label}
                                    </Link>
                                )
                            ))}
                        </nav>

                        {/* Actions à droite */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <ThemeToggle />
                            <a href="https://djorod1.github.io/ENSPD_Site/index.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                                Site ENSPD
                            </a>
                        </div>

                        {/* Bouton du menu mobile */}
                        <div className="lg:hidden flex items-center">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                                <span className="sr-only">Ouvrir le menu principal</span>
                                {isMenuOpen ? (
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                ) : (
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu mobile */}
                {isMenuOpen && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map(link => (
                                link.isAnchor ? (
                                    <a key={link.label} href={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        {link.label}
                                    </a>
                                ) : (
                                    <Link key={link.label} href={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        {link.label}
                                    </Link>
                                )
                            ))}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex items-center justify-between px-3">
                                <a href="https://djorod1.github.io/ENSPD_Site" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 w-full">
                                    Site ENSPD
                                </a>
                                <ThemeToggle className="ml-4" />
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Contenu principal de la page */}
            <main className="flex-grow bg-gray-50 dark:bg-[#0b1727]">
                {children}
            </main>

            {/* Pied de page */}
            <footer className="bg-[#0b1727] text-gray-300 pt-16 pb-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Colonne 1: Logo et Infos */}
                        <div className="lg:col-span-2">
                            <Link href={route('home')} className="inline-block mb-4">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-blue-400 tracking-tighter">JSSED</span>
                                    <span className="text-xs text-gray-500 -mt-1">ENSPD — Univ. de Parakou</span>
                                </div>
                            </Link>
                            <p className="text-sm text-gray-400 max-w-md">
                                2ᵉ édition — 15 au 18 septembre 2026.
                                <br />
                                En hommage au Professeur Mouftaou AMADOU SANNI.
                            </p>
                        </div>

                                               {/* Colonne 2: Navigation */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Navigation</h3>
                            <ul className="space-y-2">
                                <li><a href={getAnchorLink('#apropos')} className="text-sm text-gray-400 hover:text-white transition-colors">À Propos</a></li>
                                <li><a href={getAnchorLink('#programme')} className="text-sm text-gray-400 hover:text-white transition-colors">Programme</a></li>
                                <li><a href={getAnchorLink('#tarifs')} className="text-sm text-gray-400 hover:text-white transition-colors">Tarifs</a></li>
                                <li><a href={getAnchorLink('#contact')} className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
                                <li><a href={getAnchorLink('#faq')} className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                                <li><Link href={route('legal')} className="text-sm text-gray-400 hover:text-white transition-colors">Politique de Confidentialité</Link></li>
                            </ul>
                        </div>

                        {/* Colonne 3: Liens Utiles */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Liens Utiles</h3>
                            <ul className="space-y-2">
                                <li><a href="https://djorod1.github.io/ENSPD_Site" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Site ENSPD</a></li>
                                <li><a href="mailto:contact@jssed.org" className="text-sm text-gray-400 hover:text-white transition-colors">Contactez-nous</a></li>
                                <li><Link href={route('legal')} className="text-sm text-gray-400 hover:text-white transition-colors">Politique de Confidentialité</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-700/50 flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-xs text-gray-500 text-center sm:text-left">
                            © 2026 JSSED — ENSPD. Tous droits réservés.
                        </p>
                        <Link href={route('legal')} className="text-xs text-gray-500 mt-4 sm:mt-0 hover:text-white transition-colors">
                            Mentions légales & confidentialité
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
