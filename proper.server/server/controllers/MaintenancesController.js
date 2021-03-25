import { maintenancesService } from '../services/MaintenancesService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { rentalsService } from '../services/RentalsService'

export class MaintenancesController extends BaseController {
  constructor() {
    super('api/maintenances')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const maintenances = await maintenancesService.find()
      res.send(maintenances)
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      // const maintenance = await maintenancesService.findById(req.params.id)
      // res.send(maintenance)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    const id = '605cbc072fc9df5508286250'
    const rental = await rentalsService.findById(id)
    logger.log(rental)
    try {
      req.body.creatorId = req.userInfo.id
      // @ts-ignore
      req.body.rentalId = rental._id
      const maintenance = await maintenancesService.create(req.body)
      res.send(maintenance)
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    try {
      const maintenance = await maintenancesService.update(req.params.id, req.body, req.userInfo)
      res.send(maintenance)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const maintenance = await maintenancesService.remove(req.params.id)
      res.send(maintenance)
    } catch (error) {
      next(error)
    }
  }
}
