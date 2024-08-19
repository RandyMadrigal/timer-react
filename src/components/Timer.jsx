import PropTypes from "prop-types";

export const Timer = ({ title, value }) => {
  return (
    <div className="border-4 rounded-3xl border-emerald-950 w-8/12 max-w-56 p-4 my-4 text-center">
      <h3 id="timer-label" className="text-2xl">
        {title}
      </h3>
      <h2 id="time-left" className="text-6xl mt-4">
        {value}:00
      </h2>
    </div>
  );
};

Timer.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
