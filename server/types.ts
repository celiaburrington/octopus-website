import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { Server } from 'socket.io';

export type OctoSiteSocket = Server<ServerToClientEvents>;

/**
 * Interface representing the possible events that the server can emit to the client.
 */
export interface ServerToClientEvents {
  example: (argument: String) => void;
}

/**
 * Interface representing a User document, which contains:
 * 
 * - _id - The unique identifier for the user. Optional field
 * - username - The username for the user
 * - password - The password for the user
 */
export interface User {
  _id?: ObjectId;
  username: string;
  password: string;
}

/**
 * Type representing the possible responses for a User-related operation.
 */
export type UserResponse = User | { error: string };


/**
 * Interface for the request body when adding a new user.
 * - body - The user being added.
 */
export interface AddUserRequest extends Request {
  body: User;
}
