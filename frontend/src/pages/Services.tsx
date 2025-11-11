import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { mockDataService } from '../services/mockData';

interface Service {
  _id: string;
  title: string;
  description: string;
  status: string;
  worker?: {
    user: {
      name: string;
    };
  };
  client?: {
    name: string;
  };
  scheduledDate?: string;
  estimatedCost?: number;
  finalCost?: number;
  paymentStatus: string;
}

const Services: React.FC = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = user?.role === 'worker' 
        ? await mockApi.get('/api/services/worker')
        : await mockApi.get('/api/services/me');
      
      const responseData = response.data.data as { services: any[] };
      if (responseData && responseData.services) {
        const servicesData = responseData.services;
        // Enriquecer con datos de trabajadores/clientes
        const enrichedServices = servicesData.map((s: any) => {
          const worker = mockDataService.getWorkerById(s.worker);
          const clientUser = mockDataService.getUserById(s.client);
          return {
            ...s,
            worker: worker ? {
              user: {
                name: worker.user.name
              }
            } : undefined,
            client: clientUser ? {
              name: clientUser.name
            } : undefined
          };
        });
        setServices(enrichedServices);
      }
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="container">
      <h1>Mis Servicios</h1>
      {services.length === 0 ? (
        <div className="card">
          <p>No tienes servicios.</p>
        </div>
      ) : (
        services.map((service) => (
          <div key={service._id} className="card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {user?.role === 'client' && service.worker && (
              <p><strong>Trabajador:</strong> {service.worker.user.name}</p>
            )}
            {user?.role === 'worker' && service.client && (
              <p><strong>Cliente:</strong> {service.client.name}</p>
            )}
            <p><strong>Estado:</strong> {service.status}</p>
            <p><strong>Estado de pago:</strong> {service.paymentStatus}</p>
            {service.scheduledDate && (
              <p><strong>Fecha programada:</strong> {new Date(service.scheduledDate).toLocaleString()}</p>
            )}
            {service.finalCost && (
              <p><strong>Costo final:</strong> ${service.finalCost}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Services;

