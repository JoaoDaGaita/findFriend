import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { describe } from 'node:test'
import { expect, it } from 'vitest'
import { RegisterOrgService } from './create-org'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

describe('Create Org Service', () => {
  it('should hash org password upon registration', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const createOrgService = new RegisterOrgService(orgsRepository)

    const { org } = await createOrgService.execute({
      email: 'abc@example.com',
      address: 'xxx',
      password: '123123',
      whatsapp: '123123',
      zipCode: '123123',
    })

    const isPasswordCorrectHashed = await compare('123123', org.password_hash)

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const createOrgService = new RegisterOrgService(orgsRepository)

    const email = 'abc@example.com'

    await createOrgService.execute({
      email,
      address: 'xxxx',
      password: '1231233',
      whatsapp: '1231232',
      zipCode: '1231232',
    })

    expect(() =>
      createOrgService.execute({
        email,
        address: 'xxxx',
        password: '1231233',
        whatsapp: '1231232',
        zipCode: '1231232',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
