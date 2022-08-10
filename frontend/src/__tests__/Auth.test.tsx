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

describe('tests for the login screen', () => {

  let emailInput: HTMLElement;
  let signInButton: HTMLElement;
  let createAccountButton: HTMLElement;

  beforeEach(() => {
    render(<BrowserRouter><Auth/></BrowserRouter>);
    emailInput = screen.getByRole('textbox', {name: 'Email Address'});
    signInButton = screen.getByRole('button', {name: 'Sign In'});
    createAccountButton = screen.getByRole('button', {name: `Don't have an account? Sign Up`});
  });

  // afterEach(() => {
  //   localStorage.clear();
  //   component.unmount();
  // });

  test('Form fields should have a correct type attribute', () => {
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(signInButton).toHaveAttribute('type', 'submit');
    expect(createAccountButton).toHaveAttribute('type', 'button');
  });

  // test('test 2', () => {
  //   userEvent.type(screen.getByRole('textbox', {name: 'Email Address'}))
  // })

})