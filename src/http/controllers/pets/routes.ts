import { FastifyInstance } from 'fastify'
import { create } from './create'
import { searchPetsByCity } from './searchPetsByCity'
import { searchPetsBySpecifications } from './searchPetsBySpecifications'
import { details } from './details'
import { verifyOrgRole } from '@/middlewares/verify-org-role'
// import { verifyJWT } from '@/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJWT)

  app.post('/pet', { onRequest: [verifyOrgRole('ADMIN')] }, create)
  app.get('/pets/:city', searchPetsByCity)
  app.get('/pets/search/:query', searchPetsBySpecifications)
  app.get('/pets/details/:id', details)
}
