import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";

export const LanguageContext = createContext({
  language: "en",
  setLanguage: null,
});

const Layout = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  return (
    <LanguageContext value={{ language, setLanguage }}>
      <div>
        {/* <header className="bg-white py-4 px-6 shadow">
          <div className="container flex justify-between ">
            <h1 className="text-xl font-semibold">{t("header.title")}</h1>
            <LanguageSwitcher />
          </div>
        </header> */}
        <Header />

        <main className="container mx-auto px-4 py-6">
          <Outlet />
        </main>

        {/* <footer className="bg-gray-200 text-center text-sm text-gray-700 py-4">
          &copy; {new Date().getFullYear()} {t("footer.copywrite")}
        </footer> */}
        <Footer />
      </div>
    </LanguageContext>
  );
};

export default Layout;
