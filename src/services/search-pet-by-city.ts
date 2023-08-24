import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetServiceRequest {
  city: string
}

interface SearchPetServiceResponse {
  pets: Pet[]
}

export class SearchByCityPetService {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    city,
  }: SearchPetServiceRequest): Promise<SearchPetServiceResponse> {
    const pets = await this.petRepository.searchManyByCity(city)

    return { pets }
  }
}
