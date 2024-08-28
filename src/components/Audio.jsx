import { forwardRef } from "react";

export const Audio = forwardRef((props, ref) => {
  return (
    <audio
      id="beep"
      ref={ref}
      src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
    ></audio>
  );
});
