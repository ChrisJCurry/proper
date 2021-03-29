import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TenantsService {
  async find(query = {}) {
    const tenants = await dbContext.Tenants.find(query)
    if (!tenants) {
      throw new BadRequest()
    }
    return tenants
  }

  async findById(id) {
    const tenant = await dbContext.Tenants.findById({ _id: id })
    if (!tenant) {
      throw new BadRequest(`Sorry, but you have sent the wrong ID ${id}. Please re-check the info you are sending through.`)
    }
    return tenant
  }

  async create(tenant) {
    const newTenant = await (await dbContext.Tenants.create(tenant))
    if (!newTenant) {
      throw new BadRequest(`You may be missing one of the required properties ${tenant}`)
    }
    return newTenant
  }

  async update(id, body, userInfo) {
    delete body.closed
    const tenant = await dbContext.Tenants.find({ _id: id })
    if (tenant.creatorId !== userInfo.id) {
      throw new BadRequest('You are not the creator of this rental and you do not have permissions to update this data.')
    }
    if (tenant.closed) {
      throw new BadRequest("You can't edit the tenant when it's closed.")
    }
    return await dbContext.Tenants.findOneAndUpdate({ _id: id }, body, { new: true })
  }

  async remove(id, body) {
    // passing the closed property through...even though they should not be able to send a body for the delete I am going to protect the data
    delete body.closed
    const tenant = await dbContext.Tenants.findOneAndUpdate({ _id: id }, { closed: true }, { new: true })
    if (!tenant) {
      throw new BadRequest('Cannot delete tenant')
    }
    return tenant
  }
}

export const tenantsService = new TenantsService()
