import React from 'react';
import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div>
                <Link href="/" className="flex items-center space-x-3">
                    <div className="flex flex-col text-center">
                        <span className="text-4xl font-bold text-blue-600 dark:text-blue-400 tracking-tighter">JSSED</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">ENSPD — Univ. de Parakou</span>
                    </div>
                </Link>
            </div>

            <div className="w-full sm:max-w-2xl mt-6 px-6 py-8 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}