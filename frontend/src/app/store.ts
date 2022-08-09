import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export const store = createStore(reducers, applyMiddleware(thunk))
// export const store = configureStore(reducers)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
