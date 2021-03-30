export class Task {
  constructor(data) {
    this.id = data.id || data._id
    this.tasks = data.tasks
    this.rentalId = data.rentalId
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
