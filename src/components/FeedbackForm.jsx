import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FeedbackModal = ({ onClose, onSubmit }) => {
  const { t, i18n } = useTranslation()
  const [comment, setComment] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  const feelings = [
    { emoji: '😠', label: t("feelings.Overwhelmed") },   // trop chaud, stressé, épuisé
    { emoji: '😞', label: t("feelings.Sad") },           // triste
    { emoji: '😐', label: t("feelings.Neutral") },       // neutre / sans émotion forte
    { emoji: '😊', label: t("feelings.Happy") },         // content, joyeux
    { emoji: '🥰', label: t("feelings.Loved") },         // aimé, affectueux
  ];

  // const {
//   transcript,
//   listening,
//   resetTranscript,
//   browserSupportsSpeechRecognition,
// } = useSpeechRecognition();

const { transcript, interimTranscript, finalTranscript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();


const [recording, setRecording] = useState(false);

// Mettre à jour le commentaire automatiquement à chaque nouvelle reconnaissance
// useEffect(() => {
//   if (transcript) {
//     setComment(transcript);
//   }
// }, [transcript]);

const startListening = () => {
  resetTranscript();
  SpeechRecognition.startListening({ continuous: true, language: i18n.language });
  setRecording(true);
};

const stopListening = () => {
  SpeechRecognition.stopListening();
  setRecording(false);
};

if (!browserSupportsSpeechRecognition) {
  return <p>{t("speech.unsupported")}</p>;
}


  // Met à jour automatiquement le commentaire avec la transcription vocale
  // useEffect(() => {
  //   if (transcript) {
  //     setComment(transcript);
  //   }
  // }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>{t("Votre navigateur ne supporte pas la reconnaissance vocale.")}</p>;
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(t("validation.nameRequired")),
    age: Yup.number().required(t("validation.ageRequired")).min(0, t("validation.ageInvalid")),
    department: Yup.string().required(t("validation.departmentRequired")),
    comment: Yup.string().required(t("validation.commentRequired")),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      department: '',
      comment: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        feeling: selectedFeeling,
      });

      console.log("values", values);
      
      
      Swal.fire({
        icon: 'success',
        title: t("feedback.successTitle"),
        text: t("feedback.successText"),
        confirmButtonText: t("feedback.ok"),
      });
      onClose();
    },
  });

  useEffect(() => {
  if (finalTranscript) {
    const current = formik.values.comment || '';
    formik.setFieldValue('comment', `${current} ${finalTranscript}`.trim());
    resetTranscript(); // Réinitialise le buffer
    stopListening(); // Stoppe l’écoute pour éviter la répétition
  }
}, [finalTranscript]);



  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
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

          
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              {/* <p className="text-3xl font-bold text-gray-800 mb-3 mt-5 text-center">{t("feedback.question")}</p> */}
              <p className="text-lg font-medium text-gray-700 mb-3 mt-5 text-center">{t("feedback.subtitle")}</p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("feedback.name")} <span className='text-red-700'>*</span></label>
                <input
                  type="text"
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("feedback.namePlaceholder")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("feedback.age")} <span className='text-red-700'>*</span></label>
                <input
                  type="number"
                  name='age'
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("feedback.agePlaceholder")}
                />
                {formik.touched.age && formik.errors.age && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.age}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("feedback.department")} <span className='text-red-700'>*</span></label>
                <input
                  type="text"
                  name='department'
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("feedback.departmentPlaceholder")}
                />
                {formik.touched.department && formik.errors.department && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.department}</div>
                )}
              </div>
              <div className='mb-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("feedback.emotion")} <span className='text-red-700'>*</span></label>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
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
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("feedback.question")} <span className='text-red-700'>*</span></label>
              <textarea
                id="comment"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("feedback.placeholder")}
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.comment && formik.errors.comment && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.comment}</div>
              )}

              <div className="flex items-center gap-3 mt-2">
                {!recording ? (
                  <button
                    type="button"
                    onClick={startListening}
                    className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-800 flex gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic-icon lucide-mic"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg>
                    {t("speech.start")}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={stopListening}
                      className="px-3 py-1 text-sm rounded bg-red-100 hover:bg-red-200 text-red-800 flex gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic-off-icon lucide-mic-off"><line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                      {t("speech.stop")}
                    </button>
                  </>
                )}
                {/* {transcript && (
                  <span className="text-sm text-gray-500">
                    {t("speech.recognized")}: <i>{transcript}</i>
                  </span>
                )} */}
              </div>
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
                className={`px-4 py-2 rounded-md font-medium w-full ${selectedFeeling ? 'bg-primary text-white hover:bg-primary' : 'bg-primary/10 text-gray-500 cursor-not-allowed'}`}
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