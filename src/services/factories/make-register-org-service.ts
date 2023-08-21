import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'

import { RegisterOrgService } from '../create-org'

export function makeRegisterOrgService() {
  const orgsRepository = new PrismaOrgRepository()

  const service = new RegisterOrgService(orgsRepository)

  return service
}
