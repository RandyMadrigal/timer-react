import { Header } from "./Header";
import { Timer } from "./Timer";
import { Play } from "./Play";
import { Pause } from "./Pause";
import { Reset } from "./Reset";
import { useEffect, useState } from "react";
import { PadBreak } from "./PadBreak";
import { PadSession } from "./PadSession";

export const TimerContainer = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  useEffect(() => {}, []);

  const handleClickUp = (e) => {
    const btnId = e.currentTarget.id;

    btnId === "break-increment"
      ? setBreakLength(breakLength + 1)
      : setSessionLength(sessionLength + 1);
  };

  const handleClickDown = (e) => {
    const btnId = e.currentTarget.id;

    switch (btnId) {
      case "break-decrement":
        breakLength > 1 && setBreakLength(breakLength - 1);
        break;
      case "session-decrement":
        sessionLength > 1 && setSessionLength(sessionLength - 1);
        break;
      default:
        break;
    }
  };

  return (
    //TODO responsive
    <div className="flex flex-col justify-center items-center w-9/12 text-center ">
      <Header />
      <div className="flex flex-col md:flex-row md:gap-20">
        <PadBreak
          title="Break Length"
          counter={breakLength}
          handleClickUp={handleClickUp}
          handleClickDown={handleClickDown}
        />
        <PadSession
          title="Session Length"
          counter={sessionLength}
          handleClickUp={handleClickUp}
          handleClickDown={handleClickDown}
        />
      </div>
      <Timer title="Session" value={sessionLength} />
      <div className="flex flex-row gap-3 my-5 text-2xl">
        <Pause />
        <Play />
        <Reset />
      </div>
    </div>
  );
};
