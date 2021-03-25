import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class MaintenancesService {
  async find(query = {}) {
    const maintenance = await dbContext.Maintenances.find().populate('creator', 'name email')
    return maintenance
  }

  async findById(id) {
    const maintenance = await dbContext.Maintenances.findById({ _id: id }).populate('creator', 'name, email')
    if (!maintenance) {
      throw new BadRequest('No maintenance found by that ID.')
    }

    return maintenance
  }

  async create(maintenance) {
    const newMaintenance = await dbContext.Maintenances.create(maintenance)
    if (!newMaintenance) {
      throw new BadRequest('Error creating maintenance field.')
    }
    return newMaintenance
  }

  async update(id, body, userInfo) {
    delete body.closed
    const maintenance = await dbContext.Maintenances.findOneAndUpdate({ _id: id }, body, { new: true })
    if (!maintenance) {
      throw new BadRequest('Error updating maintenance.')
    }
    return maintenance
  }

  async remove(id, body) {
    delete body.closed
    const maintenance = await dbContext.Maintenances.findOneAndUpdate({ _id: id }, { closed: true }, { new: true })
    if (!maintenance) {
      throw new BadRequest('Error deleting maintenance.')
    }
    return maintenance
  }
}

export const maintenancesService = new MaintenancesService()
