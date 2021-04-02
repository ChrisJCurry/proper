export class Tenant {
  constructor(data = {}) {
    this.name = data.name
    this.phoneNum = data.phone || data.phoneNum
    this.closed = data.closed
  }
}
