
import { Auth0Provider } from '@bcwdev/auth0provider'
import { messagesService } from '../services/MessagesService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class MessagesController extends BaseController {
  constructor() {
    super('api/messages')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.findByUserId)
      .post('', this.create)
  }

  async findByUserId(req, res, next) {
    try {
      const messages = await messagesService.findByUserId(req.userInfo.id)
      res.send(messages)
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      logger.log('ToId: ', req.body.toId)
      const message = await messagesService.create(req.body)
      // @ts-ignore says it doesn't exist, but clearly it does. Linter?
      message.creator = req.userInfo
      logger.log(message)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
