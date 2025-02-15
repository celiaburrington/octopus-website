import { Schema } from 'mongoose';

/**
 * Mongoose schema for the User collection.
 *
 * Each User includes the following fields:
 * - `username`: The user's username. This field is required.
 * - `password`: The user's password. This field is required.
 */
const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }
);

export default userSchema;
