export class Note {
  constructor(data) {
    this.id = data.id || data._id
    this.body = data.body || data.description
    this.rentalId = data.rentalId
    this.createdAt = data.createdAt
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
