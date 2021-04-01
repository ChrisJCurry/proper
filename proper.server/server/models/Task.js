
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Task = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rentalId: { type: ObjectId, required: true },
    closed: { type: Boolean, required: true, default: false },
    dueDate: { type: String, required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Task
