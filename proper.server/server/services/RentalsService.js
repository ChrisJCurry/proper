import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class RentalsService {
  async findById(id) {
    const rental = await dbContext.Rentals.findById({ _id: id })
    if (!rental) {
      throw new BadRequest(`Requires the proper ID to find this rental. You sent ${id}`)
    }
    return rental
  }
  async find(query = {}) {
    const rentals = await dbContext.Rentals.find(query)
    if (!rentals) {
      throw new BadRequest(`We are trying to find all of the rentals. Please check your query if anything ${query}`)
    }
    return rentals
  }

  async create(rental) {
    // had to make it const newRental because we can't have two variables under the name of rental
    const newRental = await dbContext.Rentals.create(rental)
    if (!newRental) {
      throw new BadRequest(`Please make sure you have attached all of the required properties to the rental you are trying to create ${rental}`)
    }
    return newRental
  }
}

export const rentalsService = new RentalsService()
