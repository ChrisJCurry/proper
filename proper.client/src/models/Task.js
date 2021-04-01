export class Task {
  constructor(data) {
    this.id = data.id || data._id
    this.title = data.title
    this.description = data.description
    this.rentalId = data.rentalId
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.creator = data.creator
  }
}
