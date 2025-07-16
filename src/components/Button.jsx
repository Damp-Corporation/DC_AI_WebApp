import React from "react";
import { Link } from "react-router-dom";

export const ButtonLink = ({ text, link, className, target, rel , icon , left=true }) => {
  return (
    <Link
      to={link}
      target={target}
      rel={rel}
      className={`inline-flex items-center text-sm font-medium leading-6 text-center align-middle py-2 px-3 rounded-md transition-all gap-1 hover:shadow-lg ${className}`}
    >
      {left && icon}{text}{!left && icon}
    </Link>
  );
};

export const ButtonClick = ({ text, onClick, className , icon , left=true }) => {
  return (
    <button
      onClick={onClick}
     
      className={`cursor-pointer inline-flex items-center text-sm font-medium leading-6 text-center align-middle py-2 px-3 rounded-md transition-all gap-1 hover:shadow-lg ${className}`}
    >
      {left && icon}{text}{!left && icon}
    </button>
  );
};
