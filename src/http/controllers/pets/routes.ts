import { FastifyInstance } from 'fastify'
import { create } from './create'
import { searchPetsByCity } from './searchPetsByCity'
import { searchPetsBySpecifications } from './searchPetsBySpecifications'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pet', create)
  app.get('/pets/:city', searchPetsByCity)
  app.get('/pets/search/:query', searchPetsBySpecifications)
  app.get('/pets/details/:id', details)
}
