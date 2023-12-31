import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetServiceRequest {
  name: string
  age: number
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  city: string
  energyLevel: string
  independencyLevel: string
  petPlace: string
  photo: string
  requirement: string
  org_id: string
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    age,
    city,
    energyLevel,
    independencyLevel,
    name,
    petPlace,
    requirement,
    size,
    photo,
    org_id,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petRepository.create({
      age,
      city,
      energyLevel,
      independencyLevel,
      name,
      requirement,
      size,
      petPlace,
      photo,
      org_id,
    })

    return { pet }
  }
}
