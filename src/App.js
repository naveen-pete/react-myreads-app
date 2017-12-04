import React from 'react';
import { Route } from 'react-router-dom';

// import * as BooksAPI from './BooksAPI';
import './App.css';

import shelves from './utils/shelves';
import * as BooksAPI from './utils/BooksAPI';
import BookList from './components/book-list';
import SearchBooks from './components/search-books';

class BooksApp extends React.Component {
  state = {};

  constructor() {
    super();

    this.state = {
      allBooks: [],
      categorizedBooks: this.initCategorizedBooks()
    };
  }

  initCategorizedBooks() {
    return shelves.reduce((prevObj, shelf) => {
      prevObj[shelf.code] = {
        shelf,
        books: []
      };
      return prevObj;
    }, {});
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll()
      .then(allBooks => {
        console.log('SUCCESS: Book list retrieved successfully!');

        const categorizedBooks = this.state.categorizedBooks;
        for (let key in categorizedBooks) {
          let category = categorizedBooks[key];
          category.books = allBooks.filter(
            book => book.shelf === category.shelf.code
          );
        }

        this.setState({ allBooks, categorizedBooks });
      })
      .catch(error =>
        console.log('ERROR: Unable to retrieve books from the server.', error)
      );
  }

  render() {
    const { categorizedBooks, allBooks } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              categorizedBooks={categorizedBooks}
              onBookShelfChange={() => this.getBooks()}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              allBooks={allBooks}
              onBookShelfChange={() => this.getBooks()}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
