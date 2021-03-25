import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Owner = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: {}, required: true },
    email: { type: String, required: true },
    creatorId: { type: String, required: true },
    closed: { type: Boolean, required: true, default: false }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Owner.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Owner
