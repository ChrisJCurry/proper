import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'
import socketService from '../services/SocketService'

class MessagesService {
  async findByUserId(userId) {
    const messageObj = {
      $or: [{ toId: userId }, { creatorId: userId }]
    }
    logger.log('messageObj: ', messageObj)
    const messages = await dbContext.Messages.find(messageObj).populate('creator', 'name email')
    logger.log('messages', messages)
    if (!messages) {
      throw new BadRequest('Not a valid Id')
    }
    return messages
  }

  async create(rawMessage) {
    const message = await dbContext.Messages.create(rawMessage)
    // @ts-ignore
    socketService.messageUser(message.toId, 'new:message', message)
    socketService.messageUser(message.creatorId, 'new:message', message)

    return message
  }
}

export const messagesService = new MessagesService()
