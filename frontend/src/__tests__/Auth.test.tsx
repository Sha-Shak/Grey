/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Auth from '../Components/Auth/Auth';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { testUser, testUser2 } from '../Mocks';


describe('Tests for the login screen', () => {

  let emailInput: HTMLElement;
  let passwordInput: HTMLElement | null;
  let signInButton: HTMLElement;
  let createAccountButton: HTMLElement;


  beforeEach(() => {
    const { container } = render(<BrowserRouter><Auth isSignUp={false}/></BrowserRouter>);
    emailInput = screen.getByRole('textbox', {name: 'Email Address'});
    passwordInput = container.querySelector(`input[name="password"]`);
    signInButton = screen.getByRole('button', {name: 'Sign In'});
    createAccountButton = screen.getByRole('button', {name: `Don't have an account? Sign Up`});
  });

  afterEach(() => {
    localStorage.clear();
    cleanup();
  });


  test('Form fields should have a correct type attribute', () => {
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(signInButton).toHaveAttribute('type', 'submit');
    expect(createAccountButton).toHaveAttribute('type', 'button');
  });


  test('Login in the website fails when user email doesnt exist in db', async() => {
    fireEvent.change(emailInput, {target: {value: 'wrongemail@gmail.com'}});
    fireEvent.change(passwordInput, {target: {value: testUser.result.password}});
    userEvent.click(signInButton);
    await waitFor(() => expect(localStorage.getItem('user')).toBe(null));
  })


  test('Login in the website fails when user password is wrong', async() => {
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
})



describe('Tests for sign up', () => {

  let firstNameInput: HTMLElement;
  let lastNameInput: HTMLElement;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement | null;
  let confirmPasswordInput: HTMLElement | null;
  let signUpButton: HTMLElement;
  let alreadyAccountButton: HTMLElement;


  beforeEach(() => {
    const {container} = render(<BrowserRouter><Auth isSignUp={true}/></BrowserRouter>);
    firstNameInput = screen.getByRole('textbox', {name: 'First Name'});
    lastNameInput = screen.getByRole('textbox', {name: 'Last Name'});
    emailInput = screen.getByRole('textbox', {name: 'Email Address'});
    passwordInput = container.querySelector(`input[name="password"]`);
    confirmPasswordInput = container.querySelector(`input[name="confirmPassword"]`);
    signUpButton = screen.getByRole('button', {name: 'Sign Up'});
    alreadyAccountButton = screen.getByRole('button', {name: `Already Have an account? Sign In`});
  });

  afterEach(() => {
    localStorage.clear();
    cleanup();
  });


  test('Form fields should have a correct type/name attribute', () => {
    expect(firstNameInput).toHaveAttribute('name', 'firstName');
    expect(lastNameInput).toHaveAttribute('name', 'lastName');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'confirmPassword');
    expect(signUpButton).toHaveAttribute('type', 'submit');
    expect(alreadyAccountButton).toHaveAttribute('type', 'button');
  });


  test('Sign up in the website fails when user already exists in db', async () => {
    fireEvent.change(firstNameInput, {target: {value: 'Jane'}});
    fireEvent.change(lastNameInput, {target: {value: 'Doe'}});
    fireEvent.change(emailInput, {target: {value: testUser.email}});
    fireEvent.change(passwordInput, {target: {value: testUser.result.password}});
    fireEvent.change(confirmPasswordInput, {target: {value: testUser.result.password}});
    userEvent.click(signUpButton);
    await waitFor(() => expect(localStorage.getItem('user')).toBe(null));
  });


  test('Sign up in the website fails when password is different from confirm password', async () => {
    fireEvent.change(firstNameInput, {target: {value: 'Jane'}});
    fireEvent.change(lastNameInput, {target: {value: 'Doe'}});
    fireEvent.change(emailInput, {target: {value: 'new@gmail.com'}});
    fireEvent.change(passwordInput, {target: {value: 'pass1'}});
    fireEvent.change(confirmPasswordInput, {target: {value: 'pass2'}});
    userEvent.click(signUpButton);
    await waitFor(() => expect(localStorage.getItem('user')).toBe(null));;
  });


  test('Sign up in the website works for new user', async() => {
    fireEvent.change(firstNameInput, {target: {value: 'Jane'}});
    fireEvent.change(lastNameInput, {target: {value: 'Doe'}});
    fireEvent.change(emailInput, {target: {value: testUser2.result.email}});
    fireEvent.change(passwordInput, {target: {value: testUser2.result.password}});
    fireEvent.change(confirmPasswordInput, {target: {value: testUser2.result.password}});
    userEvent.click(signUpButton);
    await waitFor(() => expect(localStorage.getItem('user')).toBe(JSON.stringify({...testUser2})));
  })

})