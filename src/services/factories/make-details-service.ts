import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { DetailsPetService } from '../details-pet'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeDetailsService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgRepository()

  const service = new DetailsPetService(petsRepository, orgsRepository)

  return service
}
