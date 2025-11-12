import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApi } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';
import WorkerMap from '../components/WorkerMap';

interface Worker {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  trades: string[];
  experience: number;
  hourlyRate: number;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  certifications: Array<{
    name: string;
    institution: string;
    issueDate: string;
  }>;
  portfolio: string[];
}

const WorkerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceData, setServiceData] = useState({
    title: '',
    description: '',
    scheduledDate: '',
    estimatedHours: ''
  });

  const fetchWorker = useCallback(async () => {
    try {
      const response = await mockApi.get(`/api/workers/${id}`);
      const workerData = response.data.data as Worker;
      if (workerData) {
        setWorker(workerData);
      }
    } catch (error) {
      console.error('Error al obtener trabajador:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchWorker();
  }, [fetchWorker]);

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serviceResponse = await mockApi.post('/api/services', {
        worker: worker!._id,
        client: user!.id,
        trade: worker!.trades[0],
        ...serviceData,
        location: worker!.location
      });
      
      // Crear chat automáticamente
      try {
        const createdService = serviceResponse.data.data as { _id: string };
        if (createdService && createdService._id) {
          await mockApi.post('/api/chat', {
            participantId: worker!.user._id,
            userId: user!.id,
            serviceId: createdService._id
          });
        }
      } catch (chatError) {
        console.log('Chat ya existe o error al crearlo');
      }
      
      alert('Servicio solicitado exitosamente');
      setShowServiceForm(false);
      navigate('/services');
    } catch (error: any) {
      alert(error.message || 'Error al crear servicio');
    }
  };

  // Calcular estadísticas para Carlos (o usar datos mock)
  const getWorkerStats = () => {
    if (worker?._id === 'worker3') {
      // Estadísticas específicas para Carlos
      return {
        satisfiedClients: 312,
        completedServices: 450,
        totalEarnings: 125000,
        responseTime: '2 horas',
        completionRate: 98
      };
    }
    // Estadísticas por defecto para otros trabajadores
    return {
      satisfiedClients: worker?.totalReviews || 0,
      completedServices: Math.floor((worker?.totalReviews || 0) * 1.5),
      totalEarnings: (worker?.totalReviews || 0) * 200,
      responseTime: '4 horas',
      completionRate: 95
    };
  };

  // Generar calendario mock (próximos 7 días)
  const generateCalendar = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }),
        hasService: Math.random() > 0.5,
        serviceCount: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0
      });
    }
    return days;
  };

  // Reseñas de ejemplo (mock)
  const getSampleReviews = () => {
    if (worker?._id === 'worker3') {
      return [
        { name: 'María González', rating: 5, comment: 'Excelente trabajo, muy profesional y puntual. Lo recomiendo 100%.', date: '2024-01-15' },
        { name: 'Juan Pérez', rating: 5, comment: 'Carlos resolvió mi problema eléctrico rápidamente. Muy satisfecho.', date: '2024-01-10' },
        { name: 'Ana Martínez', rating: 5, comment: 'El mejor electricista que he contratado. Muy detallado y cuidadoso.', date: '2024-01-05' }
      ];
    }
    return [];
  };

  const stats = getWorkerStats();
  const calendar = generateCalendar();
  const reviews = getSampleReviews();

  if (loading) return <div className="loading">Cargando...</div>;
  if (!worker) return <div className="container">Trabajador no encontrado</div>;

  return (
    <div className="container">
      {/* Header del Perfil */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'start' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ marginBottom: '10px' }}>{worker.user.name}</h1>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
              {worker.isVerified && (
                <span style={{ color: '#28a745', fontWeight: 'bold' }}>✓ Verificado</span>
              )}
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {worker.rating.toFixed(1)} ⭐ ({worker.totalReviews} reseñas)
              </span>
            </div>
            <p style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>{worker.description}</p>
          </div>
        </div>

        {/* Panel Técnico - Estadísticas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '15px',
          marginBottom: '30px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
              {stats.satisfiedClients}+
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Clientes Satisfechos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>
              {stats.completedServices}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Servicios Completados</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>
              {stats.completionRate}%
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Tasa de Finalización</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#17a2b8' }}>
              {stats.responseTime}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Tiempo de Respuesta</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Calendario */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3 style={{ marginBottom: '15px' }}>📅 Calendario - Próximos 7 Días</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
              {calendar.map((day, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px',
                    textAlign: 'center',
                    borderRadius: '4px',
                    background: day.hasService ? '#e7f3ff' : '#f8f9fa',
                    border: day.hasService ? '2px solid #007bff' : '1px solid #ddd'
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{day.date.split(' ')[0]}</div>
                  <div style={{ fontSize: '14px', marginTop: '5px' }}>{day.date.split(' ')[1]}</div>
                  {day.serviceCount > 0 && (
                    <div style={{ 
                      marginTop: '5px', 
                      fontSize: '10px', 
                      color: '#007bff',
                      fontWeight: 'bold'
                    }}>
                      {day.serviceCount} servicio{day.serviceCount > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reseñas Recientes */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3 style={{ marginBottom: '15px' }}>⭐ Reseñas Recientes</h3>
            {reviews.length > 0 ? (
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {reviews.map((review, idx) => (
                  <div key={idx} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <strong>{review.name}</strong>
                      <span>{'⭐'.repeat(review.rating)}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>{review.comment}</p>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(review.date).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#666' }}>No hay reseñas disponibles</p>
            )}
          </div>
        </div>
      </div>

      {/* Información Básica */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Información del Profesional</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h3>Oficios</h3>
            <p>{worker.trades.join(', ')}</p>
          </div>
          <div>
            <h3>Experiencia</h3>
            <p>{worker.experience} años</p>
          </div>
          <div>
            <h3>Tarifa</h3>
            <p>${worker.hourlyRate}/hora</p>
          </div>
          <div>
            <h3>Ubicación</h3>
            <p>{worker.location.city}, {worker.location.state}</p>
          </div>
        </div>

        {/* Mapa de ubicación */}
        {worker.location.coordinates && (
          <WorkerMap
            lat={worker.location.coordinates.lat}
            lng={worker.location.coordinates.lng}
            address={`${worker.location.address}, ${worker.location.city}, ${worker.location.state}`}
            name={worker.user.name}
          />
        )}

        {worker.certifications.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>📜 Certificaciones y Cursos de Capacitación</h3>
            <div style={{ display: 'grid', gap: '10px', marginTop: '10px' }}>
              {worker.certifications.map((cert, idx) => (
                <div key={idx} style={{ 
                  padding: '15px', 
                  background: '#f8f9fa', 
                  borderRadius: '4px',
                  borderLeft: '4px solid #007bff'
                }}>
                  <div style={{ fontWeight: 'bold' }}>{cert.name}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{cert.institution}</div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                    {new Date(cert.issueDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Historial de Servicios (Mock) */}
      {worker._id === 'worker3' && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h2 style={{ marginBottom: '20px' }}>📊 Historial de Servicios</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ padding: '15px', background: '#e7f3ff', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>450</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Total Servicios</div>
            </div>
            <div style={{ padding: '15px', background: '#d4edda', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>441</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Completados</div>
            </div>
            <div style={{ padding: '15px', background: '#fff3cd', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>5</div>
              <div style={{ fontSize: '14px', color: '#666' }}>En Progreso</div>
            </div>
            <div style={{ padding: '15px', background: '#f8d7da', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>4</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Cancelados</div>
            </div>
          </div>
          <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '10px' }}>Últimos Servicios Completados</h4>
            <div style={{ display: 'grid', gap: '10px' }}>
              {[
                { title: 'Instalación eléctrica residencial', client: 'María González', date: '2024-01-15', rating: 5 },
                { title: 'Reparación de panel eléctrico', client: 'Juan Pérez', date: '2024-01-10', rating: 5 },
                { title: 'Instalación de iluminación LED', client: 'Ana Martínez', date: '2024-01-05', rating: 5 }
              ].map((service, idx) => (
                <div key={idx} style={{ 
                  padding: '12px', 
                  background: '#fff', 
                  borderRadius: '4px',
                  borderLeft: '3px solid #28a745'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <strong>{service.title}</strong>
                      <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                        Cliente: {service.client} • {new Date(service.date).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                    <span style={{ fontSize: '18px' }}>{'⭐'.repeat(service.rating)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {user && user.role === 'client' && user.id !== worker.user._id && (
          <div>
            <button
              onClick={() => setShowServiceForm(!showServiceForm)}
              className="btn btn-primary"
            >
              Solicitar Servicio
            </button>

            {showServiceForm && (
              <form onSubmit={handleCreateService} style={{ marginTop: '20px' }}>
                <div className="form-group">
                  <label>Título del servicio</label>
                  <input
                    type="text"
                    value={serviceData.title}
                    onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    value={serviceData.description}
                    onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Fecha programada</label>
                  <input
                    type="datetime-local"
                    value={serviceData.scheduledDate}
                    onChange={(e) => setServiceData({ ...serviceData, scheduledDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Horas estimadas</label>
                  <input
                    type="number"
                    value={serviceData.estimatedHours}
                    onChange={(e) => setServiceData({ ...serviceData, estimatedHours: e.target.value })}
                    min="1"
                  />
                </div>
                <button type="submit" className="btn btn-success">Enviar Solicitud</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerProfile;

