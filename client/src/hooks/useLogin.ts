import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import useLoginContext from './useLoginContext';
import { addUser, loginUser } from '../services/userService';

/**
 * Custom hook to handle login input and submission.
 *
 * @returns username - The current value of the username input.
 * @returns handleInputChange - Function to handle changes in the input field.
 * @returns handleSubmit - Function to handle login submission
 */
const useLogin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [signupErr, setSignupErr] = useState<string>('');
  const { setUser } = useLoginContext();
  const navigate = useNavigate();

  /**
   * Function to handle the input change event for username input.
   *
   * @param e - the event object.
   */
  const handleUsernameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  /**
   * Function to handle the input change event for password input.
   *
   * @param e - the event object.
   */
  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /**
   * Function to clear user inputs and any errors.
   */
  const clearInputs = () => {
    setPassword('');
    setUsername('');
    setSignupErr('');
  };

  /**
   * Function to handle a login form submission event.
   *
   * @param event - the form event object.
   */
  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginUser({ username, password });

      setUser(user);

      navigate('/home');
    } catch (error) {
      // TODO: handle login errors.
      setSignupErr('Error logging in');
    }
  };

  /**
   * Function to handle a signup form submission event.
   *
   * @param e - the event object.
   */
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newUser = await addUser({
        username,
        password,
      });
      setUser(newUser);
      // TODO: make sure navigation is correct.
      navigate('/octoblog');
    } catch (error) {
      // TODO: handle signup errors.
      setSignupErr('Error logging in');
    }
  };

  return {
    username,
    handleUsernameInputChange,
    password,
    handlePasswordInputChange,
    handleLogIn,
    handleSignUp,
    signupErr,
    hasAccount,
    setHasAccount,
    clearInputs,
  };
};

export default useLogin;
