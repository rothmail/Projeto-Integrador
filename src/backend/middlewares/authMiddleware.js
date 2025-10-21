const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticação JWT
 * Verifica se o token é válido e adiciona userId ao request
 */
module.exports = (req, res, next) => {
  try {
    // Obter token do header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ 
        success: false,
        error: 'Token não fornecido',
        message: 'Você precisa estar autenticado para acessar este recurso'
      });
    }

    // Formato esperado: "Bearer TOKEN"
    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return res.status(401).json({ 
        success: false,
        error: 'Token mal formatado',
        message: 'Formato esperado: Bearer [token]'
      });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ 
        success: false,
        error: 'Token mal formatado',
        message: 'Formato esperado: Bearer [token]'
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adicionar informações do usuário ao request
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        error: 'Token expirado',
        message: 'Sua sessão expirou. Faça login novamente.'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        error: 'Token inválido',
        message: 'Token JWT inválido'
      });
    }

    return res.status(401).json({ 
      success: false,
      error: 'Falha na autenticação',
      message: error.message
    });
  }
};
