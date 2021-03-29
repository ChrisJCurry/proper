export class Rental {
  constructor(data) {
    this.id = data.id || data._id
    this.address = data.address
    this.rent = data.rent
    this.yearBuilt = data.yearBuilt
    this.closed = data.closed
    this.creatorId = data.creatorId
    this.tenants = data.tenants
    this.picture = data.picture || ''
    this.maintenances = data.maintenances || data.maintenance
  }
}
