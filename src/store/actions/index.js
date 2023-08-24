import { createAction } from '@reduxjs/toolkit';

export const loadFromLocalStorage = createAction('LOAD_FROM_LOCALSTORAGE');
export const addRequest = createAction('ADD_REQUEST');
export const updateRequest = createAction('UPDATE_REQUEST');
export const removeRequest = createAction('REMOVE_REQUEST');

export const sortRequests = createAction('SORT_REQUESTS');
