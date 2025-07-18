import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";

export const LanguageContext = createContext({
  language: "en",
  setLanguage: null,
});

const Layout = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  return (
    <LanguageContext value={{ language, setLanguage }}>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </LanguageContext>
  );
};

export default Layout;
