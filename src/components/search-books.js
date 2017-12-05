import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import * as BookAPI from '../utils/BooksAPI';
import Book from './book';

// This component allows the user to search for the books.
// It receives the following props from the parent component
// (a) array of all books for the user
// (b) on book shelf change callback function
class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.state = { searchResult: [] };

    this.searchBooks = this.searchBooks.bind(this);

    // using lodash.debounce() method to reduce the number of requests
    // to the server
    this.debouncedSearchBooks = _.debounce(this.searchBooks, 400);
  }

  searchBooks(query) {
    // do not make a server call if the user query text is empty
    query = query.trim();
    if (query.length <= 0) return;

    console.log(`Book search initiated. (Search term: ${query})`);

    BookAPI.search(query)
      .then(searchResult => {
        console.log('SUCCESS: Book search successfully completed!');

        if (searchResult && searchResult.length > 0) {
          console.log(`  Books found. (Count: ${searchResult.length})`);
          this.setState({ searchResult });
        } else {
          console.log(`  No books matching the search term - '${query}')`);
          this.setState({ searchResult: [] });
        }
      })
      .catch(error => {
        console.log(
          `ERROR: Failed to search books for search term '${query}'.`,
          error
        );
      });
  }

  // check if the search result book is already available
  // in one of the user's shelves. If so, merge the corresponding
  // shelf field so that it gets selected by default in the drop down
  // list of shelves for the book
  findBookAndMergeShelf(allBooks, searchBook) {
    const propShelf = 'shelf';
    const userBook = allBooks.find(book => book.id === searchBook.id);
    searchBook[propShelf] = userBook ? userBook[propShelf] : 'none';
  }

  render() {
    const { allBooks, onBookShelfChange } = this.props;

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
            {this.state.searchResult.map(book => {
              this.findBookAndMergeShelf(allBooks, book);
              return (
                <Book
                  key={book.id}
                  book={book}
                  onBookShelfChange={onBookShelfChange}
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
