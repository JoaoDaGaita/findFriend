export class OrgNameExistsError extends Error {
  constructor() {
    super("Name already exists")
  }
}
