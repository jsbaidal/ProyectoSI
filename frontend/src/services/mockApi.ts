// API mock que simula las llamadas al backend
import { mockDataService } from './mockData';

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Auth
  async post(url: string, data: any) {
    await delay(500); // Simular latencia de red

    if (url === '/api/auth/register') {
      const result = await mockDataService.register(data);
      return { data: { success: true, data: result } };
    }

    if (url === '/api/auth/login') {
      const result = await mockDataService.login(data.email, data.password);
      return { data: { success: true, data: result } };
    }

    if (url === '/api/services') {
      const result = mockDataService.createService(data);
      return { data: { success: true, data: result } };
    }

    if (url === '/api/chat') {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('No autorizado');
      const result = mockDataService.getOrCreateChat(userId, data.participantId, data.serviceId);
      return { data: { success: true, data: result } };
    }

    throw new Error(`Endpoint no implementado: ${url}`);
  },

  async get(url: string) {
    await delay(300);

    if (url === '/api/auth/me') {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No autorizado');
      
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('Usuario no encontrado');
      
      const user = mockDataService.getUserById(userId);
      if (!user) throw new Error('Usuario no encontrado');
      
      return { data: { success: true, data: user } };
    }

    if (url.startsWith('/api/workers/search')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const filters: any = {};
      params.forEach((value, key) => {
        filters[key] = value;
      });
      const results = mockDataService.searchWorkers(filters);
      return { 
        data: { 
          success: true, 
          data: { 
            workers: results, 
            total: results.length,
            page: 1,
            limit: 10,
            totalPages: 1
          } 
        } 
      };
    }

    if (url.startsWith('/api/workers/') && !url.includes('/search')) {
      const id = url.split('/').pop();
      if (id === 'me') {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('No autorizado');
        const worker = mockDataService.getWorkerByUserId(userId);
        if (!worker) {
          return { data: { success: false, message: 'Perfil no encontrado' } };
        }
        return { data: { success: true, data: worker } };
      } else {
        const worker = mockDataService.getWorkerById(id!);
        if (!worker) throw new Error('Trabajador no encontrado');
        return { data: { success: true, data: worker } };
      }
    }

    if (url === '/api/services/me') {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('No autorizado');
      const services = mockDataService.getServicesByClient(userId);
      return { 
        data: { 
          success: true, 
          data: { 
            services, 
            total: services.length,
            page: 1,
            limit: 10,
            totalPages: 1
          } 
        } 
      };
    }

    if (url === '/api/services/worker') {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('No autorizado');
      const worker = mockDataService.getWorkerByUserId(userId);
      if (!worker) throw new Error('Trabajador no encontrado');
      const services = mockDataService.getServicesByWorker(worker._id);
      return { 
        data: { 
          success: true, 
          data: { 
            services, 
            total: services.length,
            page: 1,
            limit: 10,
            totalPages: 1
          } 
        } 
      };
    }

    if (url.startsWith('/api/services/') && !url.includes('/worker') && !url.includes('/me')) {
      const id = url.split('/').pop();
      const service = mockDataService.getServiceById(id!);
      if (!service) throw new Error('Servicio no encontrado');
      return { data: { success: true, data: service } };
    }

    if (url === '/api/chat') {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('No autorizado');
      const chats = mockDataService.getChatsByUser(userId);
      return { data: { success: true, data: chats } };
    }

    if (url.startsWith('/api/chat/') && url.endsWith('/messages')) {
      const chatId = url.split('/')[3];
      const messages = mockDataService.getChatMessages(chatId);
      return { data: { success: true, data: messages } };
    }

    throw new Error(`Endpoint no implementado: ${url}`);
  },

  async put(url: string, data: any) {
    await delay(300);

    if (url === '/api/users/profile') {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('No autorizado');
      // Actualizar usuario (simplificado)
      return { data: { success: true, data: { id: userId, ...data } } };
    }

    if (url === '/api/workers' || url === '/api/workers/') {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('No autorizado');
      const result = mockDataService.createOrUpdateWorker(userId, data);
      return { data: { success: true, data: result } };
    }

    if (url.startsWith('/api/services/') && url.endsWith('/status')) {
      const id = url.split('/')[3];
      const result = mockDataService.updateServiceStatus(id, data.status, data.finalCost);
      if (!result) throw new Error('Servicio no encontrado');
      return { data: { success: true, data: result } };
    }

    throw new Error(`Endpoint no implementado: ${url}`);
  }
};

