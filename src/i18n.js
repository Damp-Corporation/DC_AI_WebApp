import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEN from './locales/en/en.json';
import translationFR from './locales/fr/fr.json';
import { configureMoment } from './utils/configureMoment';
import Backend from 'i18next-http-backend';


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: '',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        resources: {
            en: {
                translation: translationEN,
            },
            fr: {
                translation: translationFR,
            }
        },

        // Activez la détection automatique de la langue du navigateur
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'i18nextLng',
        },

        // detection:false,


        // Activez le mode de débogage pour afficher les avertissements de traduction manquants
        debug: false,

        // Activez l'interpolation de texte pour insérer des variables dans les traductions
        interpolation: {
            escapeValue: false,
        },


    });

i18n.on('languageChanged', (lng) => {
    configureMoment(lng);
});

// Initialisation au démarrage
configureMoment(i18n.language);

export default i18n;