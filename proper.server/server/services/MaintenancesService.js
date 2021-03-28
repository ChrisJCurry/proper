import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class MaintenancesService {
  async find(query = {}) {
    const maintenance = await dbContext.Maintenances.find().populate('creator', 'name email')
    return maintenance
  }

  async findById(id) {
    const maintenance = await dbContext.Maintenances.findById({ _id: id }).populate('creator', 'name email')
    if (!maintenance) {
      throw new BadRequest('No maintenance found by that ID.')
    }

    return maintenance
  }

  async create(maintenance) {
    const newMaintenance = await (await dbContext.Maintenances.create(maintenance)).populate('creator', 'name email')
    if (!newMaintenance) {
      throw new BadRequest(`You may be missing one of the required properties ${maintenance}`)
    }
    return newMaintenance
  }

  async update(id, body, userInfo) {
    delete body.closed
    const maintenance = await dbContext.Maintenances.findOne({ _id: id })
    if (maintenance.creatorId !== userInfo.id) {
      throw new BadRequest('I am sorry but you are not the creator or you are not allowed to update this piece of data.')
    } if (maintenance && maintenance.closed) {
      throw new BadRequest("You can't update a closed maintenance task.")
    }
    return await dbContext.Maintenances.findOneAndUpdate({ _id: id }, { tasks: body.tasks, rentalId: body.rentalId }, { new: true })
  }

  async remove(id, body) {
    delete body.closed
    const maintenance = await dbContext.Maintenances.findOneAndUpdate({ _id: id }, { tasks: [] }, { new: true })
    if (!maintenance) {
      throw new BadRequest('Error deleting maintenance.')
    }
    return maintenance
  }
}

export const maintenancesService = new MaintenancesService()
