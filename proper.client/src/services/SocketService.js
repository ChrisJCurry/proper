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
      .on('new:notif', this.newNotification)
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

  newMessage(payload) {
    if (AppState.account.id === payload.creatorId) {
      if (AppState.messages[payload.toId]) {
        AppState.messages[payload.toId].push(payload)
      } else {
        AppState.messages[payload.toId] = []
        AppState.messages[payload.toId].push(payload)
      }
    } else {
      if (AppState.messages[payload.creatorId]) {
        AppState.messages[payload.creatorId].push(payload)
      } else {
        AppState.messages[payload.creatorId] = []
        AppState.messages[payload.creatorId].push(payload)
      }
    }
  }

  newNotification(payload) {
    if (AppState.readMessages[payload.toId].length !== AppState.messages[payload.creatorId]) {
      document.getElementById('notification').classList.add('d-sm-block')
      document.getElementById('notification').classList.remove('d-none')
      if (AppState.newMessageUsers.length < 1) {
        logger.log('got here')
        AppState.newMessageUsers.push(payload.creatorId)
        return
      }
      for (let i = 0; i < AppState.newMessageUsers.length; i++) {
        logger.log(AppState.newMessageUsers[i])
        if (payload.creatorId === AppState.newMessageUsers[i]) {
          logger.log('already added')
          return
        }
      }
      AppState.newMessageUsers.push(payload.creatorId)
    }
  }
}

export const socketService = new SocketService()
