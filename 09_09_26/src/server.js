import Fastify from 'fastify'
import cors from '@fastify/cors'
import { pathToFileURL } from 'node:url'

import pool from './database/pool.js'
import tarefaRoutes from './features/tarefas/tarefa.route.js'

const server = Fastify()

await server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

await server.register(tarefaRoutes, { prefix: '/tarefas' })

server.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.',
  })
})

export const start = async () => {
  try {
    await pool.query('SELECT 1')
    await server.listen({ port: 3000 })
    console.log('Servidor rodando em http://localhost:3000')
  } catch (erro) {
    console.error(erro)
    process.exit(1)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  start()
}

export default server
