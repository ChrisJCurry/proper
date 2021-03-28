import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import RentalSchema from '../models/Rental'
import MaintenanceSchema from '../models/Maintenance'
import OwnerSchema from '../models/Owner'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Rentals = mongoose.model('Rental', RentalSchema)

  Maintenances = mongoose.model('Maintenance', MaintenanceSchema)

  Owners = mongoose.model('Owner', OwnerSchema)
}

export const dbContext = new DbContext()
