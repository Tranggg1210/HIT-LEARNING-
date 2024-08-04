import { createSlice } from "@reduxjs/toolkit";

export const sectionsStore = createSlice({
    name: "sections",
    initialState:{
        sections: [],
    },
    reducers: {
        setSections: (state, action) => {
            state.sections = action.payload
        }
    }
})
export const {setSections} = sectionsStore.actions

export default sectionsStore.reducer