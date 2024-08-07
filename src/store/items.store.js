import { createSlice } from '@reduxjs/toolkit'

export const itemsStore = createSlice({
  name: 'items',
  initialState: {
    itemsBySectionId: {},
  },
  reducers: {
    setItems: (state, action) => {
      const { sectionId, items } = action.payload
      state.itemsBySectionId[sectionId] = items
    },
    clearItems: (state) => {
      state.itemsBySectionId = {}
    },
  },
})

export const { setItems, clearItems } = itemsStore.actions

export default itemsStore.reducer
