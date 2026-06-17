// @file: src/config/database.js
import pkg from 'pg'
const { Pool } = pkg

// ==========================================
// CONFIGURAÇÃO DO POOL DO POSTGRESQL
// ==========================================
// Substitua os valores abaixo pelos dados da sua conexão Neon
// ou qualquer outro provedor PostgreSQL

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://seu_usuario:sua_senha@localhost:5432/seu_banco'
  // Alternativa de configuração explícita:
  // user: 'seu_usuario',
  // password: 'sua_senha',
  // host: 'localhost',
  // port: 5432,
  // database: 'seu_banco'
})

// ==========================================
// TESTE DE CONEXÃO
// ==========================================

pool.on('error', (err) => {
  console.error('Erro no pool de conexão:', err)
})

pool.on('connect', () => {
  console.log('✅ Conectado ao PostgreSQL com sucesso')
})

export default pool
