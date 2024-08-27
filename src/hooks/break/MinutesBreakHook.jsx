import { useState } from "react";

export const MinutesBreakHook = (sessionLength) => {
  const [minutesBreak, setMinutes] = useState(sessionLength);

  const minuteDecreaseBreak = () => setMinutes((prev) => prev - 1);
  const updateBreak = (value) => setMinutes(value);

  return { minutesBreak, minuteDecreaseBreak, updateBreak };
};
