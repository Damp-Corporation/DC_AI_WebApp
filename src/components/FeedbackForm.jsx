import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FeedbackModal = ({ onClose, onSubmit }) => {
  const { t } = useTranslation()
  const [comment, setComment] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  const feelings = [
    { emoji: '🥵', label: t("feelings.Overwhelmed") },   // trop chaud, stressé, épuisé
    { emoji: '😞', label: t("feelings.Sad") },           // triste
    { emoji: '😐', label: t("feelings.Neutral") },       // neutre / sans émotion forte
    { emoji: '😊', label: t("feelings.Happy") },         // content, joyeux
    { emoji: '🥰', label: t("feelings.Loved") },         // aimé, affectueux
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      feeling: selectedFeeling,
      comment,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6">
         <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/>
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
            </svg>
            {t("feedback.title")}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <hr className='text-gray-300'/>

          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-800 mb-3 mt-5 text-center">{t("feedback.question")}</p>
              <p className="text-gray-700 mb-3 text-center">{t("feedback.subtitle")}</p>
              <div className="flex justify-center gap-2 mb-4">
                {feelings.map((feeling) => {
                  const isSelected = selectedFeeling === feeling.label;

                  return (
                    <button
                      key={feeling.label}
                      type="button"
                      onClick={() => setSelectedFeeling(feeling.label)}
                      className={`group flex flex-col items-center justify-center px-4 py-3 rounded-xl border-2 transition-all duration-200 
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm'}
                      `}
                    >
                      <span
                        className={`text-3xl transition-transform duration-200 
                          group-hover:scale-125 
                          ${isSelected ? 'scale-125' : ''}
                        `}
                      >
                        {feeling.emoji}
                      </span>
                      <span className={`text-sm mt-1 transition-colors duration-200 
                        ${isSelected ? 'text-blue-700 font-semibold' : 'text-gray-600'}`}>
                        {feeling.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <textarea
                id="comment"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("feedback.placeholder")}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              {/* <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-md"
              >
                Cancel
              </button> */}
              <button
                type="submit"
                disabled={!selectedFeeling}
                className={`px-4 py-2 rounded-md font-medium w-full ${selectedFeeling ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
               {t("feedback.submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;