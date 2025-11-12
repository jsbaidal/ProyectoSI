import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="hero">
        <h1>Encuentra Profesionales Calificados</h1>
        <p>Conecta con profesionales verificados en tu área</p>
        {!user && (
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-large">
              Comenzar
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              Iniciar Sesión
            </Link>
          </div>
        )}
        {user && (
          <Link to="/search" className="btn btn-primary btn-large">
            Buscar Oficios
          </Link>
        )}
      </div>

      <div className="features">
        <div className="container">
          <h2>Características Principales</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔍 Búsqueda Inteligente</h3>
              <p>Encuentra profesionales por oficio, ubicación, experiencia y calificación</p>
            </div>
            <div className="feature-card">
              <h3>✅ Perfiles Verificados</h3>
              <p>Profesionales con certificaciones y referencias validadas</p>
            </div>
            <div className="feature-card">
              <h3>💬 Chat Integrado</h3>
              <p>Comunícate directamente con profesionales dentro de la app</p>
            </div>
            <div className="feature-card">
              <h3>💳 Pagos Seguros</h3>
              <p>Sistema de pago electrónico protegido y confiable</p>
            </div>
            <div className="feature-card">
              <h3>⭐ Valoraciones</h3>
              <p>Sistema de calificación mutua para mayor transparencia</p>
            </div>
            <div className="feature-card">
              <h3>👷 Perfiles Profesionales</h3>
              <p>Los profesionales muestran su experiencia y trabajos previos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

