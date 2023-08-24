import { makeGetOrgProfileService } from '@/services/factories/make-get-org-profile-service'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function orgProfile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfile = makeGetOrgProfileService()

  const { org } = await getOrgProfile.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  })
}
