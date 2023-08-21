import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface DetailsPetServiceRequest {
  id: string
}

interface DetailsPetServiceResponse {
  pet: Pet | null
}

export class DetailsPetService {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    id,
  }: DetailsPetServiceRequest): Promise<DetailsPetServiceResponse> {
    const pet = await this.petRepository.find(id)

    return { pet }
  }
}
