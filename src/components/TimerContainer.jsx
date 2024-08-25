import { Header } from "./Header";
import { Timer } from "./Timer";
import { Play } from "./Play";
import { Pause } from "./Pause";
import { Reset } from "./Reset";
import { useEffect, useState } from "react";
import { PadBreak } from "./PadBreak";
import { PadSession } from "./PadSession";
/*hooks*/
import { MinutesHook } from "../hooks/session/MinutesHook";
import { SecondsHook } from "../hooks/session/SecondsHook";
import { PlayHook } from "../hooks/PlayHook";
import { ResetHook } from "../hooks/ResetHook";
import { MinutesBreakHook } from "../hooks/break/MinutesBreakHook";
import { SecondsBreakHook } from "../hooks/break/SecondsBreakHook";

export const TimerContainer = () => {
  const { isPlay, playing } = PlayHook(false);
  const { isReset, restart } = ResetHook(false);
  const [disabled, setDisabled] = useState(false);

  //#region Session
  const [sessionLength, setSessionLength] = useState(25);
  const { minutes, minuteDecrease, update } = MinutesHook(sessionLength);
  const { seconds, secondDecrease, reset, secondInit } = SecondsHook(0);
  ////#endregion

  //#region
  const [breakLength, setBreakLength] = useState(5);
  const [isBreak, setIsBreak] = useState(false);
  const { minutesBreak, minuteDecreaseBreak, updateBreak } =
    MinutesBreakHook(breakLength);
  const { secondsBreak, secondDecreaseBreak, resetBreak, secondInitBreak } =
    SecondsBreakHook(0);

  ////#endregion

  //TODO refactor...
  const handleReset = (e) => {
    const btnId = e.currentTarget.id;

    if (btnId === "reset") {
      restart(true);
      setDisabled(false);
      setIsBreak(false);
    }
  };
  //TODO refactor...
  const handlePlay = (e) => {
    const btnId = e.currentTarget.id;
    restart(false);

    if (btnId === "start_stop") {
      if (isPlay) {
        playing(false);
        setDisabled(false);
      } else {
        playing(true);
        setDisabled(true);
      }
    }
  };
  //TODO refactor...
  const handlePause = (e) => {
    const btnId = e.currentTarget.id;
    restart(false);

    if (btnId === "pause") {
      playing(false);
      setDisabled(false);
    }
  };
  //TODO refactor...
  const handleClickSession = (e) => {
    const btnId = e.currentTarget.id;
    restart(false);

    if (btnId === "session-increment") {
      sessionLength < 60 && setSessionLength(sessionLength + 1);
      update(sessionLength + 1);
    }
    if (btnId === "session-decrement") {
      if (sessionLength > 1) {
        setSessionLength(sessionLength - 1);
        update(sessionLength - 1);
      }
    }
  };
  //TODO refactor...
  const handleClickBreak = (e) => {
    const btnId = e.currentTarget.id;
    restart(false);

    if (btnId === "break-decrement") {
      if (breakLength > 1) {
        setBreakLength(breakLength - 1);
        updateBreak(breakLength - 1);
      }
    }

    if (btnId === "break-increment") {
      breakLength < 60 && setBreakLength(breakLength + 1);
      updateBreak(breakLength + 1);
    }
  };

  //TODO refactor...

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
      setIsBreak(true);
    }

    if (isReset) {
      playing(false);
      setBreakLength(5);
      setSessionLength(25);
      update(25);
      updateBreak(5);
      secondInit(0);
      secondInitBreak(0);
    }

    if (isPlay) {
      if (seconds < 0 && isBreak === false) {
        reset(59);
        minuteDecrease();
      }

      if (isBreak) {
        if (secondsBreak < 0) {
          resetBreak(59);
          minuteDecreaseBreak();
        }

        if (minutesBreak <= 0 && secondsBreak <= 0) {
          setIsBreak(false);
          update(sessionLength - 1);
        }
      }

      const myInterval = setInterval(() => {
        console.log(minutes + ":" + seconds);
        isBreak ? secondDecreaseBreak() : secondDecrease();
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    }
  }, [
    seconds,
    isPlay,
    minuteDecrease,
    reset,
    secondDecrease,
    isReset,
    playing,
    update,
    sessionLength,
    secondInit,
    minutes,
    setIsBreak,
    isBreak,
    updateBreak,
    breakLength,
    secondInitBreak,
    minuteDecreaseBreak,
    resetBreak,
    minutesBreak,
    secondsBreak,
    secondDecreaseBreak,
  ]);

  return (
    //TODO responsive
    <div className="flex flex-col justify-center items-center w-9/12 text-center ">
      <Header />
      <div className="flex flex-col md:flex-row md:gap-20">
        <PadBreak
          title="Break Length"
          counter={breakLength}
          handleClickBreak={handleClickBreak}
          disabled={disabled}
        />
        <PadSession
          title="Session Length"
          counter={sessionLength}
          handleClickSession={handleClickSession}
          disabled={disabled}
        />
      </div>
      <Timer
        title={isBreak ? "Break" : "Session"}
        minutes={isBreak ? minutesBreak : minutes}
        seconds={isBreak ? secondsBreak : seconds}
      />
      <div className="flex flex-row gap-3 my-5 text-2xl">
        <Pause handlePause={handlePause} />
        <Play handlePlay={handlePlay} />
        <Reset handleReset={handleReset} />
      </div>
    </div>
  );
};
