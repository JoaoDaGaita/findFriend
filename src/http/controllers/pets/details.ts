import { makeDetailsService } from '@/services/factories/make-details-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const registerQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = registerQuerySchema.parse(request.params)

  console.log(id)

  const detailsPetService = makeDetailsService()

  const { pet } = await detailsPetService.execute({
    id,
  })

  return reply.status(200).send({ pet })
}
