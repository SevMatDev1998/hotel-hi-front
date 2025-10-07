import { createSlice } from "@reduxjs/toolkit";

interface IGeneralState {
    isSidebarOpen: boolean
}

const initialState: IGeneralState = {
    isSidebarOpen: true,
}

const generalSlice = createSlice({
    name: "generalSlice",
    initialState,
    reducers: {
        toggleSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        }
    },
})

export const { toggleSidebar } = generalSlice.actions
export default generalSlice.reducer

