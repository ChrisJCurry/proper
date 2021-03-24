import { dbContext } from '../db/DbContext'

class RentalsService {
  async find(query = {}) {
    return await dbContext.Rentals.find(query)
  }

  async create(rental) {
    return await dbContext.Rentals.create(rental)
  }
}

export const rentalsService = new RentalsService()
