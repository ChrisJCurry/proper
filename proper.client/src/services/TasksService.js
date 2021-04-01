import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Task } from '../models/Task'

class TasksService {
  async getAll() {
    try {
      const res = await api.get('api/tasks')
      AppState.tasks = res.data.map(t => new Task(t))
    } catch (err) {
      logger.log(err)
    }
  }

  async getTasksByRentalId(rentalId) {
    try {
      const res = await api.get('api/tasks/' + rentalId + '/tasks')
      AppState.tasks = res.data.map(t => new Task(t))
    } catch (error) {
      logger.error(error)
    }
  }

  async createTask(taskData) {
    try {
      delete taskData.id
      const res = await api.post('api/tasks', taskData)
      AppState.tasks.push(res.data)
      return res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async edit(task) {
    try {
      const res = await api.put('api/tasks/' + task.id)
      this.getTasksByRentalId(res.data.rentalId)
    } catch (error) {
      logger.error(error)
    }
  }

  async delete(task) {
    const res = window.confirm('Are you sure you want to delete this task?')
    if (!res) {
      return
    }
    try {
      await api.delete('/api/tasks/' + task.id)
      AppState.tasks.splice(AppState.tasks.indexOf(task), 1)
    } catch (err) {
      logger.error(err)
    }
  }
}
export const tasksService = new TasksService()
