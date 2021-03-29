import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Rental } from '../models/Rental'

export default class RentalsService {
  /*
    Calls server-side controller, gets all rentals.
    Makes res.data go through Maintenance model before being mapped into AppState rentals.
  */
  async getAll() {
    try {
      const res = await api.get('api/rentals')
      AppState.rentals = res.data.map(r => new Rental(r))
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, gets rentals by Id.
    Makes res.data go through rental model before being mapped into AppState rental.
  */
  async getById(id) {
    try {
      const res = await api.get('api/rentals/' + id)
      AppState.rental = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getTasksById(id) {
    try {
      const res = await api.get('api/rentals/' + id + '/tasks')
      return res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getNotesById(id) {
    try {
      const res = await api.get(`api/rentals/${id}/notes`)
      return res.data
    } catch (error) {
      logger.error(error)
    }
  }

  // does what it says on the tin :)
  async getTenantsByRentalId(id) {
    try {
      const res = await api.get('api/rentals/' + id + '/tenants')
      AppState.tenant.push(res.data)
    } catch (error) {
      logger.log(error)
    }
  }

  /*
    Calls server-side controller, creates rental.
    Makes res.data go through rental model before being pushed into AppState rental.
  */
  async create(rental) {
    try {
      const res = await api.post('api/rentals', rental)
      AppState.rentals.push(res.data)
      return res.data
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, edits rental.
  */
  async edit(rental) {
    try {
      const res = await api.put('api/rentals/' + rental.id, rental)
      this.getById(res.data._id)
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, removes rental from listings
  */

  async delete(id) {
    const res = window.confirm('Are you sure you want to remove this rental?')
    if (!res) {
      return
    }
    try {
      await api.delete('api/rentals/' + id)
      this.getById(id)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const rentalsService = new RentalsService()
