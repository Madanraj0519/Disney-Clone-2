import  { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/User/userSlice";
import moviesReducer from "../features/Movie/MoviesSlice";
import movieDetailReducer from "../features/Movie/movieDetail";


export default configureStore({
    reducer:{
        user: userReducer,
        movies: moviesReducer,
        movieDetail: movieDetailReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});