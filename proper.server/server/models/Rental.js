
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Rental = new Schema(
  {
    // address.street
    // address.apt
    // address.city
    // address.state
    // address.zip
    // address.country
    address: { type: {}, required: true },
    rent: { type: Number, required: true },
    yearBuilt: { type: String, required: true },
    tenants: [{ type: String, ref: 'Tenant' }],
    maintenance: [],
    owner: { type: {}, required: true },
    creatorId: { type: String, required: true },
    maintenanceId: { type: ObjectId, ref: 'Maintenance', required: true },
    ownerId: { type: ObjectId, ref: 'Owner', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Rental.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Rental
