import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        value: false,
    },
    reducers: {
        setFilter: (state, payload) => {
            state.value = payload;
        }
    }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;