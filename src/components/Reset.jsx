import { FaRepeat } from "react-icons/fa6";
import PropTypes from "prop-types"

export const Reset = ({handleReset}) => {
  return (

    <button onClick={handleReset} id="reset">
      <FaRepeat />
    </button>
  );
};


Reset.propTypes ={
  handleReset:  PropTypes.func.isRequired,
}