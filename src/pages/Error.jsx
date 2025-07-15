import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <div className="bg-white border border-red-200 rounded p-6 shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops !</h1>
        <p className="mb-2">Une erreur est survenue lors du chargement de la page.</p>
        {error?.status && <p className="text-red-500 font-semibold">Erreur {error.status}: {error.statusText}</p>}
        {error?.message && <p className="text-sm text-gray-600 italic mt-2">{error.message}</p>}

        <a
          href="/"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retour à l’accueil
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
