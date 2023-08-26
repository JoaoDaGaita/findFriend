import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"
import { makeGetOrgProfileService } from "@/services/factories/make-get-org-profile-service"
import { FastifyRequest, FastifyReply } from "fastify"

export async function orgProfile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfile = makeGetOrgProfileService()

  try {
    const { org } = await getOrgProfile.execute({
      orgId: request.user.sub,
    })

    return reply.status(200).send({
      org: {
        ...org,
        password_hash: undefined,
      },
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send(error.message)
    } else {
      reply.status(500).send("Internal Server Error")
    }
  }
}
