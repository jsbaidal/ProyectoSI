// Datos simulados para el prototipo

export interface MockUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'worker' | 'admin';
  avatar?: string;
  isVerified: boolean;
  password?: string; // Solo para simulación
}

export interface MockWorker {
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
    coordinates: {
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

export interface MockService {
  _id: string;
  client: string;
  worker: string;
  trade: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  scheduledDate?: string;
  estimatedHours?: number;
  estimatedCost?: number;
  finalCost?: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

export interface MockChat {
  _id: string;
  participants: Array<{
    _id: string;
    name: string;
    avatar?: string;
  }>;
  lastMessage?: {
    content: string;
    createdAt: string;
  };
  lastMessageAt?: string;
}

export interface MockMessage {
  _id: string;
  chat: string;
  sender: {
    _id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  read: boolean;
  createdAt: string;
}

// Datos de ejemplo
export const mockWorkers: MockWorker[] = [
  {
    _id: 'worker1',
    user: {
      _id: 'user1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '+1234567890',
      avatar: ''
    },
    trades: ['plomero', 'electricista'],
    experience: 8,
    hourlyRate: 30,
    description: 'Plomero y electricista con más de 8 años de experiencia. Especializado en reparaciones residenciales y comerciales.',
    location: {
      address: 'Calle Principal 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      coordinates: { lat: 19.4326, lng: -99.1332 }
    },
    rating: 4.8,
    totalReviews: 45,
    isVerified: true,
    certifications: [
      {
        name: 'Certificación en Plomería',
        institution: 'Instituto Nacional de Plomería',
        issueDate: '2020-01-15'
      }
    ],
    portfolio: []
  },
  {
    _id: 'worker2',
    user: {
      _id: 'user2',
      name: 'María González',
      email: 'maria@example.com',
      phone: '+1234567891',
      avatar: ''
    },
    trades: ['carpintero', 'pintor'],
    experience: 5,
    hourlyRate: 25,
    description: 'Carpintera y pintora profesional. Trabajos de calidad en muebles, puertas, ventanas y pintura de interiores.',
    location: {
      address: 'Avenida Reforma 456',
      city: 'Guadalajara',
      state: 'Jalisco',
      coordinates: { lat: 20.6597, lng: -103.3496 }
    },
    rating: 4.9,
    totalReviews: 32,
    isVerified: true,
    certifications: [
      {
        name: 'Certificación en Carpintería',
        institution: 'Escuela de Artes y Oficios',
        issueDate: '2019-06-20'
      }
    ],
    portfolio: []
  },
  {
    _id: 'worker3',
    user: {
      _id: 'user3',
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      phone: '+1234567892',
      avatar: ''
    },
    trades: ['albañil', 'constructor'],
    experience: 12,
    hourlyRate: 35,
    description: 'Albañil y constructor con amplia experiencia en construcción y remodelación. Trabajos garantizados.',
    location: {
      address: 'Boulevard Insurgentes 789',
      city: 'Monterrey',
      state: 'Nuevo León',
      coordinates: { lat: 25.6866, lng: -100.3161 }
    },
    rating: 4.7,
    totalReviews: 67,
    isVerified: true,
    certifications: [
      {
        name: 'Licencia de Constructor',
        institution: 'Colegio de Ingenieros',
        issueDate: '2015-03-10'
      }
    ],
    portfolio: []
  }
];

// Coordenadas de ejemplo por ciudad (para prototipo)
const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
  'Ciudad de México': { lat: 19.4326, lng: -99.1332 },
  'CDMX': { lat: 19.4326, lng: -99.1332 },
  'Guadalajara': { lat: 20.6597, lng: -103.3496 },
  'Jalisco': { lat: 20.6597, lng: -103.3496 },
  'Monterrey': { lat: 25.6866, lng: -100.3161 },
  'Nuevo León': { lat: 25.6866, lng: -100.3161 },
  'Puebla': { lat: 19.0414, lng: -98.2063 },
  'Cancún': { lat: 21.1619, lng: -86.8515 },
  'Tijuana': { lat: 32.5149, lng: -117.0382 },
  'Mérida': { lat: 20.9674, lng: -89.5926 }
};

// Función helper para obtener coordenadas por ciudad
function getCoordinatesByCity(city: string, state: string): { lat: number; lng: number } {
  const cityKey = city.trim();
  const stateKey = state.trim();
  
  // Buscar por ciudad
  if (cityCoordinates[cityKey]) {
    return cityCoordinates[cityKey];
  }
  
  // Buscar por estado
  if (cityCoordinates[stateKey]) {
    return cityCoordinates[stateKey];
  }
  
  // Coordenadas por defecto (centro de México)
  return { lat: 19.4326, lng: -99.1332 };
}

// Servicio de datos mock
class MockDataService {
  private users: MockUser[] = [];
  private workers: MockWorker[] = [...mockWorkers];
  private services: MockService[] = [];
  private chats: MockChat[] = [];
  private messages: { [chatId: string]: MockMessage[] } = {};

  constructor() {
    // Cargar datos del localStorage si existen
    this.loadFromStorage();
    // Inicializar usuarios para trabajadores de ejemplo si no existen
    this.initializeExampleUsers();
  }

  private initializeExampleUsers() {
    // Crear usuarios para los trabajadores de ejemplo si no existen
    const exampleUsers = [
      {
        id: 'user1',
        email: 'juan@example.com',
        password: '123456',
        name: 'Juan Pérez',
        phone: '+1234567890',
        role: 'worker' as const,
        isVerified: true
      },
      {
        id: 'user2',
        email: 'maria@example.com',
        password: '123456',
        name: 'María González',
        phone: '+1234567891',
        role: 'worker' as const,
        isVerified: true
      },
      {
        id: 'user3',
        email: 'carlos@example.com',
        password: '123456',
        name: 'Carlos Rodríguez',
        phone: '+1234567892',
        role: 'worker' as const,
        isVerified: true
      }
    ];

    let hasNewUsers = false;

    // Agregar usuarios solo si no existen
    exampleUsers.forEach(exampleUser => {
      const exists = this.users.find(u => u.id === exampleUser.id || u.email === exampleUser.email);
      if (!exists) {
        this.users.push(exampleUser);
        hasNewUsers = true;
      }
    });

    // Guardar si se agregaron nuevos usuarios
    if (hasNewUsers) {
      this.saveToStorage();
    }
  }

  private loadFromStorage() {
    const storedUsers = localStorage.getItem('mock_users');
    const storedWorkers = localStorage.getItem('mock_workers');
    const storedServices = localStorage.getItem('mock_services');
    const storedChats = localStorage.getItem('mock_chats');
    const storedMessages = localStorage.getItem('mock_messages');

    if (storedUsers) this.users = JSON.parse(storedUsers);
    if (storedWorkers) this.workers = JSON.parse(storedWorkers);
    if (storedServices) this.services = JSON.parse(storedServices);
    if (storedChats) this.chats = JSON.parse(storedChats);
    if (storedMessages) this.messages = JSON.parse(storedMessages);
  }

  private saveToStorage() {
    localStorage.setItem('mock_users', JSON.stringify(this.users));
    localStorage.setItem('mock_workers', JSON.stringify(this.workers));
    localStorage.setItem('mock_services', JSON.stringify(this.services));
    localStorage.setItem('mock_chats', JSON.stringify(this.chats));
    localStorage.setItem('mock_messages', JSON.stringify(this.messages));
  }

  // Auth
  async register(data: { name: string; email: string; password: string; phone: string; role?: string }): Promise<{ user: MockUser; token: string }> {
    const existingUser = this.users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const newUser: MockUser = {
      id: `user_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: (data.role as any) || 'client',
      isVerified: false,
      password: data.password
    };

    this.users.push(newUser);
    this.saveToStorage();

    const { password, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: `mock_token_${Date.now()}`
    };
  }

  async login(email: string, password: string): Promise<{ user: MockUser; token: string }> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: `mock_token_${Date.now()}`
    };
  }

  getUserById(id: string): MockUser | undefined {
    return this.users.find(u => u.id === id);
  }

  // Workers
  searchWorkers(filters: any): MockWorker[] {
    let results = [...this.workers];

    if (filters.trade) {
      results = results.filter(w => 
        w.trades.some(t => t.toLowerCase().includes(filters.trade.toLowerCase()))
      );
    }

    if (filters.city) {
      results = results.filter(w => 
        w.location.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.state) {
      results = results.filter(w => 
        w.location.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    if (filters.minRating) {
      results = results.filter(w => w.rating >= parseFloat(filters.minRating));
    }

    if (filters.maxPrice) {
      results = results.filter(w => w.hourlyRate <= parseFloat(filters.maxPrice));
    }

    if (filters.verified === 'true') {
      results = results.filter(w => w.isVerified);
    }

    return results.sort((a, b) => b.rating - a.rating);
  }

  getWorkerById(id: string): MockWorker | undefined {
    return this.workers.find(w => w._id === id);
  }

  getWorkerByUserId(userId: string): MockWorker | undefined {
    return this.workers.find(w => w.user._id === userId);
  }

  createOrUpdateWorker(userId: string, data: any): MockWorker {
    const existing = this.workers.find(w => w.user._id === userId);
    const user = this.getUserById(userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (existing) {
      // Actualizar coordenadas si se actualiza la ubicación
      if (data.location) {
        const location = data.location;
        const coordinates = location.coordinates || getCoordinatesByCity(location.city || '', location.state || '');
        data.location = {
          ...location,
          coordinates: coordinates
        };
      }
      
      Object.assign(existing, {
        ...data,
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar
        }
      });
      this.saveToStorage();
      return existing;
    } else {
      // Obtener coordenadas basadas en la ciudad/estado
      const location = data.location || { address: '', city: '', state: '' };
      const coordinates = location.coordinates || getCoordinatesByCity(location.city || '', location.state || '');
      
      const newWorker: MockWorker = {
        _id: `worker_${Date.now()}`,
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar
        },
        trades: data.trades || [],
        experience: data.experience || 0,
        hourlyRate: data.hourlyRate || 0,
        description: data.description || '',
        location: {
          address: location.address || '',
          city: location.city || '',
          state: location.state || '',
          coordinates: coordinates
        },
        rating: 0,
        totalReviews: 0,
        isVerified: false,
        certifications: [],
        portfolio: []
      };
      this.workers.push(newWorker);
      this.saveToStorage();
      return newWorker;
    }
  }

  // Services
  createService(data: any): MockService {
    const newService: MockService = {
      _id: `service_${Date.now()}`,
      client: data.client,
      worker: data.worker,
      trade: data.trade,
      title: data.title,
      description: data.description,
      location: data.location,
      scheduledDate: data.scheduledDate,
      estimatedHours: data.estimatedHours,
      estimatedCost: data.estimatedHours ? data.estimatedHours * (this.getWorkerById(data.worker)?.hourlyRate || 0) : undefined,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString()
    };

    this.services.push(newService);
    this.saveToStorage();
    return newService;
  }

  getServicesByClient(clientId: string): MockService[] {
    return this.services.filter(s => s.client === clientId);
  }

  getServicesByWorker(workerId: string): MockService[] {
    return this.services.filter(s => s.worker === workerId);
  }

  getServiceById(id: string): MockService | undefined {
    return this.services.find(s => s._id === id);
  }

  updateServiceStatus(id: string, status: string, finalCost?: number): MockService | undefined {
    const service = this.services.find(s => s._id === id);
    if (service) {
      service.status = status as any;
      if (finalCost) service.finalCost = finalCost;
      this.saveToStorage();
    }
    return service;
  }

  // Chats
  getOrCreateChat(userId1: string, userId2: string, serviceId?: string): MockChat {
    let chat = this.chats.find(c => 
      c.participants.some(p => p._id === userId1) &&
      c.participants.some(p => p._id === userId2)
    );

    if (!chat) {
      const user1 = this.getUserById(userId1);
      const user2 = this.getUserById(userId2);
      
      if (!user1 || !user2) {
        throw new Error('Usuario no encontrado');
      }
      
      chat = {
        _id: `chat_${Date.now()}`,
        participants: [
          { _id: user1.id, name: user1.name, avatar: user1.avatar },
          { _id: user2.id, name: user2.name, avatar: user2.avatar }
        ]
      };
      this.chats.push(chat);
      this.saveToStorage();
    }

    return chat;
  }

  getChatsByUser(userId: string): MockChat[] {
    return this.chats.filter(c => c.participants.some(p => p._id === userId));
  }

  getChatMessages(chatId: string): MockMessage[] {
    return this.messages[chatId] || [];
  }

  sendMessage(chatId: string, senderId: string, content: string): MockMessage {
    if (!this.messages[chatId]) {
      this.messages[chatId] = [];
    }

    const sender = this.getUserById(senderId);
    const message: MockMessage = {
      _id: `msg_${Date.now()}`,
      chat: chatId,
      sender: {
        _id: sender!.id,
        name: sender!.name,
        avatar: sender!.avatar
      },
      content,
      read: false,
      createdAt: new Date().toISOString()
    };

    this.messages[chatId].push(message);

    // Actualizar último mensaje del chat
    const chat = this.chats.find(c => c._id === chatId);
    if (chat) {
      chat.lastMessage = { content, createdAt: message.createdAt };
      chat.lastMessageAt = message.createdAt;
    }

    this.saveToStorage();
    return message;
  }
}

export const mockDataService = new MockDataService();

