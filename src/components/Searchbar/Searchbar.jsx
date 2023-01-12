import { Component } from "react";
import PropTypes from "prop-types";
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  
  state = {
    inputedQuery: '',
  };

  handleInputChange = event => {
    const { value } = event.currentTarget;
    this.setState({ inputedQuery: value, });
  };

   handleFormSubmit = event => {
     event.preventDefault();
     this.props.onSubmit(this.state.inputedQuery);
     this.setState({ inputedQuery: '' });         
  };

  render() {
    return (
      <header>
        <form className={css.searchForm} onSubmit={this.handleFormSubmit}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputedQuery}
            onChange={this.handleInputChange}
          />
          <button className={css.submitBtn} type="submit">Search</button>
        </form>
      </header>
    ); 
  };
};
