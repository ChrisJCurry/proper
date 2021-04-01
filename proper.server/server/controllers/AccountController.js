import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { messagesService } from '../services/MessagesService'
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
      .get('/messages/:toId', this.getByUserIdAndToId)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getByUserIdAndToId(req, res, next) {
    try {
      const messages = await messagesService.findByUserIdAndToId(req.userInfo.id, req.params.toId)
      res.send(messages)
    } catch (err) {
      next(err)
    }
  }

  async getByEmail(req, res, next) {
    try {
      const account = await accountService.findProfile(req.params.email)
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
