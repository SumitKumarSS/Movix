import { createSlice } from "@reduxjs/toolkit";


const HomeSlice=createSlice({
    name:"Home",
    initialState:{
        url:{},
        genre:{}

    },
    reducers:{
        getApiConfig : (state,action)=>{
            state.url=action.payload
        },
        getGenre:(state,action)=>{
            state.genre=action.payload
        }
    }
})

export const {getApiConfig,getGenre}=HomeSlice.actions

export const HomeSlices=HomeSlice.reducer