import { useState } from "react";
import PropTypes from "prop-types";
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [inputedQuery, setInputedQuery] = useState('');
 
  const handleInputChange = event => {
    const { value } = event.currentTarget;
    setInputedQuery(value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    onSubmit(inputedQuery);
    setInputedQuery('');
  };

  return (
    <header>
      <form className={css.searchForm} onSubmit={handleFormSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputedQuery}
          onChange={handleInputChange}
        />
        <button className={css.submitBtn} type="submit">Search</button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
