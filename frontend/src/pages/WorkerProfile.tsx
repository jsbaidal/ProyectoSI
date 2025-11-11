import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchWorker();
  }, [id]);

  const fetchWorker = async () => {
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
  };

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

  if (loading) return <div className="loading">Cargando...</div>;
  if (!worker) return <div className="container">Trabajador no encontrado</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h1>{worker.user.name}</h1>
            {worker.isVerified && <span style={{ color: '#28a745' }}>✓ Verificado</span>}
            <p><strong>Calificación:</strong> {worker.rating.toFixed(1)} ⭐ ({worker.totalReviews} reseñas)</p>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Oficios</h3>
          <p>{worker.trades.join(', ')}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Experiencia</h3>
          <p>{worker.experience} años</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Tarifa</h3>
          <p>${worker.hourlyRate}/hora</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Ubicación</h3>
          <p>{worker.location.address}, {worker.location.city}, {worker.location.state}</p>
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

        <div style={{ marginBottom: '20px' }}>
          <h3>Descripción</h3>
          <p>{worker.description}</p>
        </div>

        {worker.certifications.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Certificaciones</h3>
            <ul>
              {worker.certifications.map((cert, idx) => (
                <li key={idx}>
                  {cert.name} - {cert.institution} ({new Date(cert.issueDate).getFullYear()})
                </li>
              ))}
            </ul>
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

