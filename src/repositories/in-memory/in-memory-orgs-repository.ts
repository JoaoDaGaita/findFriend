import { Org, Prisma } from "@prisma/client"
import { OrgsRepository } from "../orgs-repository"

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByWhatsApp(whatsapp: string) {
    const org = await this.items.find((item) => item.whatsapp === whatsapp)

    if (!org) {
      return null
    }

    return org
  }

  async findByName(name: string) {
    const org = await this.items.find((item) => item.name === name)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      name: data.name,
      id: "org-1",
      address: data.address,
      created_at: new Date(),
      email: data.email,
      password_hash: data.password_hash,
      role: "MEMBER",
      whatsapp: data.whatsapp,
      zipCode: data.zipCode,
    }
    await this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = await this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
