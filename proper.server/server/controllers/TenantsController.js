import { tenantsService } from '../services/TenantsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TenantsController extends BaseController {
  constructor() {
    super('api/tenants')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.remove)
      .delete('/:id/beforeRental', this.hardDelete)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const tenants = await tenantsService.find()
      res.send(tenants)
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const tenant = await tenantsService.findById(req.params.id)
      res.send(tenant)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.phone = req.body.phoneNum
      const tenant = await tenantsService.create(req.body)
      res.send(tenant)
    } catch (err) {
      next(err)
    }
  }

  async edit(req, res, next) {
    try {
      const tenant = await tenantsService.update(req.params.id, req.body, req.userInfo.id)
      res.send(tenant)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const tenant = await tenantsService.remove(req.params.id, req.body)
      res.send(tenant)
    } catch (error) {
      next(error)
    }
  }

  async hardDelete(req, res, next) {
    try {
      const task = await tenantsService.hardDelete(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }
}
