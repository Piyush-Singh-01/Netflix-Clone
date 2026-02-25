//movieSlice.jsx
import {createSlice} from "@reduxjs/toolkit"

const movieSlice = createSlice({
    name: "movie",
    initialState:{
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upComingMovies:null,
        movieTrailer: null,
        playTrailer: null,
    },
    reducers:{
        getNowPlayingMovies:(state, action)=>{
            state.nowPlayingMovies = action.payload;
        }, 
        getPopularMovies: (state,action)=>{
            state.popularMovies = action.payload;
        },
        getTopRatedMovies:(state, action)=>{
            state.topRatedMovies = action.payload;
        },
        getUpComingMovies: (state, action)=>{
            state.upComingMovies = action.payload;
        },
        getMovieTrailer: (state, action)=>{
             state.movieTrailer = action.payload;
        },
        getPlayTrailer: (state,action)=>{
            state.playTrailer = action.payload;
        }
    },
    
})

export const {getNowPlayingMovies,getPopularMovies,getTopRatedMovies,getUpComingMovies,getMovieTrailer, getPlayTrailer} = movieSlice.actions;
export default movieSlice.reducer;

