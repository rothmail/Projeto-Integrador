require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rotas
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const conversationsRoutes = require('./routes/conversations');
const eventsRoutes = require('./routes/events');
const resourcesRoutes = require('./routes/resources');
const forumsRoutes = require('./routes/forums');
const notificationsRoutes = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARES
// ============================================

// CORS - Permitir requisições do frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROTAS
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API Família Conectada is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/forums', forumsRoutes);
app.use('/api/notifications', notificationsRoutes);

// 404 - Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.path
  });
});

// ============================================
// ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  res.status(err.status || 500).json({ 
    error: err.message || 'Algo deu errado!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor Família Conectada');
  console.log('='.repeat(50));
  console.log(`📡 Rodando em: http://localhost:${PORT}`);
  console.log(`🔧 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
  });
});
