import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import RentalSchema from '../models/Rental'
import OwnerSchema from '../models/Owner'
import NoteSchema from '../models/Note'
import TenantSchema from '../models/Tenant'
import MessageSchema from '../models/Message'
import TaskSchema from '../models/Task'
class DbContext {
  Note = mongoose.model('Note', NoteSchema)
  Account = mongoose.model('Account', AccountSchema);
  Rentals = mongoose.model('Rental', RentalSchema)
  Owners = mongoose.model('Owner', OwnerSchema)

  Tenants = mongoose.model('Tenant', TenantSchema)

  Messages = mongoose.model('Message', MessageSchema)
  Tasks = mongoose.model('Task', TaskSchema)
}

export const dbContext = new DbContext()
