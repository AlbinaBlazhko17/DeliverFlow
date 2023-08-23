import { createReducer } from '@reduxjs/toolkit';
import { addRequest, updateRequest, removeRequest } from '../actions';

const initialState = {
  results: [],
};

const localData = createReducer(initialState, (builder) => {
  builder
    .addCase(addRequest, (state, action) => {
      const newItem = { ...action.payload };
      state.results.push(newItem);
    })
    .addCase(
      removeRequest,
      (state, action) =>
        (state = state.filter((item) => item.id !== action.payload))
    )
    .addDefaultCase((state) => state);
});

export default localData;
