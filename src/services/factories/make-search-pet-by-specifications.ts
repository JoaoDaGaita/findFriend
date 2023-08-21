import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchBySpecificationsPetService } from '../search-pet-by-specifications'

export function makeSearchPetBySpecificationsService() {
  const petsRepository = new PrismaPetsRepository()

  const service = new SearchBySpecificationsPetService(petsRepository)

  return service
}
