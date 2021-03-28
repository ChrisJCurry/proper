import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Maintenance } from '../models/Maintenance'

export default class MaintenancesService {
  /*
    Calls server-side controller, gets all maintenances.
    Makes res.data go through Maintenance model before being mapped into AppState maintenances.
  */
  async getAll() {
    try {
      const res = await api.get('api/maintenances')
      const maintenances = res.data.map(m => new Maintenance(m))
      AppState.maintenances = maintenances
      return maintenances
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, gets maintenance by Id.
    Makes res.data go through Maintenance model before being mapped into AppState maintenance.
  */
  async getById(id) {
    try {
      const res = await api.get('api/maintenances/' + id)

      const maintenance = res.data
      AppState.maintenance = maintenance
      return maintenance
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, creates new rental
    Makes res.data go through Maintenance model before being pushed into AppState maintenances.
  */
  async create(maintenance) {
    try {
      const res = await api.post('api/maintenances', maintenance)
      AppState.maintenances.push(res.data)
      this.getAll()
      return res.data
    } catch (error) {
      logger.error(error)
    }
  }

  /* Do we even need this? NOTE
    Calls server-side controller, edits maintenance.
  */
  async edit(maintenance) {
    try {
      const res = await api.put('api/maintenances/' + maintenance.id, maintenance)
      this.getById(res.data._id)
    } catch (error) {
      logger.log(error)
    }
  }

  /*
    Calls server-side controller, removes all maintenance tasks
  */

  async delete(id) {
    const res = window.confirm('Are you sure you want to remove ALL maintenance tasks?')
    if (!res) {
      return
    }
    try {
      await api.delete('api/maintenances/' + id)
      this.getById(id)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const maintenancesService = new MaintenancesService()
