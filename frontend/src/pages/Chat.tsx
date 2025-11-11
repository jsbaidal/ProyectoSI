import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { mockApi } from '../services/mockApi';
import { mockDataService } from '../services/mockData';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

const Chat: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { socket } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  const fetchMessages = async () => {
    try {
      const response = await mockApi.get(`/api/chat/${chatId}/messages`);
      const messagesData = response.data.data as Message[];
      if (messagesData) {
        setMessages(messagesData);
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && chatId && user) {
      const message = mockDataService.sendMessage(chatId, user.id, newMessage);
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
      scrollToBottom();
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: 'white', borderRadius: '8px', marginBottom: '20px' }}>
          {messages.map((message) => (
            <div
              key={message._id}
              style={{
                marginBottom: '15px',
                textAlign: message.sender._id === user?.id ? 'right' : 'left'
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  background: message.sender._id === user?.id ? '#007bff' : '#e9ecef',
                  color: message.sender._id === user?.id ? 'white' : 'black',
                  maxWidth: '70%'
                }}
              >
                <div style={{ fontSize: '12px', marginBottom: '5px', opacity: 0.8 }}>
                  {message.sender.name}
                </div>
                <div>{message.content}</div>
                <div style={{ fontSize: '10px', marginTop: '5px', opacity: 0.7 }}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

