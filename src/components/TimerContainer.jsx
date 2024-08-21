import { Header } from "./Header";
import { Timer } from "./Timer";
import { Play } from "./Play";
import { Pause } from "./Pause";
import { Reset } from "./Reset";
import { useEffect, useState } from "react";
import { PadBreak } from "./PadBreak";
import { PadSession } from "./PadSession";
import { MinutesHook } from "../hooks/MinutesHook";
import { SecondsHook } from "../hooks/SecondsHook";
import { PlayHook } from "../hooks/PlayHook";

export const TimerContainer = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(5);
  const { minutes, minutesDecrement, update } = MinutesHook(sessionLength);
  const { seconds, secondsDecrement, reset } = SecondsHook(0);
  const { isPlay, playing } = PlayHook();

  const handlePlay = (e) => {
    const btnId = e.currentTarget.id;

    if (btnId === "start_stop") {
      console.log(btnId);
      playing();
    }
  };

  const handleClickSession = (e) => {
    const btnId = e.currentTarget.id;

    if (btnId === "session-increment") {
      sessionLength < 60 && setSessionLength(sessionLength + 1);
    }
    if (btnId === "session-decrement") {
      sessionLength > 1 && setSessionLength(sessionLength - 1);
    }
  };

  const handleClickBreak = (e) => {
    const btnId = e.currentTarget.id;

    if (btnId === "break-decrement") {
      breakLength > 1 && setBreakLength(breakLength - 1);
    }

    if (btnId === "break-increment") {
      breakLength < 60 && setBreakLength(breakLength + 1);
    }
  };

  useEffect(() => {
    let count = sessionLength;
    update(count);

    if (isPlay) {
      if (seconds < 0) {
        minutesDecrement();
        reset();
      }

      const myInterval = setInterval(() => {
        secondsDecrement();
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    }
  }, [seconds, isPlay, minutesDecrement, reset, secondsDecrement]);

  return (
    //TODO responsive
    <div className="flex flex-col justify-center items-center w-9/12 text-center ">
      <Header />
      <div className="flex flex-col md:flex-row md:gap-20">
        <PadBreak
          title="Break Length"
          counter={breakLength}
          handleClickBreak={handleClickBreak}
        />
        <PadSession
          title="Session Length"
          counter={sessionLength}
          handleClickSession={handleClickSession}
        />
      </div>
      <Timer title="Session" minutes={minutes} seconds={seconds} />
      <div className="flex flex-row gap-3 my-5 text-2xl">
        <Pause />
        <Play handlePlay={handlePlay} />
        <Reset />
      </div>
    </div>
  );
};
