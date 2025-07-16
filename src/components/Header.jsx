import React, {  useEffect, useRef, useState } from "react";
import logo from "/logo.png";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "./Button.jsx";


const Header = () => {
  const { t } = useTranslation();
  const navRef = useRef();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
      if (window.innerWidth >= 1024) {
        // md breakpoint dans Tailwind
        setIsMobileMenuOpen(false); // Réinitialiser la sidebar mobile
      }
    };

    window.addEventListener("resize", handleResize);

    // Appel immédiat pour le cas où on redimensionne sans recharger
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

 
  

  return (
        <header className="navbar sticky top-0 left-0 z-50 w-full border-stroke bg-white shadow-md">
          <div className="container relative ">
            <div className="flex gap-5 items-center justify-between">
              <div className="block py-4 lg:py-0">
                <Link to="/" className="block ">
                  <img src={logo} alt="DGH" className="block size-18 py-2 " />
                </Link>
                {/* <h1 className="text-xl font-semibold">{t("header.title")}</h1> */}
              </div>

              {/* icone de menu (pour ouvrir le menu lorsque nous sommes en md) */}
              <button
                className="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden text-black"
                aria-label="navbarOpen"
                name="navbarOpen"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                  />
                </svg>
              </button>

              <div
                ref={navRef}
                className={`menu-wrapper relative ${
                  isMobileMenuOpen ? "block" : "hidden"
                } justify-between lg:flex`}
              >
                {/* icone de menu (pour fermer le menu lorsque nous sommes en md)*/}
                <button
                  className="navbarClose cursor-pointer fixed top-5 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
                  name="navbarClose"
                  aria-label="navbarClose"
                  onClick={() => setIsMobileMenuOpen(false)}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 hover:text-red-500"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M10 8.586L2.929 1.515L1.515 2.929L8.586 10l-7.071 7.071l1.414 1.414L10 11.414l7.071 7.071l1.414-1.414L11.414 10l7.071-7.071l-1.414-1.414L10 8.586z"
                    />
                  </svg>
                </button>

                <nav className="fixed lg:rounded-0 backdrop-blur-md rounded-lg shadow-md lg:shadow-none top-0 right-0 lg:top-0 lg:left-0 z-[999] flex flex-col items-center h-full w-100 pt-15 lg:pt-0 px-5 lg:ps-0 justify-start bg-white bg-opacity-95 lg:text-center backdrop-blur-sm lg:static lg:h-auto lg:w-max lg:bg-transparent lg:backdrop-blur-none">
                  {/* <ul className="items-start w-full lg:items-center space-y-5 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10 px-5 ">

                    <LanguageSwitcher isRecruiter={true} />
                  </ul> */}

                  {/*s'affiche sur le responsive navbar en md*/}
                  <div className="mt-4 flex flex-col gap-2 items-start justify-start w-full lg:hidden ">
                    <ButtonLink
                      text={t("header.button")}
                      link={"/login"}
                      className={` border border-primary bg-primary text-white hover:shadow-primary/50`}
                    />
                    <LanguageSwitcher />
                  </div>
                </nav>
              </div>

              {/*s'affiche a partir de lg*/}
              <div className=" lg:flex items-center justify-end gap-2 hidden">
                <ButtonLink
                  text={t("header.button")}
                  link={"#"}
                  className={`hidden border border-primary text-white bg-primary hover:shadow-primary/50`}
                />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </header>

      
    
  );
};

export default Header;
