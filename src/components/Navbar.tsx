import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-400">
            Mi App
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-lg hover:text-blue-400 transition-colors duration-200"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/equipments"
              className="text-lg hover:text-blue-400 transition-colors duration-200"
            >
              Equipos
            </Link>
          </li>
          <li>
            <Link
              to="/components"
              className="text-lg hover:text-blue-400 transition-colors duration-200"
            >
              Componentes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
