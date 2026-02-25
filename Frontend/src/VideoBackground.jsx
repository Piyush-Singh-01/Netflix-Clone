import { useSelector } from "react-redux";
import useMovieById from "./hooks/useMovieById";
import { useEffect, useRef } from "react";

const VideoBackground = ({ movieId, isPlaying }) => {
  const finalMovieId = movieId || "1062722";
  const movieTrailer = useSelector((store) => store.movie.movieTrailer);
  const iframeRef = useRef(null);

  useMovieById(finalMovieId);

  // Handle Play/Pause via postMessage (YouTube API)
  useEffect(() => {
    if (iframeRef.current) {
      const command = isPlaying ? 'playVideo' : 'pauseVideo';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
    }
  }, [isPlaying]);

  if (!movieTrailer || !movieTrailer.key) {
    return <div className="w-full aspect-video bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="w-full mt-[-80] overflow-hidden "> 
      <iframe
        ref={iframeRef}
        className="w-full aspect-video scale-125" // scale-125 hides the black bars/UI of YT
        src={`https://www.youtube.com/embed/${movieTrailer.key}?autoplay=1&mute=0&controls=0&loop=1&enablejsapi=1&playlist=${movieTrailer.key}`}
        title="Trailer"
        allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  );
};

export default VideoBackground;