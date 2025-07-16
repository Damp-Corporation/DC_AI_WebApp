import logo from "/logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer">
      {/* <div className=" pt-[95px] pb-[46px] bg-gray-100  ">
        <div className="container max-w-[1390px]">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-4/12 xl:w-5/12">
              <div className=" mb-11 max-w-[320px]">
                <a href="#" className="mb-8 inline-block">
                  <img
                    src={logo}
                    alt="DGH"
                    className="block max-w-full w-14 h-14"
                  />
                </a>
                <p >
                  {t("footer.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr /> */}
      <div className="bg-[#03045e] py-7">
        <div className="container max-w-[1390px]">
          <div className="-mx-3 flex flex-wrap">
            <div className="order-last w-full px-3 lg:order-first lg:w-1/3">
              <p className="mt-4 text-center text-white lg:mt-0 lg:text-left">
                &copy; {new Date().getFullYear()} {t("footer.copywrite")} | DAMP Corporation
              </p>
            </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
