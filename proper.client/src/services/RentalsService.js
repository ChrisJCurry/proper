import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { post } from 'jquery'
import { Rental } from '../models/Rental'

export default class RentalsService {
  async getAll() {
    try {
      const res = await api.get('api/rentals')
      console.log(res)
      AppState.rentals = res.data.map(r => new Rental(r))
    } catch (error) {
      logger.error(error)
    }
  }

  async create(rental) {
    try {
      const res = await api / post('api/rentals', rental)
      AppState.rentals.push(res.data)
      this.getAll()
      return res.data._id
    } catch (error) {
      logger.error(error)
    }
  }

  async getMaintenancesById(id) {
    try {
      // const res = await api.get('api/rentals/' + id + '/maintenances')
      // AppState.maintenances = res.data.map(m => new Maintenance(m))
    } catch (error) {
      logger.error(error)
    }
  }
}

export const rentalsService = new RentalsService()
