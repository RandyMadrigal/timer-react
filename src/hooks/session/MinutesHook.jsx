import { useState } from "react";

export const MinutesHook = (sessionLength) => {
  const [minutes, setMinutes] = useState(sessionLength);

  const minuteDecrease = () => setMinutes((prev) => prev - 1);
  const update=(value)=> setMinutes(value)

  return { minutes, minuteDecrease,update };
};
