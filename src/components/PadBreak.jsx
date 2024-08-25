import PropTypes from "prop-types";
import { PiArrowFatDownFill } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";

export const PadBreak = ({ title, counter, handleClickBreak, disabled }) => {
  return (
    <div className="flex flex-col gap-2 mb-4 text-center text-2xl">
      <div>
        <h3 id="break-label">{title}</h3>
      </div>
      <div className="flex justify-center gap-4">
        <button
          id="break-increment"
          onClick={handleClickBreak}
          disabled={disabled}
        >
          <PiArrowFatUpFill />
        </button>
        <h3 id="break-length">{counter}</h3>
        <button
          id="break-decrement"
          onClick={handleClickBreak}
          disabled={disabled}
        >
          <PiArrowFatDownFill />
        </button>
      </div>
    </div>
  );
};

PadBreak.propTypes = {
  title: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  handleClickBreak: PropTypes.func,
  disabled: PropTypes.bool,
};
