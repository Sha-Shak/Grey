/* eslint-disable testing-library/no-render-in-setup */
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Components/Home/Home';

describe('Renders content', () => {

  let searchBar: HTMLElement;
  let titleInput: HTMLElement;
  let messageInput: HTMLElement;
  let tags: HTMLElement;

  beforeEach(() => {
    render(<Home/>);
    searchBar = screen.getByRole('combobox', {name: 'Search here...'});
    titleInput = screen.getByRole('textbox', {name: 'Title'});
    messageInput = screen.getByRole('textbox', {name: 'Message'});
    tags = screen.getByRole('textbox', {name: 'Tags'});
  });

  test('rendered components', () => {
    expect(searchBar).toHaveAttribute('type', 'search');
    expect(titleInput).toHaveAttribute('name', 'title');
    expect(messageInput).toHaveAttribute('name', 'message');
    expect(tags).toHaveAttribute('name', 'tag');
  })

  //Tiene que contener SearchInput, Posts y Form
 //screen.debug();
  //screen.getByRole('');
})