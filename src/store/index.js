import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.store'
import sectionsReducer from './sections.store'
import itemsReducer from './items.store'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    sections: sectionsReducer,
    items: itemsReducer,
  },
})
