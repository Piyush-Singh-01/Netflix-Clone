//usePopularMovie.jsx
import { useDispatch } from 'react-redux'
import { getPopularMovies } from '../redux/movieSlice';
import { useEffect } from "react";
import axios from 'axios';

const usePopularMovie = () =>{
    const dispatch  = useDispatch();
     const fetchPopularMovies = async()=>{ 
     try {
      const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTc1ZTk5YWRkMTMxMzRlOWFjYjJkOWFiZWYzNGJlYiIsIm5iZiI6MTc2MTgxMjcxOS44MTQwMDAxLCJzdWIiOiI2OTAzMjBlZjY5MjcwNDdlZGI5YTdiMTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ERUqMiu9qmNvpldTfo4ai_Wm2VIBrz5nJupEz0me6NA'
      }
  };
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,options);
      console.log(res);
      dispatch(getPopularMovies(res.data.results))
    } catch (error) {
      console.error('Error fetching data from TMDB:', error);
    }  
  };
  useEffect(()=>{
    fetchPopularMovies();
  },[dispatch])
}

export default usePopularMovie