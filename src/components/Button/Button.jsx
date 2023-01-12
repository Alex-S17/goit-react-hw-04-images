import PropTypes from "prop-types";
import css from "./Button.module.css";

export const Button = ({onButtonClick}) => {
  return (
    <button
      type="button"
      className={css.loadMore}
      onClick={onButtonClick}
    >
      Load More
    </button>
  )
}

Button.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};
