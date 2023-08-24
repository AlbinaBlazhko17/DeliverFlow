import { createReducer } from '@reduxjs/toolkit';
import {
  addRequest,
  updateRequest,
  removeRequest,
  sortRequests,
  loadFromLocalStorage,
} from '../actions';

const initialState = {
  results: [],
  sortType: '',
};
export const sortRequestsByDate = (sortByDateDispatch) => ({
  type: 'localData/sortRequestsByDate',
  payload: sortByDateDispatch,
});

const localData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFromLocalStorage, (state, action) => {
      const storedData = [];

      // for (let i = 0; i < localStorage.length; i++) {
      //   const key = localStorage.key(i);
      //   const value = JSON.parse(localStorage.getItem(key));
      //   storedData[key] = value;
      // }

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        storedData.push(value);
      }

      if (storedData) {
        return { ...state, results: storedData };
      }

      return state;
      // if (storedData) {
      //   return { ...state, results: storedData };
      // }

      // return state;
    })
    .addCase(addRequest, (state, action) => {
      // const newItem = { ...action.payload };
      // state.results[newItem.id] = newItem;
      // const updatedResults = { ...state.results };

      // localStorage.setItem(newItem.id, JSON.stringify(newItem));

      // return { ...state, results: updatedResults };

      const newItem = { ...action.payload };
      const updatedResults = [...state.results, newItem];

      localStorage.setItem(newItem.id, JSON.stringify(newItem));
      return { ...state, results: updatedResults };
    })
    .addCase(updateRequest, (state, action) => {
      // const updatedItem = action.payload;

      // const updatedResults = {
      //   ...state.results,
      //   [updatedItem.id]: updatedItem,
      // };

      // localStorage.setItem(updatedItem.id, JSON.stringify(updatedItem));

      // return { ...state, results: updatedResults };
      const updatedItem = action.payload;

      // Find the index of the item to be updated based on its ID
      const updatedIndex = state.results.findIndex(
        (item) => item.id === updatedItem.id
      );

      if (updatedIndex !== -1) {
        // Create a new array with the updated item at the correct index
        const updatedResults = [
          ...state.results.slice(0, updatedIndex),
          updatedItem,
          ...state.results.slice(updatedIndex + 1),
        ];

        // Update the local storage
        localStorage.setItem(updatedItem.id, JSON.stringify(updatedItem));

        // Return the updated state with the new array of results
        return { ...state, results: updatedResults };
      }

      // Return the current state if the item was not found
      return state;
    })
    .addCase(removeRequest, (state, action) => {
      // const idToRemove = action.payload.id;
      // localStorage.removeItem(idToRemove);
      // const updatedResults = { ...state.results };
      // delete updatedResults[idToRemove];
      // return { ...state, results: updatedResults };
      const idToRemove = action.payload.id;
      localStorage.removeItem(idToRemove);
      return {
        ...state,
        results: state.results.filter((item) => item.id !== idToRemove),
      };
    })
    .addCase(sortRequests, (state, action) => {
      // const sortByDispatch = action.payload.sortType;
      // const sortedResults = { ...action.payload.requests };

      // const sortedArray = Object.values(sortedResults).sort((a, b) => {
      //   const dateA = sortByDispatch === 'dispatch' ? a.date : a.dateOfCreation;
      //   const dateB = sortByDispatch === 'dispatch' ? b.date : b.dateOfCreation;

      //   const parsedDateA = Date.parse(dateA.split('/').reverse().join('-'));
      //   const parsedDateB = Date.parse(dateB.split('/').reverse().join('-'));

      //   return parsedDateB - parsedDateA;
      // });

      // const updatedSortedResults = {};
      // sortedArray.forEach((item) => {
      //   updatedSortedResults[item.id] = item;
      // });

      // return { ...state, results: updatedSortedResults };
      const sortByDispatch = action.payload.sortType;
      const data = [...action.payload.requests];
      const itemsWithDate = [];
      const itemsWithoutDate = [];

      data.forEach((el, i) => {
        if (el.date) {
          itemsWithDate.push(el);
        } else {
          itemsWithoutDate.push(el);
        }
      });

      const sortedItemsWithDate = itemsWithDate.sort((a, b) => {
        const dateA = sortByDispatch === 'dispatch' ? a.date : a.dateOfCreation;
        const dateB = sortByDispatch === 'dispatch' ? b.date : b.dateOfCreation;

        const parsedDateA = Date.parse(dateA.split('/').reverse().join('-'));
        const parsedDateB = Date.parse(dateB.split('/').reverse().join('-'));

        return parsedDateB - parsedDateA;
      });

      const sortedResults = [...sortedItemsWithDate, ...itemsWithoutDate];

      return { ...state, results: sortedResults };
    })

    .addDefaultCase((state) => state);
});

export default localData;
