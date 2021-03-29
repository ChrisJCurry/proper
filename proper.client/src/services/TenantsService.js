import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Tenant } from '../models/Tenant'

export default class TenantsService {
  /*
    Calls server-side controller, gets all tenants.
    Makes res.data go through Tenant model before being mapped into AppState tenants.
  */
  async getAll() {
    try {
      const res = await api.get('api/tenants')
      const tenants = res.data.map(o => new Tenant(o))
      AppState.tenants = tenants
      return tenants
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, gets tenant by Id.
  */
  async getById(id) {
    try {
      const res = await api.get('api/tenants/' + id)

      const tenant = res.data
      AppState.tenant = tenant
      return tenant
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, creates new tenant
  */
  async create(tenant) {
    try {
      const res = await api.post('api/tenants', tenant)
      AppState.tenants.push(res.data)
      this.getAll()
      return res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async edit(tenant) {
    try {
      const res = await api.put('api/tenants/' + tenant.id, tenant)
      this.getById(res.data._id)
    } catch (error) {
      logger.error(error)
    }
  }

  /*
    Calls server-side controller, removes tenant
  */

  async delete(id) {
    const res = window.confirm('Are you sure you want to remove this tenant?')
    if (!res) {
      return
    }
    try {
      await api.delete('api/tenants/' + id)
      this.getById(id)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteBeforeRentalCreation(id) {
    // DO NEED THIS, CHECK TO SEE IF STATE.MAINTENANCES IS EMPTY AND THEN RUN THIS IF SO
    const res = window.confirm('Are you sure you want to stop creating this rental?')
    if (!res) {
      return
    }
    try {
      await api.delete('api/tenants/' + id + '/beforeRental')
    } catch (error) {
      logger.error(error)
    }
  }
}

export const tenantsService = new TenantsService()
