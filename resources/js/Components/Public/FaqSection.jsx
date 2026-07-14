import React, { useState } from 'react';

const fallbackFaqs = [
    { id: 'faq-1', question: 'Quelles sont les dates de l\'événement ?', reponse: 'Les journées se tiendront du 15 au 18 septembre 2026 à l\'Université de Parakou, au Bénin.' },
    { id: 'faq-2', question: 'Comment puis-je soumettre un résumé ?', reponse: 'Vous devez d\'abord créer un compte via le formulaire d\'inscription. Une fois votre compte approuvé par l\'administration, vous pourrez vous connecter à votre espace personnel et accéder au formulaire de soumission.' },
    { id: 'faq-3', question: 'Quels sont les frais de participation ?', reponse: 'Les frais varient selon votre statut (étudiant, enseignant-chercheur, exposant). Veuillez consulter la section "Tarifs d\'inscription" sur la page d\'accueil pour tous les détails.' },
    { id: 'faq-4', question: 'Qui peut soumettre une communication ?', reponse: 'Tout chercheur, enseignant-chercheur, étudiant en Master ou Doctorat, et professionnel des domaines de la statistique, de l\'évaluation ou de la démographie. Les communications interdisciplinaires sont les bienvenues.' },
    { id: 'faq-5', question: 'Quelles langues sont acceptées ?', reponse: 'Les communications peuvent être soumises et présentées en français ou en anglais.' },
    { id: 'faq-6', question: 'Combien de communications peut-on soumettre ?', reponse: 'Un auteur peut soumettre au maximum deux communications, dont une seule en tant qu\'auteur principal. Les co-auteurs ne sont pas limités.' },
    { id: 'faq-7', question: 'Comment les communications sont-elles évaluées ?', reponse: 'Chaque résumé est évalué en double aveugle par au moins deux membres du comité scientifique : originalité, rigueur méthodologique, pertinence thématique et qualité de rédaction.' },
    { id: 'faq-8', question: 'Où sont publiés les actes ?', reponse: 'Les meilleures communications sont publiées dans les séries spécialisées des Annales de l\'Université de Parakou. Un livre des résumés est distribué à tous les participants.' },
    { id: 'faq-9', question: 'Peut-on assister sans présenter ?', reponse: 'Oui, la participation comme auditeur est possible au tarif correspondant à votre statut, avec accès à tous les ateliers et activités de réseautage.' },
    { id: 'faq-10', question: 'Comment mes données sont-elles protégées ?', reponse: 'Vos données ne servent qu\'à l\'organisation de l\'événement, sont transmises de façon sécurisée et ne sont jamais cédées à des tiers. Vous pouvez demander leur suppression à tout moment.' }
];

const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

// Sous-composant pour un élément de la FAQ
const FaqItem = ({ faq, index, openIndex, setOpenIndex }) => {
    const isOpen = index === openIndex;

    const toggleFaq = () => {
        setOpenIndex(isOpen ? null : index);
    };

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 py-6">
            <button
                onClick={toggleFaq}
                className="flex justify-between items-center w-full text-left gap-x-4"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{faq.question}</h3>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`grid overflow-hidden transition-all duration-500 ease-in-out text-gray-600 dark:text-gray-400 ${isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <p className="pr-4">{faq.reponse}</p>
                </div>
            </div>
        </div>
    );
};

export default function FaqSection({ faqs = [] }) {
    const [openIndex, setOpenIndex] = useState(null);

    // Utilise les données de la base de données si elles existent, sinon les données par défaut.
    const displayFaqs = faqs && faqs.length > 0 ? faqs : fallbackFaqs;

    if (!displayFaqs || displayFaqs.length === 0) {
        return null;
    }

    return (
        <section id="faq" className="py-12 md:py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête de la section */}
                <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 font-semibold tracking-wider uppercase text-xs">
                        Questions fréquentes
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        FAQ
                    </h2>
                </div>

                {/* Accordéon */}
                <div className="max-w-3xl mx-auto">
                    {displayFaqs.map((faq, index) => (
                        <FaqItem key={faq.id || index} faq={faq} index={index} openIndex={openIndex} setOpenIndex={setOpenIndex} />
                    ))}
                </div>
            </div>
        </section>
    );
}
