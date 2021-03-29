export class Task {
  constructor(data) {
    this.id = data.id || data._id
    this.task = data.task
    this.body = data.body
    this.rentalId = data.rentalId
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
