import { AuthController } from './Controllers/AuthController.js'

class App {
  authController = new AuthController();
}

window.app = new App()
