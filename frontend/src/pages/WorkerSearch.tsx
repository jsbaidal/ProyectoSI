import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../services/mockApi';

interface Worker {
  _id: string;
  user: {
    name: string;
    avatar?: string;
  };
  trades: string[];
  experience: number;
  hourlyRate: number;
  description: string;
  location: {
    city: string;
    state: string;
  };
  rating: number;
  totalReviews: number;
  isVerified: boolean;
}

const WorkerSearch: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    trade: '',
    city: '',
    state: '',
    minRating: '',
    maxPrice: '',
    verified: ''
  });

  useEffect(() => {
    searchWorkers();
  }, []);

  const searchWorkers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await mockApi.get(`/api/workers/search?${params.toString()}`);
      const responseData = response.data.data as { workers: Worker[] };
      if (responseData && responseData.workers) {
        setWorkers(responseData.workers);
      }
    } catch (error) {
      console.error('Error al buscar trabajadores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchWorkers();
  };

  return (
    <div className="container">
      <h1>Buscar Trabajadores</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div className="form-group">
              <label>Oficio</label>
              <input
                type="text"
                name="trade"
                value={filters.trade}
                onChange={handleFilterChange}
                placeholder="Ej: plomero, electricista"
              />
            </div>
            <div className="form-group">
              <label>Ciudad</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <input
                type="text"
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group">
              <label>Calificación mínima</label>
              <input
                type="number"
                name="minRating"
                value={filters.minRating}
                onChange={handleFilterChange}
                min="0"
                max="5"
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>Precio máximo/hora</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Verificado</label>
              <select name="verified" value={filters.verified} onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="true">Solo verificados</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Buscar</button>
        </form>
      </div>

      {loading ? (
        <div className="loading">Buscando trabajadores...</div>
      ) : (
        <div>
          {workers.length === 0 ? (
            <div className="card">
              <p>No se encontraron trabajadores con los filtros seleccionados.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {workers.map((worker) => (
                <div key={worker._id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <h3>{worker.user.name}</h3>
                        {worker.isVerified && <span style={{ color: '#28a745' }}>✓ Verificado</span>}
                      </div>
                      <p><strong>Oficios:</strong> {worker.trades.join(', ')}</p>
                      <p><strong>Experiencia:</strong> {worker.experience} años</p>
                      <p><strong>Tarifa:</strong> ${worker.hourlyRate}/hora</p>
                      <p><strong>Ubicación:</strong> {worker.location.city}, {worker.location.state}</p>
                      <p><strong>Calificación:</strong> {worker.rating.toFixed(1)} ⭐ ({worker.totalReviews} reseñas)</p>
                      <p>{worker.description}</p>
                    </div>
                    <Link to={`/worker/${worker._id}`} className="btn btn-primary">
                      Ver Perfil
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkerSearch;

