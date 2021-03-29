export class Note {
  constructor(data) {
    this.id = data.id || data._id
    this.note = data.note
    this.rentalId = data.rentalId
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
