const mysql = require('mysql2');

// Criar pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'familia_conectada',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// Converter para promises
const promisePool = pool.promise();

// Testar conexão
promisePool.query('SELECT 1')
  .then(() => {
    console.log('✅ Conectado ao MySQL com sucesso!');
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
    process.exit(1);
  });

module.exports = promisePool;
