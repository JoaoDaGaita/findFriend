import { Org } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface GetOrgProfileServiceRequest {
  orgId: string
}

interface GetUserProfileServiceResponse {
  org: Org
}

export class GetOrgProfileService {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) throw new ResourceNotFoundError()

    return { org }
  }
}
