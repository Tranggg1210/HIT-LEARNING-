import { createSlice } from '@reduxjs/toolkit'

export const itemsStore = createSlice({
  name: 'items',
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
  },
})

export const { setItems } = itemsStore.actions

export default itemsStore.reducer
