import { configureStore } from '@reduxjs/toolkit';
import { setLocalStorage } from '../utils/localStorage';
import rootReducer from './reducers';

const store = configureStore(
  { reducer: rootReducer },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  setLocalStorage('store', store.getState().localData);
});

export default store;
