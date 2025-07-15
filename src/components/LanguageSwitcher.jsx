import { useTranslation } from 'react-i18next';
import { Globe } from 'react-feather';
import { useState, useEffect, useRef, useContext } from 'react';
import { LanguageContext } from './Layout';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentLanguage = useContext(LanguageContext);

  const changeLanguage = (lng) => {
    currentLanguage.setLanguage(lng);
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', name: 'EN', flag: '🇬🇧' },
    { code: 'fr', name: 'FR', flag: '🇫🇷' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
      >
        <Globe size={18} />
        {languages.find((l) => l.code === currentLanguage.language)?.name || 'EN'}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul className="py-1">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    currentLanguage.language === lang.code ? 'font-bold text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
