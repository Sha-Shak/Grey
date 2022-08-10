/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Auth from '../Components/Auth/Auth';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { BrowserHistory, createBrowserHistory } from 'history';
import { testUser } from '../Mocks';

describe('tests for the login screen', () => {

  let emailInput: HTMLElement;
  let passwordInput: HTMLElement | null;
  let signInButton: HTMLElement;
  let createAccountButton: HTMLElement;
  let history: BrowserHistory;

  beforeEach(() => {
    history = createBrowserHistory();
    const {container} = render(<BrowserRouter><Auth/></BrowserRouter>);
    emailInput = screen.getByRole('textbox', {name: 'Email Address'});
    passwordInput = container.querySelector(`input[name="password"]`);
    signInButton = screen.getByRole('button', {name: 'Sign In'});
    createAccountButton = screen.getByRole('button', {name: `Don't have an account? Sign Up`});
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('Form fields should have a correct type attribute', () => {
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(signInButton).toHaveAttribute('type', 'submit');
    expect(createAccountButton).toHaveAttribute('type', 'button');
  });


  test('Login in the website fails when user email doesnt exist in db', async() => {
    //Wrong email
    fireEvent.change(emailInput, {target: {value: 'wrongemail@gmail.com'}});
    fireEvent.change(passwordInput, {target: {value: testUser.result.password}});
    userEvent.click(signInButton);
    await waitFor(() => expect(localStorage.getItem('user')).toBe(null));
  })

  test('Login in the website fails when user password is wrong', async() => {
    //Wrong password
    fireEvent.change(emailInput, {target: {value: testUser.email}});
    fireEvent.change(passwordInput, {target: {value: 'wrongpassword'}});
    userEvent.click(signInButton);
    await waitFor(() => expect(localStorage.getItem('user')).toBe(null));
  })

  test('Login in the website works when user exists in db', async() => {
    fireEvent.change(emailInput, {target: {value: testUser.email}});
    fireEvent.change(passwordInput, {target: {value: testUser.result.password}});
    userEvent.click(signInButton);
    await waitFor(() => expect(localStorage.getItem('user')).toBe(JSON.stringify({...testUser})));
  })

    // const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    // userEvent.click(signInButton);
    // expect(alert).toHaveBeenCalledTimes(1);
    //await waitFor(() => expect(screen.getByText('Invalid username or password')).toBeInTheDocument());
})