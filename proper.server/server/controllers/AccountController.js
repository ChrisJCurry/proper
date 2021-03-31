import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/all', this.getAll)
      .get('/:email', this.getByEmail)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getByEmail(req, res, next) {
    try {
      const account = await accountService.findProfile(req.params.email)
      logger.log(account)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const accounts = await accountService.findProfiles()
      res.send(accounts)
    } catch (err) {
      next(err)
    }
  }
}
