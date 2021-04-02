
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getTasksByRentalId)
      .put('/:id', this.edit)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const tasks = await tasksService.find()
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getTasksByRentalId(req, res, next) {
    try {
      const tasks = await tasksService.find({ rentalId: req.params.id })
      res.send(tasks)
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const task = await tasksService.findById(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const task = await tasksService.create(req.body)
      // @ts-ignore says it doesn't exist, but clearly it does. Linter?
      task.creator = req.userInfo
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const task = await tasksService.edit(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const task = await tasksService.delete(req.params.id)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }
}
