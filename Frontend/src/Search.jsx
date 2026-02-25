//Search.jsx
import { useEffect, useState } from "react"
import Header from "./Header"
import axios from "axios"
import { useDispatch } from "react-redux"
import { getPlayTrailer } from "./redux/movieSlice"
import { useNavigate } from "react-router-dom"

function Search() {
  const [input, setInput] = useState("")
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async(e)=>{
    e.preventDefault(); 
    
    try {
      const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTc1ZTk5YWRkMTMxMzRlOWFjYjJkOWFiZWYzNGJlYiIsIm5iZiI6MTc2MTgxMjcxOS44MTQwMDAxLCJzdWIiOiI2OTAzMjBlZjY5MjcwNDdlZGI5YTdiMTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ERUqMiu9qmNvpldTfo4ai_Wm2VIBrz5nJupEz0me6NA'
        }
      }
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`, options);
      
      const filtered = res.data.results.filter(
        (movie) => movie.poster_path || movie.backdrop_path
     );

      setData(filtered);
      console.log(res.data.results);
    } catch (error) {
       console.log("Error from search movie", error);
    }

    setInput("");
  }
  const goHome = ()=>{
     navigate('/home')
  }
  return (
    <>
      <Header />
      <div className="pt-24 px-6 md:px-16 min-h-screen">
        <form onSubmit={submitHandler} className="flex gap-4 mb-8">
          <input
            className="flex-1 p-3 rounded bg-gray-800"
            placeholder="Search movies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-[#E50914] px-6 rounded">Search</button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.map((movie) => (
            <img
              key={movie.id}
              onClick={() => {
                dispatch(getPlayTrailer(movie));
                navigate("/home");
              }}
              className="rounded-lg cursor-pointer hover:scale-105 transition"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
              alt={movie.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}

//   return (
//     <>
//      <Header/>
//      <div className="search">
//          <form onSubmit={submitHandler} className="search-movie">
//             <input placeholder="Search movie..." onChange={(e)=> setInput(e.target.value)} value = {input} type="text" />
//             <button>Search</button>
//          </form>   
//          <div className='search-movie-box'>
          
//           {data?.length ? (
//             data.map((movie) => (
//               <div className="search-box" key={movie.id} onClick={()=> dispatch(getPlayTrailer(movie))}>
//                 <img onClick={goHome}
//                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
//                   alt={movie.title}
//                 />
//                 {/* <h1>{movie.title}</h1> */}
//               </div>
//             ))
//           ) : (
//             <p></p>
//           )}
//         </div>
//      </div>
    
//     </>
//   )
// }

export default Search


// import { useState } from "react";
// import Header from "../header/Header";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { getPlayTrailer } from "../redux/movieSlice";
// import { useNavigate } from "react-router-dom";

// function Search() {
//   const [input, setInput] = useState("");
//   const [data, setData] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.get(
//         `https://api.themoviedb.org/3/search/movie?query=${input}&language=en-US&page=1`,
//         {
//           headers: {
//             accept: "application/json",
//             Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
//           },
//         }
//       );

//       const filtered = res.data.results.filter(
//         (movie) => movie.poster_path || movie.backdrop_path
//       );

//       setData(filtered);
//     } catch (error) {
//       console.log("Search error", error);
//     }

//     setInput("");
//   };

//   return (
//     <>
//       <Header />
//       <div className="pt-24 px-6 md:px-16 min-h-screen">
//         <form onSubmit={submitHandler} className="flex gap-4 mb-8">
//           <input
//             className="flex-1 p-3 rounded bg-gray-800"
//             placeholder="Search movies..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button className="bg-netflixRed px-6 rounded">Search</button>
//         </form>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {data.map((movie) => (
//             <img
//               key={movie.id}
//               onClick={() => {
//                 dispatch(getPlayTrailer(movie));
//                 navigate("/home");
//               }}
//               className="rounded-lg cursor-pointer hover:scale-105 transition"
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
//               alt={movie.title}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Search;