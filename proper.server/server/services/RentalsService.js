import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class RentalsService {
  async find(query = {}) {
    const rentals = await dbContext.Rentals.find(query).populate('creator', 'name email')
    if (!rentals) {
      throw new BadRequest()
    }
    return rentals
  }

  async findById(id) {
    const rental = await dbContext.Rentals.findById({ _id: id }).populate('creator', 'name email')
    if (!rental) {
      throw new BadRequest(`Sorry, but you have sent the wrong ID ${id}. Please re-check the info you are sending through.`)
    }
    return rental
  }

  async create(rental) {
    const newRental = await (await dbContext.Rentals.create(rental)).populate('creator', 'name email')
    if (!newRental) {
      throw new BadRequest(`You may be missing one of the required properties ${rental}`)
    }
    return newRental
  }

  async remove(id, body) {
    // passing the closed property through...even though they should not be able to send a body for the delete I am going to protect the data
    delete body.closed
    const rental = await dbContext.Rentals.findOneAndUpdate({ _id: id }, { closed: true }, { new: true })
    if (!rental) {
      throw new BadRequest('You can not actually delete this. Please send the ID and we will softly delete this data')
    }
    return rental
  }

  async update(id, body, userInfo) {
    delete body.closed
    const rental = await dbContext.Rentals.find({ _id: id }).populate('creator', 'name email')
    if (rental.creatorId !== userInfo.id) {
      throw new BadRequest('You are not the creator of this rental and you do not have permissions to update this data.')
    } if (rental && rental.closed) {
      throw new BadRequest('This rental may already be closed, or you are trying to close a rental through the edit. If you are trying to close the rental please use the delete process.')
    }
    return await dbContext.Rentals.findOneAndUpdate({ _id: id }, body, { new: true })
  }
}

export const rentalsService = new RentalsService()
