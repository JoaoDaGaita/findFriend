import { OrgsRepository } from '@/repositories/orgs-repository'

import { Org } from '@prisma/client'

interface RegisterOrgServiceRequest {
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
    email,
    address,
    password,
    whatsapp,
    zipCode,
  }: RegisterOrgServiceRequest): Promise<RegisterOrgServiceResponse> {
    const org = await this.orgRepository.create({
      email,
      zipCode,
      address,
      password,
      whatsapp,
    })

    return { org }
  }
}
