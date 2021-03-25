import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class MaintenancesService {
  async find(query = {}) {
    const maintenance = await dbContext.Maintenances.find()
    return maintenance
  }

  async create(maintenance) {
    const newMaintenance = await dbContext.Maintenances.create(maintenance)
    if (!newMaintenance) {
      throw new BadRequest('Error creating maintenance field.')
    }
    return newMaintenance
  }
}

export const maintenancesService = new MaintenancesService()
