import React, { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0 }) {
    const [hasRevealed, setHasRevealed] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        // Option de sécurité : si l'utilisateur charge directement une page avec un lien (#programme)
        // on désactive l'attente pour éviter l'écran vide.
        if (window.location.hash) {
            setTimeout(() => setHasRevealed(true), 100);
        }

        const currentRef = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasRevealed) {
                    setHasRevealed(true);
                    if (currentRef) observer.unobserve(currentRef);
                }
            },
            {
                threshold: 0, // Se déclenche IMMÉDIATEMENT dès qu'un pixel est à l'écran
                rootMargin: "50px" // Anticipe l'affichage de 50px avant même que ça rentre dans l'écran
            }
        );

        if (currentRef && !hasRevealed) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [hasRevealed]);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: hasRevealed ? '0ms' : `${delay}ms` }}
        >
            {children}
        </div>
    );
}
