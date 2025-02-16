import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import * as util from '../../services/user.service';
import { SafeUser, User, UserResponse } from '../../types';

const mockUser: User = {
  _id: new mongoose.Types.ObjectId(),
  username: 'mockUser',
  password: 'qwerty123',
};

const mockSafeUser: SafeUser = {
  _id: mockUser._id,
  username: 'mockUser',
};

const mockUserJSONResponse = {
  _id: mockUser._id?.toString(),
  username: 'mockUser',
};

const saveUserSpy = jest.spyOn(util, 'saveUser');
const getUserByUsernameSpy = jest.spyOn(util, 'getUserByUsername');

describe('User Controller Tests', () => {
  describe('POST /addUser', () => {
    it('should create a new user with given fields', async () => {
      const mockRequestBody = {
        username: 'mockUser',
        password: 'qwerty123',
      };

      saveUserSpy.mockResolvedValueOnce(mockSafeUser as UserResponse);

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserJSONResponse);
      expect(saveUserSpy).toHaveBeenCalledWith(mockRequestBody);
    });

    it('should return response status 400 if given invalid request w/out username', async () => {
      const mockRequestBody = {
        password: 'qwerty123',
      };

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(400);
    });

    it('should return response status 400 if given invalid request with empty username', async () => {
      const mockRequestBody = {
        username: '',
        password: 'qwerty123',
      };

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(400);
    });

    it('should return response status 400 if given invalid request w/out password', async () => {
      const mockRequestBody = {
        username: 'mockUser',
      };

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(400);
    });

    it('should return response status 400 if given invalid request with empty password', async () => {
      const mockRequestBody = {
        username: 'mockUser',
        password: '',
      };

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(400);
    });

    it('should return response status 500 if error occurs while saving the user', async () => {
      const mockRequestBody = {
        username: 'mockUser',
        password: 'qwerty123',
      };

      saveUserSpy.mockResolvedValueOnce({ error: 'Database error' });

      const response = await supertest(app).post('/user/addUser').send(mockRequestBody);

      expect(response.status).toBe(500);
    });
  });

  describe('GET /getUser/:username', () => {
    it('should return a user with the given username', async () => {
      getUserByUsernameSpy.mockResolvedValueOnce(mockSafeUser as UserResponse);

      const response = await supertest(app).get(`/user/getUser/${mockUser.username}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserJSONResponse);
      expect(getUserByUsernameSpy).toHaveBeenCalledWith(mockUser.username);
    });

    it('should return status 500 if error occurs finding user', async () => {
      getUserByUsernameSpy.mockResolvedValueOnce({ error: 'Database error' });

      const response = await supertest(app).get(`/user/getUser/${mockUser.username}`);

      expect(response.status).toBe(500);
    });

    it('should return status 404 if username not provided', async () => {
      const response = await supertest(app).get(`/user/getUser/`);
      expect(response.status).toBe(404);
    });
  });
});
