import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class OwnersService {
  async find(query = {}) {
    const owners = await dbContext.Owners.find(query).populate('creator', 'name email')
    if (!owners) {
      throw new BadRequest()
    }
    return owners
  }

  async findById(id) {
    const owner = await dbContext.Owners.findById({ _id: id }).populate('creator', 'name email')
    if (!owner) {
      throw new BadRequest(`Sorry, but you have sent the wrong ID ${id}. Please re-check the info you are sending through.`)
    }
    return owner
  }

  async create(owner) {
    const newOwner = await (await dbContext.Owners.create(owner)).populate('creator', 'name email')
    if (!newOwner) {
      throw new BadRequest(`You may be missing one of the required properties ${owner}`)
    }
    return newOwner
  }

  async update(id, body, userInfo) {
    delete body.closed
    const owner = await dbContext.Owners.find({ _id: id })
    if (owner.creatorId !== userInfo.id) {
      throw new BadRequest('You are not the creator of this rental and you do not have permissions to update this data.')
    }
    if (owner.closed) {
      throw new BadRequest("You can't edit the owner when it's closed.")
    }
    return await dbContext.Owners.findOneAndUpdate({ _id: id }, body, { new: true })
  }

  async remove(id, body) {
    // passing the closed property through...even though they should not be able to send a body for the delete I am going to protect the data
    delete body.closed
    const owner = await dbContext.Owners.findOneAndUpdate({ _id: id }, { closed: true }, { new: true })
    if (!owner) {
      throw new BadRequest('You can not actually delete this. Please send the ID and we will softly delete this data')
    }
    return owner
  }
}

export const ownersService = new OwnersService()
