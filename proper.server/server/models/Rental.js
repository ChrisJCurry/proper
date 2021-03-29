
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Task = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    closed: { type: Boolean, required: true, default: false }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

const Rental = new Schema(
  {
    // address.street
    // address.apt
    // address.city
    // address.state
    // address.zip
    // address.country
    address: { type: {} },
    rent: { type: Number },
    yearBuilt: { type: String },
    tasks: [Task],
    tenants: [{ type: String, ref: 'Tenant' }],
    picture: { type: String },
    closed: { type: Boolean, default: false },
    creatorId: { type: String, required: true },
    ownerId: { type: ObjectId }
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
