import { PetsRepository } from '@/repositories/pets-repository'
import { SIZE } from '@prisma/client'

interface SearchPetServiceRequest {
  city: string
}

interface SearchPetServiceResponse {
  pets: { name: string; age: number; size: SIZE }[]
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
