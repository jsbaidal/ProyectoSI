import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';

const MyProfile: React.FC = () => {
  const { user } = useAuth();
  const [workerProfile, setWorkerProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    trades: [] as string[],
    experience: 0,
    hourlyRate: 0,
    description: '',
    city: '',
    state: '',
    address: ''
  });

  const fetchWorkerProfile = useCallback(async () => {
    try {
      const response = await mockApi.get('/api/workers/me');
      if (response.data.success) {
        const worker = response.data.data as any;
        if (worker) {
          setWorkerProfile(worker);
          setFormData({
            name: user?.name || '',
            phone: user?.phone || '',
            trades: worker.trades || [],
            experience: worker.experience || 0,
            hourlyRate: worker.hourlyRate || 0,
            description: worker.description || '',
            city: worker.location?.city || '',
            state: worker.location?.state || '',
            address: worker.location?.address || ''
          });
        }
      }
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'worker') {
      fetchWorkerProfile();
    } else {
      setLoading(false);
    }
  }, [user, fetchWorkerProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user?.role === 'worker') {
        await mockApi.put('/api/workers', {
          ...formData,
          location: {
            address: formData.address,
            city: formData.city,
            state: formData.state
            // Las coordenadas se generarán automáticamente en mockData basándose en la ciudad/estado
          }
        });
        await fetchWorkerProfile();
        setIsEditing(false);
        alert('Perfil actualizado exitosamente');
      } else {
        await mockApi.put('/api/users/profile', {
          name: formData.name,
          phone: formData.phone
        });
        alert('Perfil actualizado exitosamente');
      }
    } catch (error: any) {
      alert(error.message || 'Error al actualizar perfil');
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="container">
      <h1>Mi Perfil</h1>
      <div className="card">
        {!isEditing ? (
          <>
            <p><strong>Nombre:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Teléfono:</strong> {user?.phone}</p>
            <p><strong>Rol:</strong> {user?.role}</p>
            {workerProfile && (
              <>
                <p><strong>Oficios:</strong> {workerProfile.trades?.join(', ')}</p>
                <p><strong>Experiencia:</strong> {workerProfile.experience} años</p>
                <p><strong>Tarifa:</strong> ${workerProfile.hourlyRate}/hora</p>
                <p><strong>Calificación:</strong> {workerProfile.rating?.toFixed(1)} ⭐</p>
              </>
            )}
            <button onClick={() => setIsEditing(true)} className="btn btn-primary" style={{ marginTop: '20px' }}>
              Editar Perfil
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            {user?.role === 'worker' && (
              <>
                <div className="form-group">
                  <label>Oficios (separados por comas)</label>
                  <input
                    type="text"
                    value={formData.trades.join(', ')}
                    onChange={(e) => setFormData({ ...formData, trades: e.target.value.split(',').map(t => t.trim()) })}
                  />
                </div>
                <div className="form-group">
                  <label>Años de experiencia</label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Tarifa por hora ($)</label>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: parseFloat(e.target.value) })}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Ciudad</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Dirección</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </>
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">Guardar</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

