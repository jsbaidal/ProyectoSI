import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Oficios
        </Link>
        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/search" className="navbar-link">
                Buscar Oficios
              </Link>
              {user.role === 'worker' && (
                <Link to="/worker-dashboard" className="navbar-link">
                  Mi Panel
                </Link>
              )}
              <Link to="/services" className="navbar-link">
                Mis Servicios
              </Link>
              <Link to="/chats" className="navbar-link">
                Chats
              </Link>
              <Link to="/profile" className="navbar-link">
                Perfil
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-primary">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

