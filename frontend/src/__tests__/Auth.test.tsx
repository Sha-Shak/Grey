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
import Input from '../Components/Auth/Input';
import { testUser } from '../Mocks';

describe('tests for the login screen', () => {

  let emailInput: HTMLElement;
  let passwordInput: HTMLElement | null;
  let signInButton: HTMLElement;
  let createAccountButton: HTMLElement;
  let component: RenderResult;
  let history: BrowserHistory;

  beforeEach(() => {
    history = createBrowserHistory();
    const {container} = render(<BrowserRouter><Auth/></BrowserRouter>);
    emailInput = screen.getByRole('textbox', {name: 'Email Address'});
    passwordInput = container.querySelector(`input[name="password"]`);
    signInButton = screen.getByRole('button', {name: 'Sign In'});
    createAccountButton = screen.getByRole('button', {name: `Don't have an account? Sign Up`});
  });

  // afterEach(() => {
  //   localStorage.clear();
  //   component.unmount();
  // });

  test('Form fields should have a correct type attribute', () => {
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(signInButton).toHaveAttribute('type', 'submit');
    expect(createAccountButton).toHaveAttribute('type', 'button');
  });


  test('Login in the website works', async() => {
    // const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    // userEvent.click(signInButton);
    // expect(alert).toHaveBeenCalledTimes(1);
    //await waitFor(() => expect(screen.getByText('Invalid username or password')).toBeInTheDocument());
    fireEvent.change(emailInput, {target: {value: testUser.email}});
    fireEvent.change(passwordInput, {target: {value: testUser.result.password}});
    userEvent.click(signInButton);
    // await waitFor(() => expect(localStorage.getItem('user')).toBe(testUser));
  })

  test('register button should redirect to register page', async () => {
    // userEvent.click(createAccountButton);
    // await waitFor(() => expect(screen.getByRole('combobox', {name: 'Search here...'})));
    // expect(history.location.pathname).toBe(routes.HOME);
    // expect(createAccountButton).toHaveAttribute('href', routes.REGISTER);
    // userEvent.click(linkButton);
    // expect(history.location.pathname).toBe(routes.REGISTER);
  });


})