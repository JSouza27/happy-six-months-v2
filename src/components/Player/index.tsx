import { addMilliseconds, format, startOfDay } from 'date-fns';
import {
  PiRewindFill,
  PiFastForwardFill,
  PiPlayFill,
  PiPauseFill
} from 'react-icons/pi';
import Loading from '../Loading';

type PlayerType = {
  player: any;
  trackName: string;
  duration: number;
  currentTime: number;
  isPaused: boolean;
  isLoading: boolean;
  handleSeekToPosiotion: (positionMs: number) => Promise<void>;
  handleNextTrack: () => Promise<void>;
  handlePrevTrack: () => Promise<void>;
};
export default function Player({
  player,
  trackName,
  duration,
  currentTime,
  isPaused,
  isLoading,
  handleSeekToPosiotion,
  handleNextTrack,
  handlePrevTrack
}: PlayerType) {
  const iconProps = {
    size: 24,
    color: '#343752',
    stoker: 0
  };

  const customRangeIcon = `
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-webkit-slider-thumb]:border-0
    [&::-webkit-slider-thumb]:w-6
    [&::-webkit-slider-thumb]:h-6
    [&::-webkit-slider-thumb]:-mt-2
    [&::-webkit-slider-thumb]:bg-slider-thumb
    [&::-webkit-slider-thumb]:bg-no-repeat
    [&::-webkit-slider-thumb]:transition-all
    [&::-webkit-slider-thumb]:duration-150
    [&::-webkit-slider-thumb]:ease-in-out
    [&::-webkit-slider-thumb]:z-10

    [&::-webkit-slider-runnable-track]:w-full
    [&::-webkit-slider-runnable-track]:h-0.5
    [&::-webkit-slider-runnable-track]:bg-gray-200
    [&::-webkit-slider-runnable-track]:z-0
  `;

  const formatDuration = (ms: number) => {
    const date = addMilliseconds(startOfDay(new Date()), ms);
    return format(date, 'mm:ss');
  };

  const handlePlay = () => {
    player?.togglePlay();
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    handleSeekToPosiotion(newTime);
  };

  return (
    <section className="w-full flex flex-col md:col-span-4 items-center justify-center border border-[rgba(255,255,255,0.175)] backdrop-blur bg-[rgba(255,255,255,0.35)] p-4 rounded-lg shadow-md z-20 h-36 max-w-xs md:mb-16">
      {!isLoading ? (
        <>
          <div className="w-72">
            <span className="text-[#343752]">{trackName}</span>
            <input
              className={`appearance-none bg-gray-200 h-0.5 range-sm w-full ${customRangeIcon}`}
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              step={1}
              onChange={handleSeek}
            />
            <div className="flex justify-between text-xs text-[#343752] w-full">
              <span>{formatDuration(currentTime)}</span>
              <span>{formatDuration(duration)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={handlePrevTrack}>
              <PiRewindFill color={iconProps.color} size={iconProps.size} />
            </button>
            <button onClick={handlePlay}>
              {isPaused ? (
                <PiPlayFill color={iconProps.color} size={iconProps.size} />
              ) : (
                <PiPauseFill color={iconProps.color} size={iconProps.size} />
              )}
            </button>
            <button type="button" onClick={handleNextTrack}>
              <PiFastForwardFill
                color={iconProps.color}
                size={iconProps.size}
              />
            </button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}
