import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchManyByCity(city: string): Promise<Pet[]>
  searchMany(query: { city: string; name: string }): Promise<Pet[]>
  find(id: string): Promise<Pet | null>
}
