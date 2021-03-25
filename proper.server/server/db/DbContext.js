import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import RentalSchema from '../models/Rental'
import MaintenanceSchema from '../models/Maintenance'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Rentals = mongoose.model('Rental', RentalSchema)

  Maintenances = mongoose.model('Maintenance', MaintenanceSchema)
}

export const dbContext = new DbContext()
