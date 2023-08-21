import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetBySpecificationsService } from '@/services/factories/make-search-pet-by-specifications'

export async function searchPetsBySpecifications(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerQuerySchema = z.object({
    city: z.string(),
    name: z.string(),
  })

  const query = registerQuerySchema.parse(request.query)

  const searchPetService = makeSearchPetBySpecificationsService()

  const { pets } = await searchPetService.execute({
    query,
  })

  return reply.status(200).send({ pets })
}
