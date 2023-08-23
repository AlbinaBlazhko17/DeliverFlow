import { configureStore } from '@reduxjs/toolkit';
// import { setLocalStorage } from '../utils/localStorage';
import rootReducer from './reducers';

const store = configureStore(
  { reducer: rootReducer },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const data = store.getState().localData.results;
  // console.log(data);
  data.forEach((item) => {
    const itemKey = `${item.id}`;
    localStorage.setItem(itemKey, JSON.stringify(item));
  });
});

export default store;
