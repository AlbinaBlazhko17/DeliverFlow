import { createReducer } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../utils/localStorage';
import { addRequest, updateRequest, removeRequest } from '../actions';

const localData = createReducer(getLocalStorage('store'), (builder) => {
  builder
    .addCase(addRequest, (state, action) => {
      state.results.push(action.payload);
    })
    // .addCase(
    //   removeRequest,
    //   (state, action) =>
    //     (state = state.filter((item) => item.id !== action.payload))
    // )
    .addDefaultCase((state) => state);
});

export default localData;
