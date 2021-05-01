import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
// import { Message } from '../models/Message'

class MessagesService {
  async getByUserId(userId) {
    try {
      const res = await api.get('api/messages/' + userId)
      AppState.messages[userId] = res.data
      return res.data
    } catch (err) {
      logger.log(err)
    }
  }

  async getByUserIdAndToId(userId, toId) {
    const res = await api.get('account/messages/' + toId)
    AppState.messages[toId] = res.data
  }

  async create(message, toId) {
    try {
      delete message.id
      message.toId = toId
      const res = await api.post('api/messages', message)
      return res.data
    } catch (err) {
      logger.error(err)
    }
  }
}
export const messagesService = new MessagesService()
