import { useState } from 'react';
import FeedbackModal from '../components/FeedbackForm';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false);

  const handleSubmitFeedback = (feedback) => {
    console.log('Feedback submitted:', feedback);
  };

  return (
    <div>
      <button 
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {t("feedback.button")}
      </button>

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