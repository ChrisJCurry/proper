import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Tenant = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    creatorId: { type: String, required: true },
    closed: { type: Boolean, required: true, default: false }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Tenant.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Tenant
