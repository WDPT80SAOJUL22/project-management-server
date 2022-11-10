import { Schema, model } from 'mongoose'

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  },
  { timestamps: true }
)

export default model('Project', projectSchema)
