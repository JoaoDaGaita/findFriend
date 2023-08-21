import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { DetailsPetService } from '../details-pet'

export function makeDetailsService() {
  const petsRepository = new PrismaPetsRepository()

  const service = new DetailsPetService(petsRepository)

  return service
}
