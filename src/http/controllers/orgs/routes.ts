import { FastifyInstance } from 'fastify'

import { register } from './register'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { orgProfile } from './profile'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/org', register)

  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, orgProfile)
}
