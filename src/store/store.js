import { configureStore } from "@reduxjs/toolkit";
import { HomeSlices } from "./HomeSlice";

export const store=configureStore({
    reducer:{
        Home:HomeSlices
    }
})