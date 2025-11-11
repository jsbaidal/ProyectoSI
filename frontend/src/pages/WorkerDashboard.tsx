import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';
import { mockDataService } from '../services/mockData';

interface Service {
  _id: string;
  title: string;
  description: string;
  status: string;
  client: {
    name: string;
    phone: string;
  };
  scheduledDate?: string;
  estimatedCost?: number;
  finalCost?: number;
}

const WorkerDashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await mockApi.get('/api/services/worker');
      const responseData = response.data.data as { services: any[] };
      if (responseData && responseData.services) {
        const servicesData = responseData.services;
        // Enriquecer con datos de clientes
        const enrichedServices = servicesData.map((s: any) => ({
          ...s,
          client: {
            name: mockDataService.getUserById(s.client)?.name || 'Cliente',
            phone: mockDataService.getUserById(s.client)?.phone || ''
          }
        }));
        setServices(enrichedServices);
      }
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateServiceStatus = async (serviceId: string, status: string) => {
    try {
      await mockApi.put(`/api/services/${serviceId}/status`, { status });
      fetchServices();
    } catch (error: any) {
      alert(error.message || 'Error al actualizar servicio');
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="container">
      <h1>Panel de Trabajador</h1>
      <div>
        {services.length === 0 ? (
          <div className="card">
            <p>No tienes servicios asignados.</p>
          </div>
        ) : (
          services.map((service) => (
            <div key={service._id} className="card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Cliente:</strong> {service.client.name}</p>
              <p><strong>Teléfono:</strong> {service.client.phone}</p>
              <p><strong>Estado:</strong> {service.status}</p>
              {service.scheduledDate && (
                <p><strong>Fecha programada:</strong> {new Date(service.scheduledDate).toLocaleString()}</p>
              )}
              {service.estimatedCost && (
                <p><strong>Costo estimado:</strong> ${service.estimatedCost}</p>
              )}
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                {service.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateServiceStatus(service._id, 'accepted')}
                      className="btn btn-success"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => updateServiceStatus(service._id, 'cancelled')}
                      className="btn btn-secondary"
                    >
                      Rechazar
                    </button>
                  </>
                )}
                {service.status === 'accepted' && (
                  <button
                    onClick={() => updateServiceStatus(service._id, 'in_progress')}
                    className="btn btn-primary"
                  >
                    Iniciar Trabajo
                  </button>
                )}
                {service.status === 'in_progress' && (
                  <button
                    onClick={() => updateServiceStatus(service._id, 'completed')}
                    className="btn btn-success"
                  >
                    Completar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;

