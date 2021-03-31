import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getAll() {
    try {
      const res = await api.get('/account/all')
      AppState.accounts = res.data
    } catch (err) {
      logger.error('Error retrieving accounts')
    }
  }

  async getByEmail(email) {
    try {
      const res = await api.get('/account/' + email)
      return res.data
    } catch (err) {
      logger.error('Error retrieving accounts')
    }
  }
}

export const accountService = new AccountService()
