import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkerSearch from './pages/WorkerSearch';
import WorkerProfile from './pages/WorkerProfile';
import MyProfile from './pages/MyProfile';
import WorkerDashboard from './pages/WorkerDashboard';
import Services from './pages/Services';
import Chat from './pages/Chat';
import ChatsList from './pages/ChatsList';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/search"
                element={
                  <PrivateRoute>
                    <WorkerSearch />
                  </PrivateRoute>
                }
              />
              <Route
                path="/worker/:id"
                element={
                  <PrivateRoute>
                    <WorkerProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <MyProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/worker-dashboard"
                element={
                  <PrivateRoute>
                    <WorkerDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/services"
                element={
                  <PrivateRoute>
                    <Services />
                  </PrivateRoute>
                }
              />
              <Route
                path="/chats"
                element={
                  <PrivateRoute>
                    <ChatsList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/chat/:chatId"
                element={
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;

