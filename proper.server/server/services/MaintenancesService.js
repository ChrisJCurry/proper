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
    const foundMaintenance = await dbContext.Maintenances.find({ _id: id })
    if (foundMaintenance.creatorId !== userInfo.id) {
      throw new BadRequest('I am sorry but you are not the creator and you are not allowed to update this piece of data.')
    } if (foundMaintenance && foundMaintenance.closed) {
      throw new BadRequest('Sorry but you can not close this this Maintenance request through an edit. You must go through the delete')
    }
    return await dbContext.Maintenances.findOneAndUpdate({ _id: id }, body, { new: true })
  }

  async remove(id, body) {
    delete body.closed
    const maintenance = await dbContext.Maintenances.findOneAndUpdate({ _id: id }, { closed: true }, { new: true })
    if (!maintenance) {
      throw new BadRequest('Error deleting maintenance.')
    }
    return maintenance
  }

  /*
 NON-MAINTENANCE
 */
  async findTasksById(id) {
    const maintenance = await dbContext.Maintenances.findById(id)
    if (!maintenance) {
      throw new BadRequest('No maintenance found with that ID')
    }
    const tasks = maintenance.tasks
    if (!tasks) {
      throw new BadRequest('No tasks found')
    }

    return tasks
  }
}

export const maintenancesService = new MaintenancesService()
