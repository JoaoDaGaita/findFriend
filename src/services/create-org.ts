import { OrgsRepository } from "@/repositories/orgs-repository"

import { Org } from "@prisma/client"
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error"
import { hash } from "bcryptjs"
import { OrgWhatsAppExistsError } from "./errors/org-whats-app-exists-error"
import { OrgNameExistsError } from "./errors/org-name-exists-error"

interface RegisterOrgServiceRequest {
  name: string
  email: string
  zipCode: string
  address: string
  password: string
  whatsapp: string
}

interface RegisterOrgServiceResponse {
  org: Org
}

export class RegisterOrgService {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    address,
    password,
    whatsapp,
    zipCode,
  }: RegisterOrgServiceRequest): Promise<RegisterOrgServiceResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)
    const orgWithSameName = await this.orgRepository.findByName(name)
    const orgWithSameWhatsApp = await this.orgRepository.findByWhatsApp(
      whatsapp
    )

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    if (orgWithSameName) {
      throw new OrgNameExistsError()
    }

    if (orgWithSameWhatsApp) {
      throw new OrgWhatsAppExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      address,
      email,
      password_hash,
      whatsapp,
      zipCode,
    })

    return { org }
  }
}
