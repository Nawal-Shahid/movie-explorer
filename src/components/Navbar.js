import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-400">
          🎬 Movie Explorer
        </Link>
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className={`hover:text-blue-400 transition-colors ${location.pathname === '/' ? 'text-blue-400' : 'text-white'}`}
          >
            Home
          </Link>
          {user ? (
            <>
              <Link 
                to="/favorites" 
                className={`hover:text-blue-400 transition-colors ${location.pathname === '/favorites' ? 'text-blue-400' : 'text-white'}`}
              >
                Favorites
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">Hello, {user.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;