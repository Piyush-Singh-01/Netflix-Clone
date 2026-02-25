import { FaPlay, FaPause } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";

function VideoTitle({ overview, title, isPlaying, setIsPlaying }) {
  return (
    <div className="space-y-3 max-w-[90vw] sm:max-w-md">
      {/* Responsive Title */}
      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg leading-tight">
        {title}
      </h1>

      {/* Responsive Overview */}
      <p className="text-xs sm:text-sm md:text-base text-gray-300 line-clamp-3">
        {overview}
      </p>

      {/* Responsive Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 bg-white text-black px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-200 transition"
        >
          {isPlaying ? (
            <>
              <FaPause /> Pause
            </>
          ) : (
            <>
              <FaPlay /> Play
            </>
          )}
        </button>

        <button className="flex items-center gap-2 bg-gray-700/70 px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-600 transition">
          <CiCircleInfo /> More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;
