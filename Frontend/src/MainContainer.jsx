
import { useState } from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

function MainContainer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const playTrailer = useSelector((store) => store.movie.playTrailer);

  if (!playTrailer) return null;
  const { overview, id, title } = playTrailer;

  return (
    <div className="relative w-full bg-black lg:px-2 mt-[-15px]">
        <VideoBackground  movieId={id} isPlaying={isPlaying} />
      <div className="absolute top-[30%] md:top-[35%] left-4 md:left-16">
        <VideoTitle 
          title={title} 
          overview={overview} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
        />
      </div>
    </div>
  );
}

export default MainContainer