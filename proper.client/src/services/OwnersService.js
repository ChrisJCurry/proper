import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Owner } from '../models/Owner'

export default class OwnersService {
  /*
    Calls server-side controller, gets all owners.
    Makes res.data go through Owner model before being mapped into AppState owners.
  */
  async getAll() {
    try {
      const res = await api.get('api/owners')
      const owners = res.data.map(o => new Owner(o))
      AppState.owners = owners
      return owners
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, gets owner by Id.
  */
  async getById(id) {
    try {
      const res = await api.get('api/owners/' + id)

      const owner = res.data
      AppState.owner = owner
      return owner
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, creates new owner
  */
  async create(owner) {
    try {
      const res = await api.post('api/owners/', owner)
      AppState.owners.push(res.data)
      this.getAll()
      return res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async edit(owner) {
    try {
      const res = await api.put('api/owners/' + owner.id, owner)
      this.getById(res.data._id)
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, removes owner
  */

  async delete(id) {
    const res = window.confirm('Are you sure you want to remove this owner?')
    if (!res) {
      return
    }
    try {
      await api.delete('api/owners/' + id)
      this.getById(id)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const ownersService = new OwnersService()
