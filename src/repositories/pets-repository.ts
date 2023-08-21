import { Pet, Prisma, SIZE } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  searchManyByCity(
    city: string,
  ): Promise<{ name: string; age: number; size: SIZE }[]>
  searchMany(query: { city: string; name: string }): Promise<Pet[]>
  find(id: string): Promise<Pet | null>
}
