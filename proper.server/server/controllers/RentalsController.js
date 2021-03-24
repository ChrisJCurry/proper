import { rentalsService } from '../services/RentalsService'
import BaseController from '../utils/BaseController'

export class RentalsController extends BaseController {
  constructor() {
    super('api/rentals')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
    // .post('', this.create)
    // .delete('', this.remove)
    // .put('/:id', this.edit)
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
    try {
      const rental = await rentalsService.create(req.body)
      res.send(rental)
    } catch (err) {
      next(err)
    }
  }
}
