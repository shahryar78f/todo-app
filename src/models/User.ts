import { model, models, Schema } from 'mongoose';

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { _id: true }
);

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  lastName: String,
  avatar: String,
  todos: [todoSchema],
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

const User = models.User || model('User', userSchema);

export default User;