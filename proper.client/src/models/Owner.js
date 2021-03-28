export class Owner {
  constructor(data = {}) {
    this.name = data.name
    this.phone = data.phone || data.phoneNum
    this.address = data.address
    this.email = data.email
    this._id = data._id
  }
}
