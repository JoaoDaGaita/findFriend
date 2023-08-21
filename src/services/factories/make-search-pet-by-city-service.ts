import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchByCityPetService } from '../search-pet-by-city'

export function makeSearchPetByCityService() {
  const petsRepository = new PrismaPetsRepository()

  const service = new SearchByCityPetService(petsRepository)

  return service
}
