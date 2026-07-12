import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

// --- Icônes Heroicons ---
const DashboardIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const UsersIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const DocumentIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CalendarIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const CreditCardIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const ViewGridIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const SpeakerIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-9 8a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const OfficeIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const CogIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const MenuIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CloseIcon = () => <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;

// --- Composant de lien de la Sidebar ---
const NavLink = ({ href, active, icon, children }) => (
    <Link
        href={href}
        className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
            active
                ? 'bg-emerald-500 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-4">{children}</span>
    </Link>
);

// --- Composant de la Sidebar ---
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigation = [
        { name: 'Vue d\'ensemble', href: '#', icon: <DashboardIcon />, category: 'Général' },
        { name: 'Pré-inscriptions', href: route('admin.dashboard'), icon: <UsersIcon />, category: 'Événement', active: route().current('admin.dashboard') },
        { name: 'Soumissions', href: route('admin.submissions.index'), icon: <DocumentIcon />, category: 'Événement', active: route().current('admin.submissions.*') },
        { name: 'Programme', href: '#', icon: <CalendarIcon />, category: 'Événement' },
        { name: 'Paiements', href: '#', icon: <CreditCardIcon />, category: 'Événement' },
        { name: 'Sections dynamiques', href: '#', icon: <ViewGridIcon />, category: 'Site Web (CMS)' },
        { name: 'Intervenants', href: route('admin.speakers.index'), icon: <SpeakerIcon />, category: 'Site Web (CMS)' },
        { name: 'Partenaires', href: '#', icon: <OfficeIcon />, category: 'Site Web (CMS)' },
        { name: 'Paramètres', href: '#', icon: <CogIcon />, category: 'Système' },
    ];

    const groupedNavigation = navigation.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <>
            {/* Overlay pour mobile */}
            <div className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-20 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-gray-900 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
                    <Link href={route('admin.dashboard')} className="text-lg font-bold text-white hover:text-emerald-400 transition-colors">
                        Admin JSSED
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                        <CloseIcon />
                    </button>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto">
                    {Object.entries(groupedNavigation).map(([category, items]) => (
                        <div key={category}>
                            <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{category}</h3>
                            <div className="space-y-1">
                                {items.map((item) => (
                                    <NavLink key={item.name} href={item.href} active={item.active} icon={item.icon}>
                                        {item.name}
                                    </NavLink>

                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};

// --- Composant du Dropdown Utilisateur ---
const UserDropdown = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
                <svg className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
                    <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profil</Link>
                    <Link href={route('logout')} method="post" as="button" className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Déconnexion
                    </Link>
                </div>
            )}
        </div>
    );
};

// --- Layout Principal ---
export default function AdminLayout({ header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth: { user } } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex flex-col flex-1 md:pl-64">
                {/* Topbar */}
                <header className="sticky top-0 flex items-center justify-between h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 z-10">
                    {/* Bouton Burger pour mobile */}
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 focus:outline-none">
                        <MenuIcon />
                    </button>

                    {/* Titre de la page (prend la place du burger sur desktop) */}
                    <div className="hidden md:block">
                        {header}
                    </div>

                    {/* Menu utilisateur */}
                    <div className="flex items-center space-x-2">
                        <ThemeToggle />
                        <UserDropdown user={user} />
                    </div>
                </header>

                {/* Contenu principal */}
                <main className="flex-1">
                    <div className="py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
