import { useRef } from "react";

export const AudioHook = () => {
  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return { audioRef, playAudio, pauseAudio };
};
