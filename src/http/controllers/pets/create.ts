import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetService } from '../../../services/factories/make-create-pet-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    age: z.number(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).default('MEDIUM'),
    city: z.string(),
    energyLevel: z.string(),
    independencyLevel: z.string(),
    petPlace: z.string(),
    requirement: z.string(),
    photo: z.string(),
  })

  const {
    name,
    age,
    size,
    city,
    energyLevel,
    independencyLevel,
    petPlace,
    requirement,
    photo,
  } = registerBodySchema.parse(request.body)

  const petService = makeCreatePetService()

  await petService.execute({
    age,
    city,
    energyLevel,
    independencyLevel,
    name,
    petPlace,
    requirement,
    size,
    photo,
  })

  return reply.status(201).send()
}
