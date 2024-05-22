import { configureStore } from '@reduxjs/toolkit'
import loggedInReducer from "./loggedIn.js";
import deckIdReducer from "./deckId.js";

export default configureStore({
  reducer: {
    auth: loggedInReducer,
    deckId: deckIdReducer
  },
})