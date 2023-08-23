import { configureStore } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import rootReducer from './reducers';

const store = configureStore(
  { reducer: rootReducer },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const state = store.getState();
  if (state.localData && state.localData.results) {
    const data = state.localData.results;
    data.forEach((item) => {
      localStorage.setItem(item.id, JSON.stringify(item));
    });
  }
});

export default store;
