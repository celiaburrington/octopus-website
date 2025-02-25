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

export type Bill = {
  id: string;
  session: string;
  jurisdiction: {
    id: string;
    name: string;
    classification: 'state' | 'municipality' | 'country';
  };
  from_organization: {
    id: string;
    name: string;
    classification: string;
  };
  identifier: string;
  title: string;
  created_at: string;
  updated_at: string;
  openstates_url: string;
  first_action_date?: string;
  latest_action_date?: string;
  latest_action_description?: string;
  latest_passage_date?: string;
};

export type BillResponse = {
  results: Bill[];
  pagination: {
    max_page: number;
    page: number;
    per_page: number;
    total_items: number;
  };
};
