import { describe } from "node:test"
import { expect, it } from "vitest"

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { RegisterOrgService } from "./create-org"
import { compare } from "bcryptjs"
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error"
import { OrgWhatsAppExistsError } from "./errors/org-whats-app-exists-error"
import { OrgNameExistsError } from "./errors/org-name-exists-error"

describe("Create Org Service", () => {
  it("should hash org password upon registration", async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const createOrgService = new RegisterOrgService(orgsRepository)

    const { org } = await createOrgService.execute({
      name: "abcxasssd",
      email: "test2@example.com",
      address: "xxx",
      password: "123123",
      whatsapp: "123123",
      zipCode: "123123",
    })

    const isPasswordCorrectHashed = await compare("123123", org.password_hash)

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it("should not be able to register with same email twice", async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const createOrgService = new RegisterOrgService(orgsRepository)

    const email = "abc@example.com"

    await createOrgService.execute({
      name: "abc222ss",
      email,
      address: "xxxx",
      password: "1231233",
      whatsapp: "1231232",
      zipCode: "1231232",
    })

    expect(() =>
      createOrgService.execute({
        name: "abcc2wd",
        email,
        address: "xxxx",
        password: "1231233",
        whatsapp: "1231232",
        zipCode: "1231232",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it("should not be able to register with same whatsapp", async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const createOrgService = new RegisterOrgService(orgsRepository)

    const whatsapp = "1231232"

    await createOrgService.execute({
      name: "abcc",
      email: "test1@example.com",
      address: "xxxx",
      password: "1231233",
      whatsapp,
      zipCode: "1231232",
    })

    expect(() =>
      createOrgService.execute({
        name: "abcdawd",
        email: "test2@example.com",
        address: "xxxx",
        password: "1231233",
        whatsapp,
        zipCode: "1231232",
      })
    ).rejects.toBeInstanceOf(OrgWhatsAppExistsError)
  })

  it.only("should not be able to register with same name", async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const createOrgService = new RegisterOrgService(orgsRepository)

    const name = "Org JV"

    await createOrgService.execute({
      name,
      email: "test1@example.com",
      address: "xxxx",
      password: "1231233",
      whatsapp: "123123123sss",
      zipCode: "1231232",
    })

    expect(() =>
      createOrgService.execute({
        name,
        email: "test2@example.com",
        address: "xxx222x",
        password: "1231233",
        whatsapp: "912873918237",
        zipCode: "123123222",
      })
    ).rejects.toBeInstanceOf(OrgNameExistsError)
  })
})
