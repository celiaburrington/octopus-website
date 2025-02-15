import { useState } from 'react';
import { User, OctoSiteSocket } from '../types';

/**
 * Custom hook to manage the state and logic of OctopusWebsite.
 *
 * @param socket - the WebSocket connection associated with the current user.
 * @returns user - the user currently logged in
 * @returns setUser - function to set the currently logged in user
 */
const useOctopusWebsite = (socket: OctoSiteSocket | null) => {
  const [user, setUser] = useState<User | null>(null);

  return { user, setUser };
};

export default useOctopusWebsite;
