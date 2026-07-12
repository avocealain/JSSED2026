import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links, className = '' }) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <nav className={`flex items-center justify-center mt-4 ${className}`}>
            <div className="flex flex-wrap">
                {links.map((link, key) => {
                    if (link.url === null) {
                        return (
                            <div
                                key={key}
                                className="mr-1 mb-1 px-4 py-2 text-sm leading-4 text-gray-400 border rounded"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }
                    return (
                        <Link
                            key={key}
                            className={`mr-1 mb-1 px-4 py-2 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ${link.active ? 'bg-indigo-500 text-white' : 'bg-white'}`}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            preserveScroll
                        />
                    );
                })}
            </div>
        </nav>
    );
}