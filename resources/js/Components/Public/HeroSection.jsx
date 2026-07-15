import React, { useState, useEffect } from 'react';

const CountdownItem = ({ value, label }) => (
    <div className="text-center">
        <div className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">{value}</div>
        <div className="mt-1 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 transition-colors duration-300">{label}</div>
    </div>
);

export default function HeroSection() {
    const calculateTimeLeft = () => {
        const eventDate = new Date('2026-09-15T00:00:00');
        const difference = +eventDate - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
                heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                secondes: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatValue = (value) => String(value).padStart(2, '0');

    const timerComponents = timeLeft.jours !== undefined ? (
        <>
            <CountdownItem value={formatValue(timeLeft.jours)} label="Jours" />
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 pt-1 transition-colors duration-300">:</div>
            <CountdownItem value={formatValue(timeLeft.heures)} label="Heures" />
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 pt-1 transition-colors duration-300">:</div>
            <CountdownItem value={formatValue(timeLeft.minutes)} label="Minutes" />
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 pt-1 transition-colors duration-300">:</div>
            <CountdownItem value={formatValue(timeLeft.secondes)} label="Secondes" />
        </>
    ) : (
        <div className="text-3xl text-gray-900 dark:text-white font-bold transition-colors duration-300">L'événement a commencé !</div>
    );

    return (
        <div className="relative bg-emerald-50 dark:bg-gradient-to-br dark:from-[#0A2342] dark:to-[#0D0F40] overflow-hidden transition-colors duration-300">
            <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider uppercase text-sm transition-colors duration-300">
                            2ᵉ Édition · 2026
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tighter transition-colors duration-300">
                            Journées Scientifiques de la <span className="text-emerald-600 dark:text-emerald-400">Statistique</span>, de l'<span className="text-emerald-600 dark:text-emerald-400">Évaluation</span> & de la <span className="text-emerald-600 dark:text-emerald-400">Démographie</span>
                        </h1>

                        <p className="mt-5 text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300 tracking-widest transition-colors duration-300">
                            J · S · S · E · D
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span>Parakou, Bénin</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                <span>ENSPD | Université de Parakou</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span>Du 15 au 18 septembre 2026</span>
                            </div>
                        </div>

                        <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 transition-colors duration-300">
                            « Dynamiques démographiques et socio-environnementales en Afrique subsaharienne : défis, enjeux et perspectives pour l’atteinte des Objectifs de Développement Durable (ODD) »
                        </p>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                            Organisées par l'ENSPD en hommage au <span className="font-semibold text-gray-900 dark:text-gray-200">Professeur Mouftaou AMADOU SANNI</span>.
                        </p>

                        <div className="mt-12">
                            <div className="flex justify-center items-start space-x-4 sm:space-x-8">
                                {timerComponents}
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                            <a href="login" className="w-full sm:w-auto inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300">
                                Connexion / Soumettre
                            </a>
                            <a href="#" className="w-full sm:w-auto inline-block px-8 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-white font-semibold rounded-lg transition-colors duration-300">
                                Appel à communications
                            </a>
                            <a href="#telechargements" className="w-full sm:w-auto inline-block px-8 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-white font-semibold rounded-lg transition-colors duration-300">
                                Documents & Ressources
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
