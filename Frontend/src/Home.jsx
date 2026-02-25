import Header from './Header';
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import useNowPlayingMovie from './hooks/useNowPlayingMovie';
import usePopularMovie from './hooks/usePopularMovie';
import useTopRatedMovie from './hooks/useTopRatedMovie';
import useUpComingMovies from './hooks/useUpComingMovie';
import useGetCurrentUser from './hooks/useGetCurrentUser';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayTrailer } from './redux/movieSlice';

function Home() {
  useGetCurrentUser();

  useNowPlayingMovie();
  usePopularMovie();
  useTopRatedMovie();
  useUpComingMovies();

  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);
  const playTrailer = useSelector((store) => store.movie.playTrailer);

  // 🎬 Set default trailer when page loads
  useEffect(() => {
    if (!playTrailer && nowPlayingMovies?.length > 0) {
      dispatch(getPlayTrailer(nowPlayingMovies[0]));
    }
  }, [nowPlayingMovies, playTrailer, dispatch]);

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-[#141414]">
        <MainContainer />
        <MovieContainer />
      </div>
    </>
  );
}

export default Home;