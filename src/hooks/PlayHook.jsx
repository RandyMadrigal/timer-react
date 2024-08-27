import { useState } from "react";

export const PlayHook = (value) => {
  const [isPlay, setIsPlay] = useState(value);

  const playing = (value) => setIsPlay(value);

  return { isPlay, playing };
};
