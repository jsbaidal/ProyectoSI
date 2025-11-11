import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';

interface Chat {
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

const ChatsList: React.FC = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await mockApi.get('/api/chat');
      const chatsData = response.data.data as Chat[];
      if (chatsData) {
        setChats(chatsData);
      }
    } catch (error) {
      console.error('Error al obtener chats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="container">
      <h1>Chats</h1>
      {chats.length === 0 ? (
        <div className="card">
          <p>No tienes chats.</p>
        </div>
      ) : (
        chats.map((chat) => {
          const otherParticipant = chat.participants.find(p => p._id !== user?.id);
          return (
            <Link key={chat._id} to={`/chat/${chat._id}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer' }}>
                <h3>{otherParticipant?.name || 'Usuario'}</h3>
                {chat.lastMessage && (
                  <p>{chat.lastMessage.content}</p>
                )}
                {chat.lastMessageAt && (
                  <p style={{ fontSize: '12px', color: '#666' }}>
                    {new Date(chat.lastMessageAt).toLocaleString()}
                  </p>
                )}
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ChatsList;

