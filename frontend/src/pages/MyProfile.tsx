import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { MockService } from '../services/mockData';

const MyProfile: React.FC = () => {
  const { user } = useAuth();
  const [workerProfile, setWorkerProfile] = useState<any>(null);
  const [completedServices, setCompletedServices] = useState<MockService[]>([]);
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

  const fetchCompletedServices = useCallback(async () => {
    try {
      const response = await mockApi.get('/api/services/worker/completed');
      if (response.data.success) {
        const services = response.data.data.services as MockService[];
        setCompletedServices(services.slice(0, 3)); // Mostrar solo los 3 más recientes
      }
    } catch (error) {
      console.error('Error al obtener servicios completados:', error);
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'worker') {
      fetchWorkerProfile();
      fetchCompletedServices();
    } else {
      setLoading(false);
    }
  }, [user, fetchWorkerProfile, fetchCompletedServices]);

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
            
            {/* Historial de Servicios Completados */}
            {user?.role === 'worker' && completedServices.length > 0 && (
              <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #e0e0e0' }}>
                <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '24px' }}>
                  📋 Historial de Trabajos Completados
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {completedServices.map((service) => {
                    const serviceDate = new Date(service.scheduledDate || service.createdAt);
                    const formattedDate = serviceDate.toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    });
                    
                    return (
                      <div
                        key={service._id}
                        style={{
                          padding: '16px',
                          background: '#f8f9fa',
                          borderRadius: '8px',
                          border: '1px solid #e0e0e0',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                          <div>
                            <h3 style={{ margin: '0 0 8px 0', color: '#007bff', fontSize: '18px' }}>
                              {service.title}
                            </h3>
                            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                              <strong>Oficio:</strong> {service.trade}
                            </p>
                          </div>
                          <span
                            style={{
                              padding: '4px 12px',
                              background: '#28a745',
                              color: 'white',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}
                          >
                            ✅ Completado
                          </span>
                        </div>
                        <p style={{ margin: '8px 0', color: '#495057', fontSize: '14px', lineHeight: '1.5' }}>
                          {service.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #dee2e6' }}>
                          <div style={{ fontSize: '13px', color: '#6c757d' }}>
                            <strong>📅 Fecha:</strong> {formattedDate}
                          </div>
                          <div style={{ fontSize: '13px', color: '#6c757d' }}>
                            <strong>📍 Ubicación:</strong> {service.location?.address}, {service.location?.city}
                          </div>
                          {service.finalCost && (
                            <div style={{ fontSize: '13px', color: '#6c757d' }}>
                              <strong>💰 Costo Final:</strong> ${service.finalCost.toFixed(2)}
                            </div>
                          )}
                          {service.estimatedHours && (
                            <div style={{ fontSize: '13px', color: '#6c757d' }}>
                              <strong>⏱️ Horas:</strong> {service.estimatedHours} hrs
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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

