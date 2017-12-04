import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import * as BookAPI from '../utils/BooksAPI';
import Book from './book';

class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.state = { searchResult: [] };

    this.searchBooks = this.searchBooks.bind(this);
    this.debouncedSearchBooks = _.debounce(this.searchBooks, 400);
  }

  searchBooks(query) {
    query = query.trim();
    if (query.length <= 0) return;

    console.log(`Book search initiated. (Search term: ${query})`);
    BookAPI.search(query)
      .then(searchResult => {
        console.log('SUCCESS: Book search successfully completed!');
        if (searchResult && searchResult.length > 0) {
          this.setState({ searchResult });
          console.log(`  Books found. (Count: ${searchResult.length})`);
        } else {
          this.setState({ searchResult: [] });
          console.log(`  No books matching the search term - '${query}')`);
        }
      })
      .catch(error => {
        console.log(
          `ERROR: Failed to search books for search term '${query}'.`,
          error
        );
      });
  }

  render() {
    const { allBooks } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.debouncedSearchBooks(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult &&
              this.state.searchResult.map(book => {
                let b = allBooks.find(bk => bk.id === book.id);
                book['shelf'] = b ? b.shelf : 'none';
                return (
                  <Book
                    key={book.id}
                    book={book}
                    onBookShelfChange={this.props.onBookShelfChange}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
