import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="  w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white flex flex-col shadow-lg">
      <div className="p-6 text-center text-2xl font-extrabold tracking-wide border-b border-indigo-800">Mantenimiento</div>
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li className="p-4 hover:bg-indigo-800 transition rounded-md">
            <Link to="/home" className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1m0 0H6m10 0a1 1 0 01-1 1m0 0H9"></path></svg>
              <span>Home</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-indigo-800 transition rounded-md">
            <Link to="/equipment" className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0H4m16 0l-2 5m-14-5l2 5m4-5v5m4-5v5m4-5v5"></path></svg>
              <span>Equipos</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-indigo-800 transition rounded-md">
            <Link to="/add-equipment" className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
              <span>Agregar Equipo</span>
            </Link>
          </li>
          {/* <li className="p-4 hover:bg-indigo-800 transition rounded-md">
            <Link to="/history" className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-6-8.28"></path></svg>
              <span>Historial</span>
            </Link>
          </li> */}
          {/* <li className="p-4 hover:bg-indigo-800 transition rounded-md">
            <Link to="/settings" className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317a4.992 4.992 0 013.35 0m1.04.917a4.992 4.992 0 011.697 1.697m.917 1.04a4.992 4.992 0 010 3.35m-.917 1.04a4.992 4.992 0 01-1.697 1.697m-1.04.917a4.992 4.992 0 01-3.35 0m-1.04-.917a4.992 4.992 0 01-1.697-1.697m-.917-1.04a4.992 4.992 0 010-3.35m.917-1.04A4.992 4.992 0 017.757 5.234M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>Configuracion</span>
            </Link>
          </li> */}
        </ul>
      </nav>
      <div className="p-4 text-center text-sm text-gray-400">&copy; 2025 Maintenance System</div>
    </div>
  );
}