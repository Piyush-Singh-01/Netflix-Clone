//useMovieById.jsx
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMovieTrailer } from '../redux/movieSlice';

const useMovieById = (movieId) =>{
    const dispatch = useDispatch();
    const playTrailer = useSelector((store)=> store.movie.playTrailer);

   const fetchTrailer  = async()=>{
     try {
        const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTc1ZTk5YWRkMTMxMzRlOWFjYjJkOWFiZWYzNGJlYiIsIm5iZiI6MTc2MTgxMjcxOS44MTQwMDAxLCJzdWIiOiI2OTAzMjBlZjY5MjcwNDdlZGI5YTdiMTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ERUqMiu9qmNvpldTfo4ai_Wm2VIBrz5nJupEz0me6NA'
        }
    };
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);
        console.log(res.data.results);

        const trailer = res?.data?.results?.find((item)=> item.type === "Trailer"  && item.site === 'YouTube')
        dispatch(getMovieTrailer(trailer));
    } catch (error) {
        console.error("Error from searching data", error);
     }
   }
   useEffect(()=>{
    if (!movieId) return;
       fetchTrailer();
     },[movieId])  // 🔥 Re-run whenever movieId changes
}

export default useMovieById