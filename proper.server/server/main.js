import express from 'express'
import Socket from './services/SocketService'
import Startup from './Startup'
import DbContext from './db/DbConfig'
import { logger } from './utils/Logger'
// this import will allow us to test our nodemailer
// import { sendMail } from './utils/NodeMailer'

// create server & socketServer
const app = express()
const socketServer = require('http').createServer(app)
const io = require('socket.io')(socketServer)
const port = process.env.PORT || 3000

// Establish Socket
Socket.setIO(io)
Startup.ConfigureGlobalMiddleware(app)
Startup.ConfigureRoutes(app)

// Connect to Atlas MongoDB
DbContext.connect()

// Start Server
socketServer.listen(port, () => {
  logger.log(`[SERVING ON PORT: ${port}]`)
})

// this function will send one email on server load
// sendMail({ from: 'alexfost94@gmail.com', to: 'contact@chrisjcurry.me', text: 'Hey Chris I sent an email through nodemailer!!' })
