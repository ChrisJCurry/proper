import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import socketService from '../services/SocketService'

class MessagesService {
  async findByUserId(userId) {
    const messageObj = {
      $or: [{ toId: userId }, { creatorId: userId }]
    }
    const messages = await dbContext.Messages.find(messageObj).populate('creator', 'name email')
    if (!messages) {
      throw new BadRequest('Not a valid Id')
    }
    return messages
  }

  async findByUserIdAndToId(userId, toId) {
    const messageObj = {
      $and: [
        { $or: [{ toId: userId }, { creatorId: userId }] },
        { $or: [{ toId: toId }, { creatorId: toId }] }
      ]
    }

    const messages = await dbContext.Messages.find(messageObj).populate('creator', 'name email')
    if (!messages) {
      throw new BadRequest('No valid messages found')
    }
    return messages
  }

  async create(rawMessage) {
    const message = await dbContext.Messages.create(rawMessage)
    // @ts-ignore
    socketService.messageUser(message.toId, 'new:message', message)
    // @ts-ignore
    socketService.messageUser(message.creatorId, 'new:message', message)

    // @ts-ignore
    socketService.messageUser(message.toId, 'new:notif', message)

    return message
  }
}

export const messagesService = new MessagesService()
