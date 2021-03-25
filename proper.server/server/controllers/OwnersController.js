import { ownersService } from '../services/OwnersService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class OwnersController extends BaseController {
  constructor() {
    super('api/owners')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.remove)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const owners = await ownersService.find()
      res.send(owners)
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const owner = await ownersService.findById(req.params.id)
      res.send(owner)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const owner = await ownersService.create(req.body)
      res.send(owner)
    } catch (err) {
      next(err)
    }
  }

  async edit(req, res, next) {
    try {
      const owner = await ownersService.update(req.params.id, req.body, req.userInfo.id)
      res.send(owner)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const owner = await ownersService.remove(req.params.id, req.body)
      res.send(owner)
    } catch (error) {
      next(error)
    }
  }
}
