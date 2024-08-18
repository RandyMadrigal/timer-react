import PropTypes from "prop-types";
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";

export const Pad = ({ title, counter }) => {
  return (
    <div className="flex flex-col gap-3 my-6 text-center text-2xl">
      <div>
        <h3>{title}</h3>
      </div>
      <div className="flex justify-center gap-2">
        <button>
          <PiArrowFatUpFill />
        </button>
        <h3>{counter}</h3>
        <button>
          <PiArrowFatDownFill />
        </button>
      </div>
    </div>
  );
};

Pad.propTypes = {
  title: PropTypes.string.isRequired,
  counter: PropTypes.string.isRequired,
};
