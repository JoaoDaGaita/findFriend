import { $Enums, Prisma } from "@prisma/client"
import { OrgsRepository } from "../orgs-repository"
import { prisma } from "@/lib/prisma"

export class PrismaOrgRepository implements OrgsRepository {
  async findByName(name: string) {
    const org = await prisma.org.findUnique({
      where: {
        name,
      },
    })
    return org
  }

  async findByWhatsApp(whatsapp: string) {
    const org = await prisma.org.findUnique({
      where: {
        whatsapp,
      },
    })
    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })
    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })
    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
