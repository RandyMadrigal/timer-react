import PropTypes from "prop-types";
import { FaPause } from "react-icons/fa";

export const Pause = ({handlePause}) => {
  return (
    <>
      <button onClick={handlePause} id="pause">
        <FaPause />
      </button>
    </>
  );
};

Pause.propTypes = {
  handlePause: PropTypes.func.isRequired,
};

