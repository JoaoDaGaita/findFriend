import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetByCityService } from '@/services/factories/make-search-pet-by-city-service'

export async function searchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = registerQuerySchema.parse(request.query)

  const searchPetService = makeSearchPetByCityService()

  const { pets } = await searchPetService.execute({
    city,
  })

  return reply.status(200).send({ pets })
}
