import { User, UserResponse } from '../types';
import UserModel from '../model/user';

// type checking utility for type-safe access to error code
const isMongoError = (error: unknown): error is { code?: number } =>
  typeof error === 'object' && error !== null && 'code' in error;

/**
 * Saves a new user to the database.
 *
 * @param {User} user - The user to save
 * @returns {Promise<UserResponse>} - The saved user, or an error message if the save failed
 */
export const saveUser = async (user: User): Promise<UserResponse> => {
  try {
    const result = await UserModel.create(user);

    if (!result) {
      throw Error('Failed to create new user');
    }

    return {
      _id: result._id,
      username: result.username,
    };
  } catch (error) {
    if (isMongoError(error)) {
      if (error.code === 11000) {
        // return specific message if error code matched MongoDB duplicate key error
        return { error: 'Username must be unique' };
      }
    }
    return { error: 'Error when saving a user' };
  }
};

/**
 * Retrieves a user from the database by their username.
 *
 * @param {string} username - The username of the user to find.
 * @returns {Promise<UserResponse>} - Resolves with the found user object (without the password) or an error message.
 */
export const getUserByUsername = async (username: string): Promise<UserResponse> => {
  try {
    const user = await UserModel.findOne({ username }).select('-password');

    if (!user) {
      throw Error('User not found');
    }

    return user;
  } catch (error) {
    return { error: `Error occurred when finding user: ${error}` };
  }
};
