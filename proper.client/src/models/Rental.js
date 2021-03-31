export class Rental {
  constructor(data) {
    this.id = data.id || data._id
    this.address = data.address || 'Default Street'
    this.rent = data.rent || '0'
    this.yearBuilt = data.yearBuilt || '0'
    this.closed = data.closed
    this.creatorId = data.creatorId
    this.tenants = data.tenants || ''
    this.picture = data.picture || ''
    this.tasks = data.tasks
    this.notes = data.notes
  }
}
