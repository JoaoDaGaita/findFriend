import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyOrgRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { user } = request

    if (!user || user.role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
