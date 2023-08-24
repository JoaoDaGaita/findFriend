import { AuthenticateService } from '../authenticate'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeAuthenticateService() {
  const orgRepository = new PrismaOrgRepository()
  const authenticateService = new AuthenticateService(orgRepository)

  return authenticateService
}
