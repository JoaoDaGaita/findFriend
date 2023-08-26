export class OrgWhatsAppExistsError extends Error {
  constructor() {
    super('WhatsApp already exists')
  }
}
