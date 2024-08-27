import { useState } from "react";

export const SecondsHook = (value) => {
  const [seconds, setSeconds] = useState(value);

  const secondDecrease = () => setSeconds((prev) => prev - 1);
  const reset = () => setSeconds(59);
  const secondInit = () => setSeconds(0);


  return { seconds, secondDecrease, reset, secondInit };
};
