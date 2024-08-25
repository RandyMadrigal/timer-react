import PropTypes from "prop-types";
import { PiArrowFatDownFill } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";

export const PadSession = ({
  title,
  counter,
  handleClickSession,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-2 text-center text-2xl">
      <div>
        <h3 id="session-label">{title}</h3>
      </div>
      <div className="flex justify-center gap-4">
        <button
          id="session-increment"
          onClick={handleClickSession}
          disabled={disabled}
        >
          <PiArrowFatUpFill />
        </button>
        <h3 id="session-length">{counter}</h3>
        <button
          id="session-decrement"
          onClick={handleClickSession}
          disabled={disabled}
        >
          <PiArrowFatDownFill />
        </button>
      </div>
    </div>
  );
};

PadSession.propTypes = {
  title: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  handleClickSession: PropTypes.func,
  disabled: PropTypes.bool,
};
