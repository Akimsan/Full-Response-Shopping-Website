// it has store of redux
import { combineReducers, configureStore } from "@reduxjs/toolkit"; // it is used to create a store
import { thunk } from "redux-thunk"; // it is used to convert the synchronous functions to asynchronous functions and it is a middleware
import productsReducer from './slices/productsSlice';

// Define your reducers
const reducer = combineReducers({
  // your reducers here
   //key: valuse
   productsState : productsReducer

});

// Configure the store
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
