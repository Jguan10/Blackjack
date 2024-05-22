import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'loggedIn',
  initialState: {
    value: false,
    email: "",
    password: "",
  },
  reducers: {
    loggedIn: (state, email, password) => {
      state.value = true;
      state.email = email;
      state.password = password;
    },
    signedOut: (state) => {
      state.value = false;
      state.email = "";
      state.password = "";
    },
  },
})

export const { loggedIn, signedOut } = counterSlice.actions
export default counterSlice.reducer