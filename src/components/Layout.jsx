import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

export const LanguageContext = createContext({
  language: "en",
  setLanguage: null,
});

const Layout = () => {
  return (
    <div>
      <header className="bg-white py-4 px-6 shadow">
        <div className="container flex justify-between ">
          <h1 className="text-xl font-semibold">DGH Feedback System</h1>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center text-sm text-gray-700 py-4">
        &copy; {new Date().getFullYear()} Douala General Hospital
      </footer>
    </div>
  );
};

export default Layout;
