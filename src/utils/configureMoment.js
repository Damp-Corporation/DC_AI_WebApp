import moment from 'moment';
import 'moment/locale/fr';

export const configureMoment = (language) => {
  const lang = language.split('-')[0].toLowerCase();
  moment.locale(lang);
  
  // Configuration spécifique pour le français
  if (lang === 'fr') {
    moment.updateLocale('fr', {
      relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        ss: '%d secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
      }
    });
  }
};

