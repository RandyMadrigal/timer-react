import { useState } from "react";

export const SecondsBreakHook = (value) => {
  const [secondsBreak, setSeconds] = useState(value);

  const secondDecreaseBreak = () => setSeconds((prev) => prev - 1);
  const resetBreak = () => setSeconds(59);
  const secondInitBreak = () => setSeconds(0);

  return { secondsBreak, secondDecreaseBreak, resetBreak, secondInitBreak };
};
