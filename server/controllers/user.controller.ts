import express, { Response } from 'express';
import { AddUserRequest, GetUserRequest, OctoSiteSocket, User } from '../types';
import { getUserByUsername, saveUser } from '../services/user.service';

const userController = (socket: OctoSiteSocket) => {
  const router = express.Router();

  /**
   * Checks if the provided user contains the required fields.
   *
   * @param user The user object to validate.
   *
   * @returns `true` if the user is valid, otherwise `false`.
   */
  function isUserValid(user: User): boolean {
    return !!user.username && !!user.password;
  }

  /**
   * Adds a new user to the database. The add user request and user are validated then saved.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The AddUserRequest object containing the user data.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const addUser = async (req: AddUserRequest, res: Response): Promise<void> => {
    if (!isUserValid(req.body)) {
      res.status(400).send('Invalid user');
      return;
    }

    const userInfo = req.body;

    try {
      const userFromDb = await saveUser(userInfo);

      if ('error' in userFromDb) {
        throw new Error(userFromDb.error as string);
      }

      res.json(userFromDb);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  /**
   * Fetches a User from the database by their username.
   * If there is an error, the HTTP response's status is updated.
   *
   * @param req The GetUserRequest object containing the username.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const getUser = async (req: GetUserRequest, res: Response): Promise<void> => {
    const { username } = req.params;

    try {
      const userFromDb = await getUserByUsername(username);

      if ('error' in userFromDb) {
        throw new Error(userFromDb.error as string);
      }

      res.json(userFromDb);
    } catch (err) {
      res.status(500).send(`${(err as Error).message}`);
    }
  };

  // Routes
  router.post('/addUser', addUser);
  router.get('/getUser/:username', getUser);

  return router;
};

export default userController;
