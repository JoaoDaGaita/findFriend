import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetServiceRequest {
  query: {
    city: string
    name: string
  }
}

interface SearchPetServiceResponse {
  pets: Pet[]
}

export class SearchBySpecificationsPetService {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    query,
  }: SearchPetServiceRequest): Promise<SearchPetServiceResponse> {
    const pets = await this.petRepository.searchMany(query)

    return { pets }
  }
}
