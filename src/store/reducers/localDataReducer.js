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
    .addCase(updateRequest, (state, action) => {
      const updatedItem = action.payload;

      // Find the index of the item with the matching ID
      const updatedIndex = state.results.findIndex(
        (item) => item.id === updatedItem.id
      );

      if (updatedIndex !== -1) {
        // Create a new array with the updated item
        const updatedResults = [
          ...state.results.slice(0, updatedIndex),
          updatedItem,
          ...state.results.slice(updatedIndex + 1),
        ];

        // Update local storage
        localStorage.setItem(updatedItem.id, JSON.stringify(updatedItem));

        // Return the new state with the updated results array
        return { ...state, results: updatedResults };
      }

      // If the item was not found, return the current state
      return state;
    })
    .addCase(removeRequest, (state, action) => {
      const idToRemove = action.payload.id;
      localStorage.removeItem(idToRemove);

      // Create a new state object with the updated results array
      const updatedResults = state.results.filter(
        (item) => item.id !== idToRemove
      );
      return { ...state, results: updatedResults };
    })
    .addDefaultCase((state) => state);
});

export default localData;
