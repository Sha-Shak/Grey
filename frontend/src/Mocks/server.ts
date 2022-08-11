import { setupServer } from 'msw/node';
import { routes } from './';

export const server = setupServer(...routes);