import { createSlice } from '@reduxjs/toolkit'

export const deckId = createSlice({
  name: 'deckId',
  initialState: {
    value: "",
  },
  reducers: {
    setId: (state, id) => {
      state.value = id;
    },
  },
})

export const { setId } = deckId.actions
export default deckId.reducer