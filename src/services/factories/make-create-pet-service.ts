import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetService } from '../create-pet'

export function makeCreatePetService() {
  const petsRepository = new PrismaPetsRepository()

  const service = new PetService(petsRepository)

  return service
}
