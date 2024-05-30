import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Ups! 404</h1>
        <p className="text-lg mb-5">Aradığınız sayfa bulunamadı.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
