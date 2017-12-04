import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import * as BooksAPI from './utils/BooksAPI';
import shelves from './utils/shelves';
import BookList from './components/book-list';
import SearchBooks from './components/search-books';

// Root component for the app
class BooksApp extends React.Component {
  constructor() {
    super();

    this.state = {
      // array to hold all the books
      allBooks: [],
      // object to hold segregated books per shelf
      categorizedBooks: this.initCategorizedBooks()
    };
  }

  // This method is used to initialise 'categorizedBooks' object
  // within component's state.
  initCategorizedBooks() {
    return shelves.reduce((prevObj, shelf) => {
      prevObj[shelf.code] = {
        shelf,
        books: []
      };
      return prevObj;
    }, {});
  }

  // Retrieves the list of books when the app starts
  componentDidMount() {
    this.getBooks();
  }

  // Retrieves the list of books when the app starts. It is also
  // called whenever the user changes the shelf for a book
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
        {/* 
          Categorized books object from state is passed to 
          BookList component 
        */}
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

        {/* 
          The array containing all books is passed to 
          SearchBooks component 
        */}
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
