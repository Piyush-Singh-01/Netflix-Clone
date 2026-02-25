import { useDispatch, useSelector } from "react-redux";
import { getPlayTrailer } from "./redux/movieSlice";

function MovieRow({ title, movies }) {
  const dispatch = useDispatch();

  return (
    <div className="px-6 md:px-16 py-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4">{title}</h1>

      <div className="flex gap-4 overflow-x-auto no-scrollbar ">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            onClick={() => dispatch(getPlayTrailer(movie))}
            className="min-w-[150px] md:min-w-[200px] transform hover:scale-110 transition duration-300 cursor-pointer"
          >
            <img
              className="rounded-lg shadow-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieContainer() {
  const popular = useSelector((store) => store.movie.popularMovies);
  const upComing = useSelector((store) => store.movie.upComingMovies);
  const topRated = useSelector((store) => store.movie.topRatedMovies);

  return (
    <div className="pb-10">
      <MovieRow title="Popular Movies" movies={popular} />
      <MovieRow title="Upcoming Movies" movies={upComing} />
      <MovieRow title="Top Rated Movies" movies={topRated} />
    </div>
  );
}

export default MovieContainer;