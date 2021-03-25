import { rentalsService } from '../services/RentalsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { ownersService } from '../services/OwnersService'

export class RentalsController extends BaseController {
  constructor() {
    super('api/rentals')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .use(Auth0Provider.getAuthorizedUserInfo)
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
