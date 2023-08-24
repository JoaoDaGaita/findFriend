import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async find(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
    return pet
  }

  async searchMany(query: { city: string; name: string }) {
    const pets = await prisma.pet.findMany({
      where: {
        OR: [
          {
            city: {
              contains: query.city,
            },
          },
          {
            name: {
              contains: query.name,
            },
          },
        ],
      },
    })

    return pets
  }

  async searchManyByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
    })

    return pets
  }

  async create(data: Prisma.PetCreateInput) {
    console.log(data)

    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
