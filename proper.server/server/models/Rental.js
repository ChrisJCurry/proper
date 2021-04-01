
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
    address: { type: {} },
    rent: { type: Number },
    yearBuilt: { type: String },
    tenants: [{ type: String, ref: 'Tenant' }],
    picture: { type: String, required: true, default: 'https://firebasestorage.googleapis.com/v0/b/proper-capstone.appspot.com/o/images%2F1617123687903%2F234.jpg?alt=media&token=ec493c05-a85f-4df4-b42a-83b3c93a8ccf' }, // use default image for styling
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
