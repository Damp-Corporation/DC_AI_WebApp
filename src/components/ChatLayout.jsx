import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import LanguageSelector from './LanguageSelector';


export const LanguageContext = createContext({
  language: "en",
  setLanguage: null,
});


const ChatLayout = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Assistant IA Santé</h1>
      </header>

      <div className="flex-1 flex flex-col items-center p-4">
        <div className="w-full max-w-2xl bg-white shadow rounded-xl flex flex-col h-[80vh]">
          <div className="flex justify-end p-2">
            <LanguageSelector />
          </div>
          <ChatMessages />
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
