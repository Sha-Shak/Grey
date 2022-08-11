/* eslint-disable testing-library/no-render-in-setup */
import {
  render,
  screen
} from '@testing-library/react';
import '@testing-library/jest-dom';
import SinglePost from '../Components/PostDetail/SinglePost';
import { testPost } from '../Mocks';


describe('Renders content', () => {

  let titleContainer: HTMLElement;
  let messageContainer: HTMLElement;


  beforeEach(() => {
    render(<SinglePost post={testPost}/>);
    titleContainer = screen.getByText(testPost.title);
    messageContainer = screen.getByText(testPost.message);
  });

  test('title and post info is being displayed', () => {
    expect(titleContainer).not.toBe(null);
    expect(messageContainer).not.toBe(null);
  })

})