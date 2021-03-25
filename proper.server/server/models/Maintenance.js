import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Task = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }
  }
)

const Maintenance = new Schema(
  {
    tasks: [Task],
    rentalId: { type: ObjectId, ref: 'Rental', required: true },
    creatorId: { type: String, required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Maintenance.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Maintenance
