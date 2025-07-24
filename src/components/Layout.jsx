import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";
import ChatWindow from "./ChatWindow";
import FloatingChatButton from "./FloatingChatButton";

export const LanguageContext = createContext({
  language: "en",
  setLanguage: null,
});

const Layout = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [showChat, setShowChat] = useState(false);

  // 🟢 Historique de chat centralisé
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Bonjour 👋 ! Posez-moi vos questions sur votre santé ou choisissez une option ci-dessous.'
    },
    {
      from: 'bot',
      type: 'buttons',
      buttons: [
        { label: 'Prendre un RDV', value: 'Prendre un RDV' },
        { label: 'Question', value: 'Question' },
        { label: 'Urgence', value: 'Urgence' },
      ]
    }
  ]);

  const [hasUnread, setHasUnread] = useState(false);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="relative min-h-screen flex flex-col">
        {showChat && (
          <ChatWindow
            onClose={() => setShowChat(false)}
            setHasUnread={setHasUnread}
            messages={messages}
            setMessages={setMessages}
          />
        )}
        {!showChat && (
          <FloatingChatButton
            onClick={() => {
              setShowChat(true);
              setHasUnread(false);
            }}
            hasUnread={hasUnread}
          />
        )}

        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </LanguageContext.Provider>
  );
};

export default Layout;
