export class Owner {
  constructor(data = {}) {
    this.name = data.name
    this.phoneNumber = data.phoneNumber
    this.address = data.address
    this.email = data.email
    this._id = data._id
  }
}
