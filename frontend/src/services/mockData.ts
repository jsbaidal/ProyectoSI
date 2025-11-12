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
      name: 'Carlos',
      email: 'carlos@example.com',
      phone: '+1234567892',
      avatar: ''
    },
    trades: ['electricista'],
    experience: 10,
    hourlyRate: 40,
    description: 'Soy Carlos, electricista desde hace diez años. Gracias a Oficios Ya, conseguí estabilidad, cursos de capacitación y ahora tengo más de 300 clientes satisfechos. Mi perfil muestra mis calificaciones e historial de servicios.',
    location: {
      address: 'Boulevard Insurgentes 789',
      city: 'Monterrey',
      state: 'Nuevo León',
      coordinates: { lat: 25.6866, lng: -100.3161 }
    },
    rating: 4.9,
    totalReviews: 312,
    isVerified: true,
    certifications: [
      {
        name: 'Certificación en Instalaciones Eléctricas',
        institution: 'Instituto de Electricistas Certificados',
        issueDate: '2018-05-15'
      },
      {
        name: 'Curso de Seguridad Eléctrica',
        institution: 'Oficios Ya - Capacitación',
        issueDate: '2023-03-20'
      },
      {
        name: 'Certificación en Energías Renovables',
        institution: 'Centro de Capacitación Técnica',
        issueDate: '2022-11-10'
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
    // Inicializar servicios completados de ejemplo para trabajadores
    this.initializeCompletedServices();
    // Inicializar chats y mensajes de ejemplo
    this.initializeExampleChats();
  }

  private initializeExampleUsers() {
    // Crear usuarios de ejemplo (clientes y trabajadores) si no existen
    const exampleUsers = [
      // Usuario Cliente Maestre (perfil de prueba fijo)
      {
        id: 'maestre',
        email: 'maestre@test.com',
        password: '123456',
        name: 'Maestre',
        phone: '+1234567800',
        role: 'client' as const,
        isVerified: false
      },
      // Usuario Cliente
      {
        id: 'client1',
        email: 'cliente@test.com',
        password: '123456',
        name: 'Cliente Ejemplo',
        phone: '+1234567899',
        role: 'client' as const,
        isVerified: false
      },
      // Trabajadores
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
        name: 'Carlos',
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

  private initializeCompletedServices() {
    // Obtener IDs de trabajadores
    const juanWorker = this.workers.find(w => w.user.email === 'juan@example.com');
    const mariaWorker = this.workers.find(w => w.user.email === 'maria@example.com');
    const carlosWorker = this.workers.find(w => w.user.email === 'carlos@example.com');
    const clientUser = this.users.find(u => u.email === 'cliente@test.com');

    if (!clientUser) return;

    const completedServices: MockService[] = [];

    // Servicios completados para Juan (Plomero/Electricista)
    if (juanWorker) {
      const juanServices = [
        {
          _id: `service_juan_1_${Date.now()}`,
          client: clientUser.id,
          worker: juanWorker._id,
          trade: 'Plomería',
          title: 'Reparación de fuga en baño principal',
          description: 'Reparación de fuga de agua en el grifo del lavabo del baño principal. Se reemplazó la válvula y se sellaron las conexiones.',
          location: {
            address: 'Av. Principal 123',
            city: 'Ciudad de México',
            state: 'CDMX',
            coordinates: { lat: 19.4326, lng: -99.1332 }
          },
          scheduledDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Hace 30 días
          estimatedHours: 3,
          estimatedCost: 3 * juanWorker.hourlyRate,
          finalCost: 3 * juanWorker.hourlyRate,
          status: 'completed' as const,
          paymentStatus: 'paid' as const,
          createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: `service_juan_2_${Date.now()}`,
          client: clientUser.id,
          worker: juanWorker._id,
          trade: 'Electricidad',
          title: 'Instalación de ventilador de techo',
          description: 'Instalación completa de ventilador de techo en sala, incluyendo cableado eléctrico y montaje.',
          location: {
            address: 'Calle Reforma 456',
            city: 'Ciudad de México',
            state: 'CDMX',
            coordinates: { lat: 19.4326, lng: -99.1332 }
          },
          scheduledDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // Hace 60 días
          estimatedHours: 4,
          estimatedCost: 4 * juanWorker.hourlyRate,
          finalCost: 4 * juanWorker.hourlyRate,
          status: 'completed' as const,
          paymentStatus: 'paid' as const,
          createdAt: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: `service_juan_3_${Date.now()}`,
          client: clientUser.id,
          worker: juanWorker._id,
          trade: 'Plomería',
          title: 'Mantenimiento de sistema de calentador',
          description: 'Limpieza y mantenimiento preventivo del calentador de agua, revisión de válvulas y conexiones.',
          location: {
            address: 'Av. Insurgentes 789',
            city: 'Ciudad de México',
            state: 'CDMX',
            coordinates: { lat: 19.4326, lng: -99.1332 }
          },
          scheduledDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // Hace 90 días
          estimatedHours: 2,
          estimatedCost: 2 * juanWorker.hourlyRate,
          finalCost: 2 * juanWorker.hourlyRate,
          status: 'completed' as const,
          paymentStatus: 'paid' as const,
          createdAt: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      completedServices.push(...juanServices);
    }

    // Servicios completados para María (Carpintera/Pintora)
    if (mariaWorker) {
      const mariaServices = [
        {
          _id: `service_maria_1_${Date.now()}`,
          client: clientUser.id,
          worker: mariaWorker._id,
          trade: 'Carpintería',
          title: 'Construcción de estantería personalizada',
          description: 'Diseño y construcción de estantería de madera para sala de estar, incluyendo acabados y barniz.',
          location: {
            address: 'Calle Juárez 321',
            city: 'Guadalajara',
            state: 'Jalisco',
            coordinates: { lat: 20.6597, lng: -103.3496 }
          },
          scheduledDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // Hace 25 días
          estimatedHours: 8,
          estimatedCost: 8 * mariaWorker.hourlyRate,
          finalCost: 8 * mariaWorker.hourlyRate,
          status: 'completed' as const,
          paymentStatus: 'paid' as const,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: `service_maria_2_${Date.now()}`,
          client: clientUser.id,
          worker: mariaWorker._id,
          trade: 'Pintura',
          title: 'Pintura completa de interiores',
          description: 'Pintura de todas las habitaciones de la casa, incluyendo preparación de superficies y aplicación de dos manos.',
          location: {
            address: 'Av. López Mateos 654',
            city: 'Guadalajara',
            state: 'Jalisco',
            coordinates: { lat: 20.6597, lng: -103.3496 }
          },
          scheduledDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(), // Hace 50 días
          estimatedHours: 12,
          estimatedCost: 12 * mariaWorker.hourlyRate,
          finalCost: 12 * mariaWorker.hourlyRate,
          status: 'completed' as const,
          paymentStatus: 'paid' as const,
          createdAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: `service_maria_3_${Date.now()}`,
          client: clientUser.id,
          worker: mariaWorker._id,
          trade: 'Carpintería',
          title: 'Reparación de puertas y marcos',
          description: 'Reparación de 3 puertas que no cerraban correctamente y ajuste de marcos de madera.',
          location: {
            address: 'Calle Hidalgo 987',
            city: 'Guadalajara',
            state: 'Jalisco',
            coordinates: { lat: 20.6597, lng: -103.3496 }
          },
          scheduledDate: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(), // Hace 75 días
          estimatedHours: 5,
          estimatedCost: 5 * mariaWorker.hourlyRate,
          finalCost: 5 * mariaWorker.hourlyRate,
          status: 'completed' as const,
          paymentStatus: 'paid' as const,
          createdAt: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      completedServices.push(...mariaServices);
    }

    // Servicios completados para Carlos (Electricista)
    if (carlosWorker) {
      const carlosServices = [
        {
          _id: `service_carlos_1_${Date.now()}`,
          client: clientUser.id,
          worker: carlosWorker._id,
          trade: 'Electricidad',
          title: 'Instalación de sistema de iluminación LED',
          description: 'Instalación completa de sistema de iluminación LED en toda la casa, incluyendo cableado nuevo y conexión a interruptores inteligentes.',
          location: {
            address: 'Av. Revolución 147',
            city: 'Monterrey',
            state: 'Nuevo León',
            coordinates: { lat: 25.6866, lng: -100.3161 }
          },
          scheduledDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // Hace 20 días
          estimatedHours: 10,
          estimatedCost: 10 * carlosWorker.hourlyRate,
          finalCost: 10 * carlosWorker.hourlyRate,
          status: 'completed' as const,
          paymentStatus: 'paid' as const,
          createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: `service_carlos_2_${Date.now()}`,
          client: clientUser.id,
          worker: carlosWorker._id,
          trade: 'Electricidad',
          title: 'Reparación de cortocircuito en panel eléctrico',
          description: 'Diagnóstico y reparación de cortocircuito en el panel eléctrico principal, reemplazo de breakers defectuosos.',
          location: {
            address: 'Calle Zaragoza 258',
            city: 'Monterrey',
            state: 'Nuevo León',
            coordinates: { lat: 25.6866, lng: -100.3161 }
          },
          scheduledDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // Hace 45 días
          estimatedHours: 4,
          estimatedCost: 4 * carlosWorker.hourlyRate,
          finalCost: 4 * carlosWorker.hourlyRate,
          status: 'completed' as const,
          paymentStatus: 'paid' as const,
          createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: `service_carlos_3_${Date.now()}`,
          client: clientUser.id,
          worker: carlosWorker._id,
          trade: 'Electricidad',
          title: 'Instalación de tomas eléctricas adicionales',
          description: 'Instalación de 6 tomas eléctricas nuevas en diferentes habitaciones, cumpliendo con código eléctrico.',
          location: {
            address: 'Av. Constitución 369',
            city: 'Monterrey',
            state: 'Nuevo León',
            coordinates: { lat: 25.6866, lng: -100.3161 }
          },
          scheduledDate: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(), // Hace 70 días
          estimatedHours: 6,
          estimatedCost: 6 * carlosWorker.hourlyRate,
          finalCost: 6 * carlosWorker.hourlyRate,
          status: 'completed' as const,
          paymentStatus: 'paid' as const,
          createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      completedServices.push(...carlosServices);
    }

    // Agregar servicios solo si no existen ya
    let hasNewServices = false;
    completedServices.forEach(service => {
      const exists = this.services.find(s => 
        s.worker === service.worker && 
        s.title === service.title &&
        s.status === 'completed'
      );
      if (!exists) {
        this.services.push(service);
        hasNewServices = true;
      }
    });

    // Guardar si se agregaron nuevos servicios
    if (hasNewServices) {
      this.saveToStorage();
    }
  }

  private initializeExampleChats() {
    const maestreUser = this.users.find(u => u.id === 'maestre');
    const juanUser = this.users.find(u => u.email === 'juan@example.com');
    const mariaUser = this.users.find(u => u.email === 'maria@example.com');
    const carlosUser = this.users.find(u => u.email === 'carlos@example.com');

    if (!maestreUser) return;

    // Función helper para crear mensajes con timestamps realistas
    const createMessage = (chatId: string, senderId: string, content: string, minutesAgo: number): MockMessage => {
      const sender = this.getUserById(senderId);
      const date = new Date();
      date.setMinutes(date.getMinutes() - minutesAgo);
      
      return {
        _id: `msg_${chatId}_${Date.now()}_${minutesAgo}`,
        chat: chatId,
        sender: {
          _id: sender!.id,
          name: sender!.name,
          avatar: sender!.avatar
        },
        content,
        read: minutesAgo > 10, // Mensajes antiguos están leídos
        createdAt: date.toISOString()
      };
    };

    // Chat 1: Maestre con Juan (Plomero)
    if (juanUser) {
      const chatId1 = 'chat_maestre_juan';
      let chat1 = this.chats.find(c => c._id === chatId1);
      
      if (!chat1) {
        chat1 = {
          _id: chatId1,
          participants: [
            { _id: maestreUser.id, name: maestreUser.name, avatar: maestreUser.avatar },
            { _id: juanUser.id, name: juanUser.name, avatar: juanUser.avatar }
          ]
        };
        this.chats.push(chat1);
      }

      if (!this.messages[chatId1] || this.messages[chatId1].length === 0) {
        this.messages[chatId1] = [
          createMessage(chatId1, maestreUser.id, 'Hola Juan, necesito reparar una fuga de agua en mi baño. ¿Estás disponible?', 120),
          createMessage(chatId1, juanUser.id, 'Hola Maestre, sí estoy disponible. ¿Podrías darme más detalles sobre la fuga?', 118),
          createMessage(chatId1, maestreUser.id, 'Es en el grifo del lavabo, está goteando constantemente. Ya intenté apretarlo pero no funcionó.', 115),
          createMessage(chatId1, juanUser.id, 'Entiendo, probablemente necesite cambiar la válvula. ¿En qué zona vives?', 113),
          createMessage(chatId1, maestreUser.id, 'Vivo en Ciudad de México, cerca del centro. ¿Cuánto cobrarías?', 110),
          createMessage(chatId1, juanUser.id, 'Para ese tipo de reparación cobro $30/hora. Normalmente toma entre 2-3 horas, así que serían aproximadamente $75-90 más el costo de la válvula que es como $15.', 108),
          createMessage(chatId1, maestreUser.id, 'Perfecto, me parece bien. ¿Podrías venir mañana en la tarde?', 105),
          createMessage(chatId1, juanUser.id, 'Sí, puedo ir mañana a las 3pm. ¿Te funciona esa hora?', 103),
          createMessage(chatId1, maestreUser.id, 'Perfecto, a las 3pm está bien. Te paso mi dirección por aquí o prefieres que la ponga en la solicitud?', 100),
          createMessage(chatId1, juanUser.id, 'Puedes ponerla en la solicitud, así queda registrado. Te confirmo mañana antes de ir.', 98),
          createMessage(chatId1, maestreUser.id, 'Perfecto, gracias. Nos vemos mañana entonces.', 95)
        ];
        chat1.lastMessage = { content: this.messages[chatId1][this.messages[chatId1].length - 1].content, createdAt: this.messages[chatId1][this.messages[chatId1].length - 1].createdAt };
        chat1.lastMessageAt = this.messages[chatId1][this.messages[chatId1].length - 1].createdAt;
      }
    }

    // Chat 2: Maestre con María (Carpintera/Pintora)
    if (mariaUser) {
      const chatId2 = 'chat_maestre_maria';
      let chat2 = this.chats.find(c => c._id === chatId2);
      
      if (!chat2) {
        chat2 = {
          _id: chatId2,
          participants: [
            { _id: maestreUser.id, name: maestreUser.name, avatar: maestreUser.avatar },
            { _id: mariaUser.id, name: mariaUser.name, avatar: mariaUser.avatar }
          ]
        };
        this.chats.push(chat2);
      }

      if (!this.messages[chatId2] || this.messages[chatId2].length === 0) {
        this.messages[chatId2] = [
          createMessage(chatId2, maestreUser.id, 'Hola María, vi tu perfil y me interesa que me hagas una estantería personalizada para mi sala.', 90),
          createMessage(chatId2, mariaUser.id, 'Hola! Claro, me encantaría ayudarte. ¿Qué medidas necesitas y qué estilo te gusta?', 88),
          createMessage(chatId2, maestreUser.id, 'Necesito algo de aproximadamente 2 metros de ancho por 1.5 de alto. Me gusta el estilo moderno con madera clara.', 85),
          createMessage(chatId2, mariaUser.id, 'Perfecto, puedo hacerla en pino o roble claro. El roble es más resistente pero un poco más caro. ¿Cuál prefieres?', 83),
          createMessage(chatId2, maestreUser.id, '¿Cuál es la diferencia de precio?', 80),
          createMessage(chatId2, mariaUser.id, 'En pino te saldría alrededor de $400-450, y en roble $550-600. Ambos con acabado de barniz incluido.', 78),
          createMessage(chatId2, maestreUser.id, 'Creo que voy con el roble entonces, quiero que dure. ¿Cuánto tiempo te tomaría?', 75),
          createMessage(chatId2, mariaUser.id, 'Aproximadamente 5-7 días hábiles. Puedo empezar la próxima semana si te funciona.', 73),
          createMessage(chatId2, maestreUser.id, 'Perfecto, la próxima semana está bien. ¿Necesitas venir a tomar medidas?', 70),
          createMessage(chatId2, mariaUser.id, 'Sí, sería ideal que vaya a ver el espacio. ¿Qué día te viene mejor?', 68),
          createMessage(chatId2, maestreUser.id, 'El lunes o martes en la tarde me funcionan bien.', 65),
          createMessage(chatId2, mariaUser.id, 'Perfecto, voy el lunes a las 4pm. Te confirmo el día antes.', 63)
        ];
        chat2.lastMessage = { content: this.messages[chatId2][this.messages[chatId2].length - 1].content, createdAt: this.messages[chatId2][this.messages[chatId2].length - 1].createdAt };
        chat2.lastMessageAt = this.messages[chatId2][this.messages[chatId2].length - 1].createdAt;
      }
    }

    // Chat 3: Maestre con Carlos (Electricista)
    if (carlosUser) {
      const chatId3 = 'chat_maestre_carlos';
      let chat3 = this.chats.find(c => c._id === chatId3);
      
      if (!chat3) {
        chat3 = {
          _id: chatId3,
          participants: [
            { _id: maestreUser.id, name: maestreUser.name, avatar: maestreUser.avatar },
            { _id: carlosUser.id, name: carlosUser.name, avatar: carlosUser.avatar }
          ]
        };
        this.chats.push(chat3);
      }

      if (!this.messages[chatId3] || this.messages[chatId3].length === 0) {
        this.messages[chatId3] = [
          createMessage(chatId3, maestreUser.id, 'Hola Carlos, necesito instalar iluminación LED en mi casa. Vi que tienes mucha experiencia.', 60),
          createMessage(chatId3, carlosUser.id, 'Hola Maestre! Sí, tengo bastante experiencia con instalaciones LED. ¿Cuántas habitaciones quieres iluminar?', 58),
          createMessage(chatId3, maestreUser.id, 'Son 3 habitaciones y la sala. Quiero que sea con dimmer para poder regular la intensidad.', 55),
          createMessage(chatId3, carlosUser.id, 'Perfecto, puedo hacerlo. Para 4 espacios con dimmers, el trabajo completo incluyendo materiales te saldría alrededor de $800-900.', 53),
          createMessage(chatId3, maestreUser.id, '¿Eso incluye las luces LED también?', 50),
          createMessage(chatId3, carlosUser.id, 'Sí, incluye las luces LED, los dimmers, cableado y la instalación completa. Todo con garantía de 1 año.', 48),
          createMessage(chatId3, maestreUser.id, 'Suena bien. ¿Cuánto tiempo te tomaría?', 45),
          createMessage(chatId3, carlosUser.id, 'Aproximadamente 6-8 horas de trabajo. Puedo hacerlo en un día o dividirlo en dos días si prefieres.', 43),
          createMessage(chatId3, maestreUser.id, 'Prefiero que sea en un día si es posible. ¿Cuándo podrías venir?', 40),
          createMessage(chatId3, carlosUser.id, 'Puedo ir este sábado desde las 8am. ¿Te funciona?', 38),
          createMessage(chatId3, maestreUser.id, 'Perfecto, el sábado a las 8am está bien. ¿Necesitas algo especial de mi parte?', 35),
          createMessage(chatId3, carlosUser.id, 'Solo que tengas las habitaciones despejadas para trabajar cómodamente. El sábado te confirmo antes de ir.', 33),
          createMessage(chatId3, maestreUser.id, 'Perfecto, estaré listo. Gracias Carlos!', 30)
        ];
        chat3.lastMessage = { content: this.messages[chatId3][this.messages[chatId3].length - 1].content, createdAt: this.messages[chatId3][this.messages[chatId3].length - 1].createdAt };
        chat3.lastMessageAt = this.messages[chatId3][this.messages[chatId3].length - 1].createdAt;
      }
    }

    // Guardar si se crearon nuevos chats o mensajes
    if (this.chats.length > 0 || Object.keys(this.messages).length > 0) {
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

  getCompletedServicesByWorker(workerId: string): MockService[] {
    return this.services
      .filter(s => s.worker === workerId && s.status === 'completed')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

