import PropTypes from "prop-types";
import { FaPlay } from "react-icons/fa";

export const Play = ({ handlePlay }) => {
  return (
    <>
      <button onClick={handlePlay} id="start_stop">
        <FaPlay />
      </button>
    </>
  );
};

Play.propTypes = {
  handlePlay: PropTypes.func.isRequired,
};
