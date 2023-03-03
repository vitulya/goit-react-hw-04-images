import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.props.onSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}></span>
          </button>

          <input
            onInput={this.props.handleChangeValue}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
