import { rentalsService } from '../services/RentalsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { ownersService } from '../services/OwnersService'
import { maintenancesService } from '../services/MaintenancesService'

export class RentalsController extends BaseController {
  constructor() {
    super('api/rentals')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/maintenances', this.getMaintenanceById)
      .post('', this.create)
      .delete('/:id', this.remove)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const rentals = await rentalsService.find()
      res.send(rentals)
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const rental = await rentalsService.findById(req.params.id)
      res.send(rental)
    } catch (error) {
      next(error)
    }
  }

  async getMaintenanceById(req, res, next) {
    try {
      const maintenance = await maintenancesService.find({ rentalId: req.params.id })
      res.send(maintenance)
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    const owner = await ownersService.findById('605cc781dbf6ad63cc0ae8ee')
    req.body.ownerId = owner.id
    try {
      req.body.creatorId = req.userInfo.id
      const rental = await rentalsService.create(req.body)
      res.send(rental)
    } catch (err) {
      next(err)
    }
  }

  async edit(req, res, next) {
    try {
      const rental = await rentalsService.update(req.params.id, req.body, req.userInfo.id)
      res.send(rental)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const rental = await rentalsService.remove(req.params.id, req.body)
      res.send(rental)
    } catch (error) {
      next(error)
    }
  }
}
