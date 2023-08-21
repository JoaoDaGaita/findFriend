import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterOrgService } from '@/services/factories/make-register-org-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    zipCode: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
  })

  const { email, zipCode, address, whatsapp, password } =
    registerBodySchema.parse(request.body)
  console.log(request.body)

  const orgService = makeRegisterOrgService()

  await orgService.execute({ email, zipCode, address, whatsapp, password })

  return reply.status(201).send()
}
