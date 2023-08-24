import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgProfileService } from '../get-org-profile'

export function makeGetOrgProfileService() {
  const orgRepository = new PrismaOrgRepository()
  const service = new GetOrgProfileService(orgRepository)

  return service
}
