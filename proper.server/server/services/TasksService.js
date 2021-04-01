import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'
class TasksService {
  async find(query = {}) {
    const tasks = await dbContext.Tasks.find(query).populate('creator')
    return tasks
  }

  async findById(id) {
    const task = await dbContext.Tasks.findById(id).populate('creator')
    if (!task) {
      throw new BadRequest('Not a valid Id')
    }
    return task
  }

  async create(rawTask) {
    const task = dbContext.Tasks.create(rawTask)
    logger.log(task)
    return task
  }

  async edit(id) {
    const task = await dbContext.Tasks.findById(id)

    return await dbContext.Tasks.findByIdAndUpdate(id, { closed: !task.closed }, { new: true })
  }

  async delete(id, creatorId) {
    const res = await dbContext.Tasks.findOneAndDelete({ _id: id, creatorId: creatorId })
    return res
  }
}

export const tasksService = new TasksService()
