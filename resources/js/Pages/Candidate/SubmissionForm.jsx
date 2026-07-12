import React, { useState } from 'react';
import { useForm, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SubmissionForm({ ateliers, submission = null }) {
    const { auth } = usePage().props;
    const [step, setStep] = useState(1);
    const isEditMode = submission !== null;

    // 1. Initialisation avec les bons noms (keywords, coauthors)
    const { data, setData, post, put, processing, errors } = useForm({
        atelier_id: submission?.atelier_id || '',
        format: submission?.format || 'oral',
        langue: submission?.langue || 'fr',
        titre: submission?.titre || '',
        resume: submission?.resume || '',
        keywords: submission?.keywords || '',
        financement: submission?.financement || '',
        coauthors: submission?.coauthors || [],
        consent: false,
    });

    const addCoauthor = () => setData('coauthors', [...data.coauthors, { prenom: '', nom: '', institution: '' }]);
    const removeCoauthor = (index) => setData('coauthors', data.coauthors.filter((_, i) => i !== index));
    const handleCoauthorChange = (index, field, value) => {
        const updatedCoauthors = data.coauthors.map((coauthor, i) =>
            i === index ? { ...coauthor, [field]: value } : coauthor
        );
        setData('coauthors', updatedCoauthors);
    };

    const wordCount = data.resume.trim() === '' ? 0 : data.resume.trim().split(/\s+/).length;
    const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.consent) {
            alert("Vous devez accepter les conditions pour soumettre.");
            return;
        }

        const options = {
            preserveScroll: true,
            onError: (err) => console.log("Erreurs de validation:", err)
        };

        if (isEditMode) {
            put(route('submission.update', submission.id), options);
        } else {
            post(route('submission.store'), options);
        }
    };

    const pageTitle = isEditMode ? `Modifier la soumission ${submission.ref_code}` : 'Nouvelle Soumission';

    const inputClasses = "mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:border-emerald-500 dark:focus:border-emerald-600 focus:ring-emerald-500 shadow-sm";

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{pageTitle}</h2>}>
            <Head title={pageTitle} />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors">

                        {/* Stepper Visuel Premium */}
                        <div className="flex items-center justify-between mb-10 relative">
                            <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
                            <ul className="relative flex justify-between w-full font-medium text-xs sm:text-sm">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <li key={num} className="flex flex-col items-center gap-2">
                                        <span className={`flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white dark:ring-gray-800 z-10 transition-colors ${step >= num ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                            {num}
                                        </span>
                                        <span className={`hidden sm:block ${step >= num ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {num === 1 ? 'Format' : num === 2 ? 'Auteur' : num === 3 ? 'Co-auteurs' : num === 4 ? 'Détails' : 'Validation'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Étape 1: Format & Atelier */}
                            {step === 1 && (
                                <div className="animate-fade-in-up">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Type de contribution</h3>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Format de contribution *</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <label className="cursor-pointer relative">
                                                <input type="radio" name="format" value="oral" checked={data.format === 'oral'} onChange={e => setData('format', e.target.value)} className="peer sr-only" />
                                                <div className="rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 dark:peer-checked:bg-emerald-900/20">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">🎤 Communication orale</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Présentation de 15 à 20 minutes</p>
                                                </div>
                                            </label>
                                            <label className="cursor-pointer relative">
                                                <input type="radio" name="format" value="poster" checked={data.format === 'poster'} onChange={e => setData('format', e.target.value)} className="peer sr-only" />
                                                <div className="rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 dark:peer-checked:bg-emerald-900/20">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">📄 Poster scientifique</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Présentation affichée commentée</p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="atelier_id" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Atelier Thématique *</label>
                                            <select id="atelier_id" value={data.atelier_id} onChange={e => setData('atelier_id', e.target.value)} className={inputClasses} required>
                                                <option value="">-- Sélectionner un atelier --</option>
                                                {ateliers.map(atelier => <option key={atelier.id} value={atelier.id}>{`Atelier ${atelier.id}: ${atelier.titre}`}</option>)}
                                            </select>
                                            {errors.atelier_id && <p className="text-red-500 text-xs mt-1">{errors.atelier_id}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Langue de présentation *</label>
                                            <select value={data.langue} onChange={e => setData('langue', e.target.value)} className={inputClasses}>
                                                <option value="fr">Français</option>
                                                <option value="en">Anglais</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Étape 2: Auteur Principal */}
                            {step === 2 && (
                                <div className="animate-fade-in-up">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Auteur Principal</h3>
                                    <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
                                        <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                                            <p><span className="font-semibold">Nom:</span> {auth.user.nom}</p>
                                            <p><span className="font-semibold">Prénom:</span> {auth.user.prenom}</p>
                                            <p className="col-span-2"><span className="font-semibold">Email:</span> {auth.user.email}</p>
                                            <p className="col-span-2"><span className="font-semibold">Institution:</span> {auth.user.institution}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 flex items-center">
                                        <svg className="w-4 h-4 mr-1 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                        Ces informations proviennent de votre profil. Si vous souhaitez modifier ces informations, veuillez les mettre à jour dans votre profil.
                                    </p>
                                </div>
                            )}

                            {/* Étape 3: Co-auteurs */}
                            {step === 3 && (
                                <div className="animate-fade-in-up">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Co-auteurs (Optionnel)</h3>
                                    {/* 2. Correction ici : data.coauthors.map au lieu de data.co_auteurs.map */}
                                    {data.coauthors.map((coauthor, index) => (
                                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-5 bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 rounded-lg relative">
                                            <button type="button" onClick={() => removeCoauthor(index)} className="absolute top-2 right-3 text-gray-400 hover:text-red-500 transition-colors">✕</button>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</label>
                                                <input type="text" value={coauthor.prenom} onChange={e => handleCoauthorChange(index, 'prenom', e.target.value)} className={inputClasses} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
                                                <input type="text" value={coauthor.nom} onChange={e => handleCoauthorChange(index, 'nom', e.target.value)} className={inputClasses} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Institution</label>
                                                <input type="text" value={coauthor.institution} onChange={e => handleCoauthorChange(index, 'institution', e.target.value)} className={inputClasses} />
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addCoauthor} className="btn-secondary mt-2">
                                        + Ajouter un co-auteur
                                    </button>
                                </div>
                            )}

                            {/* Étape 4: Résumé */}
                            {step === 4 && (
                                <div className="animate-fade-in-up">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contenu scientifique</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="titre" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Titre de la communication *</label>
                                            <input type="text" id="titre" value={data.titre} onChange={e => setData('titre', e.target.value)} className={inputClasses} required />
                                            {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre}</p>}
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-end mb-1">
                                                <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Résumé *</label>
                                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${wordCount > 300 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                    {wordCount} / 300 mots
                                                </span>
                                            </div>
                                            <textarea id="resume" value={data.resume} onChange={e => setData('resume', e.target.value)} rows="8" className={inputClasses} required></textarea>
                                            {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
                                        </div>
                                        <div>
                                            {/* id="keywords", value={data.keywords} et errors.keywords */}
                                            <label htmlFor="keywords" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Mots-clés *</label>
                                            <input type="text" id="keywords" value={data.keywords} onChange={e => setData('keywords', e.target.value)} className={inputClasses} required placeholder="Ex: Démographie, Big Data, Éducation..." />
                                            {errors.keywords && <p className="text-red-500 text-xs mt-1">{errors.keywords}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="financement" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Source de financement (Optionnel)</label>
                                            <input type="text" id="financement" value={data.financement} onChange={e => setData('financement', e.target.value)} className={inputClasses} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Étape 5: Récapitulatif */}
                            {step === 5 && (
                                <div className="animate-fade-in-up">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirmation</h3>
                                    <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 p-6 rounded-lg space-y-4 text-gray-700 dark:text-gray-300">
                                        <p><strong className="text-gray-900 dark:text-white">Atelier :</strong> {ateliers.find(a => a.id == data.atelier_id)?.titre}</p>
                                        <p><strong className="text-gray-900 dark:text-white">Format :</strong> {data.format === 'oral' ? 'Communication orale' : 'Poster scientifique'}</p>
                                        <hr className="border-gray-200 dark:border-gray-700 my-4"/>
                                        <p><strong className="text-gray-900 dark:text-white">Titre :</strong> {data.titre}</p>
                                        {/* Affichage des mots-clés dans le récapitulatif */}
                                        <p><strong className="text-gray-900 dark:text-white">Mots-clés :</strong> {data.keywords}</p>
                                        <div className="mt-6 mb-6">
                                            <p className="font-bold text-gray-900 mb-2">Résumé :</p>
                                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 leading-relaxed whitespace-pre-wrap shadow-inner max-h-60 overflow-y-auto">
                                                {data.resume ? data.resume : <span className="text-gray-400 italic">Aucun résumé saisi.</span>}
                                            </div>
                                        </div>
                                        <div className="mt-6 p-4 bg-white dark:bg-gray-800 border-l-4 border-emerald-500 rounded-r-md">
                                            <label className="flex items-start cursor-pointer">
                                                <input type="checkbox" checked={data.consent} onChange={e => setData('consent', e.target.checked)} className="mt-1 form-checkbox h-5 w-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700" />
                                                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                                    Je certifie que ce travail est original, qu'il n'a pas été publié ailleurs, et j'autorise le comité scientifique à l'évaluer.
                                                </span>
                                            </label>
                                        </div>
                                        {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Boutons de navigation */}
                            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                                {step > 1 ? (
                                    <button type="button" onClick={prevStep} className="btn-secondary">
                                        ← Précédent
                                    </button>
                                ) : <div></div>}

                                {step < 5 && (
                                    <button type="button" onClick={nextStep} disabled={step === 4 && wordCount > 300} className="btn-primary">
                                        Suivant →
                                    </button>
                                )}
                                {step === 5 && (
                                    <button type="submit" disabled={!data.consent || processing} className="btn-primary bg-emerald-600 hover:bg-emerald-700">
                                        {processing ? 'Envoi en cours...' : (isEditMode ? 'Mettre à jour' : 'Soumettre ma proposition')}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
