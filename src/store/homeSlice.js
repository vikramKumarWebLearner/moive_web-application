import { createSlice } from "@reduxjs/toolkit";

export const homeSlice  = createSlice({
    name:'home',
    initialState:{
        url:{},
        genress:{}
    },

    reducers:{
        getApiConfi:(state ,action)=>{
            state.url = action.payload;
        },

        getGenress:(state ,action)=>{
            state.genress = action.payload;
        }
    }
});

export const {getApiConfi, getGenress} = homeSlice.actions;
export default  homeSlice.reducer;