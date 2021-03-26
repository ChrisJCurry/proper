import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { post } from 'jquery'
import { Maintenance } from '../models/Maintenance'

export default class MaintenancesService {
  async getAll() {
    try {
      const res = await api.get('api/maintenances')
      console.log(res)
      const maintenances = res.data.map(m => new Maintenance(m))
      AppState.maintenances = maintenances
      return maintenances
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

export const maintenancesService = new MaintenancesService()
