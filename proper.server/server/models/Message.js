import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Message = new Schema(
  {
    body: { type: String, required: true },
    creatorId: { type: String, required: true },
    toId: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Message.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Message
