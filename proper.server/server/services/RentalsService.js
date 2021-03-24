import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class RentalsService {
  async find(query = {}) {
    const rentals = await dbContext.Rentals.find(query)
    if (!rentals) {
      throw new BadRequest()
    }
    return rentals
  }

  async findById(id) {
    const rental = await dbContext.Rentals.findById({ _id: id })
    if (!rental) {
      throw new BadRequest(`Sorry, but you have sent the wrong ID ${id}. Please re-check the info you are sending through.`)
    }
  }

  async create(rental) {
    const newRental = await dbContext.Rentals.create(rental)
    if (!newRental) {
      throw new BadRequest('You may be missing on of the required')
    }
    return newRental
  }
}

export const rentalsService = new RentalsService()
