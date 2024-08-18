import PropTypes from "prop-types";

export const Timer = ({ title }) => {
  return (
    <div className="border-4 rounded-3xl border-emerald-950 w-2/12 p-6 text-center ">
      <h3 className="text-2xl">{title}</h3>
      <h2 className="text-6xl mt-4">25:00</h2>
    </div>
  );
};

Timer.propTypes = {
  title: PropTypes.string.isRequired,
};
