import { OrgsRepository } from '@/repositories/orgs-repository'

import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { hash } from 'bcryptjs'

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
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      address,
      email,
      password_hash,
      whatsapp,
      zipCode,
    })

    return { org }
  }
}
