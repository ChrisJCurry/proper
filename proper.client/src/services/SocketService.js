import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  // register listeners for the room messages/emits that come from the server
  constructor() {
    super()
    this
      .on('create:post', this.createPost)
      .on('remove:post', this.removePost)
      .on('update:post', this.updatePost)
      .on('new:message', this.newMessage)
  }

  authenticate(bearerToken) {
    this.socket.emit('authenticate', bearerToken)
  }

  connected(payload) {
    console.log(payload.message)
  }

  createPost(payload) {
    console.log(payload)
    AppState.posts.push(payload)
  }

  removePost(id) {
    const index = AppState.posts.findIndex(p => p.id === id)
    AppState.posts.splice(index, 1)
  }

  updatePost(payload) {
    const index = AppState.posts.findIndex(p => p.id === payload.id)
    AppState.posts.splice(index, 1, payload)
  }

  async newMessage(payload) {
    logger.log('Socket: ', payload)
    if (AppState.account.id === payload.creatorId) {
      if (AppState.messages[payload.toId]) {
        AppState.messages[payload.toId].push(payload)
      } else {
        AppState.messages[payload.toId] = []
      }
    } else {
      if (AppState.messages[payload.creatorId]) {
        AppState.messages[payload.creatorId].push(payload)
      } else {
        AppState.messages[payload.creatorId] = []
      }
    }
  }
}

export const socketService = new SocketService()
