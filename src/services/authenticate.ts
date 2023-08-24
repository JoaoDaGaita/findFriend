import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  org: Org
}

export class AuthenticateService {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) throw new InvalidCredentialsError()

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
