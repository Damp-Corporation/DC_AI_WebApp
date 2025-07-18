import { useState } from 'react';
import FeedbackModal from '../components/FeedbackForm';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const handleSubmitFeedback = (feedback) => {
    console.log('Feedback submitted:', feedback);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6">
      {/* Image illustrant le retour d’expérience */}
      <img 
        src="/home.png" 
        alt="Donnez votre avis sur les soins reçus à DGH" 
        className="w-full max-w-md rounded-lg shadow-md"
      />

      {/* Texte incitatif */}
      <h2 className="text-xl font-semibold text-center">
        {t('feedback.invitation')}
      </h2>

      {/* Bouton d’ouverture de la modale */}
      <button 
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary transition"
      >
        {t("feedback.button", "Donner mon avis")}
      </button>

      {/* Modale de feedback */}
      {showModal && (
        <FeedbackModal 
          onClose={() => setShowModal(false)} 
          onSubmit={handleSubmitFeedback}
        />
      )}
    </div>
  );
}

export default Home;
