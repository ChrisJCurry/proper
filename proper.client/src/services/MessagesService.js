import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
// import { Message } from '../models/Message'

class MessagesService {
  async getByUserId(userId) {
    try {
      const res = await api.get('api/messages/' + userId)
      AppState.messages = res.data
      return res.data
    } catch (err) {
      logger.log(err)
    }
  }

  async getByUserIdAndToId(userId, toId) {
    const res = await api.get('account/messages/' + toId)
    logger.log(res.data)
    // logger.log('Messages: ', messages)
    // AppState.messages[userId] = messages
    // return messages
  }

  async create(message, toId) {
    try {
      delete message.id
      message.toId = toId
      logger.log('Heyhey: ', message, message.toId)
      const res = await api.post('api/messages', message)
      return res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async delete(note) {
    const res = window.confirm('Are you sure you want to delete this note?')
    if (!res) {
      return
    }
    try {
      await api.delete('/api/notes/' + note.id)
      AppState.notes.splice(AppState.notes.indexOf(note), 1)
    } catch (err) {
      logger.error(err)
    }
  }
}
export const messagesService = new MessagesService()
