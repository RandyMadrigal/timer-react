import PropTypes from "prop-types";

export const Timer = ({ title, minutes, seconds }) => {
  return (
    <div className="border-4 rounded-3xl border-emerald-950 w-8/12 max-w-56 p-4 my-4 text-center">
      <h3 id="timer-label" className="text-2xl">
        {title}
      </h3>
      <h2 id="time-left" className="text-6xl mt-4">
        {minutes}:{seconds}
      </h2>
    </div>
  );
};

Timer.propTypes = {
  title: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
};
