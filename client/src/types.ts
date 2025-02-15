import { Socket } from 'socket.io-client';

export type OctoSiteSocket = Socket<ServerToClientEvents>;

/**
 * Interface representing the possible events that the server can emit to the client.
 */
export interface ServerToClientEvents {
  example: (argument: string) => void;
}

/**
 * Interface representing a User document, which contains:
 *
 * - _id - The unique identifier for the user. Optional field
 * - username - The username for the user
 * - password - The password for the user
 */
export interface User {
  _id?: string;
  username: string;
  password: string;
}
