import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DetailsPetServiceRequest {
  id: string
}

interface DetailsPetServiceResponse {
  pet: Pet
  whatsapp: string
}

export class DetailsPetService {
  constructor(
    private petRepository: PetsRepository,
    private orgRepository: OrgsRepository,
  ) {}

  async execute({
    id,
  }: DetailsPetServiceRequest): Promise<DetailsPetServiceResponse> {
    const pet = await this.petRepository.find(id)
    const org = await this.orgRepository.findById(pet?.org_id)

    if (!pet) throw new ResourceNotFoundError()
    if (!org) throw new ResourceNotFoundError()

    const whatsapp = org.whatsapp

    return { pet, whatsapp }
  }
}
