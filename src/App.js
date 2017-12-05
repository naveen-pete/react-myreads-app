import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import * as BooksAPI from './utils/BooksAPI';
import BookList from './components/book-list';
import SearchBooks from './components/search-books';

// Root component for the app
class BooksApp extends React.Component {
  constructor() {
    super();

    this.state = {
      // array to hold all the books
      allBooks: []
    };
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
        this.setState({ allBooks });
      })
      .catch(error =>
        console.log('ERROR: Unable to retrieve books from the server.', error)
      );
  }

  // Whenever user changes the shelf, update the book and get the updated
  // book list
  updateBookShelf(book, newShelf) {
    BooksAPI.update(book, newShelf)
      .then(data => {
        console.log(
          `SUCCESS: Bookshelf successfully updated! (Title: ${
            book.title
          }, New Shelf: ${newShelf})`
        );

        this.getBooks();
      })
      .catch(error =>
        console.log(
          `ERROR: Unable to update shelf '${newShelf}' for the book '${
            book.title
          }'.`,
          error
        )
      );
  }

  render() {
    const { allBooks } = this.state;

    return (
      <div className="app">
        {/* 
          The array containing all books from component's state is 
          passed to BookList component 
        */}
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              allBooks={allBooks}
              onBookShelfChange={(book, newShelf) =>
                this.updateBookShelf(book, newShelf)
              }
            />
          )}
        />

        {/* 
          The array containing all books from component's state is 
          passed to SearchBooks component 
        */}
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              allBooks={allBooks}
              onBookShelfChange={(book, newShelf) =>
                this.updateBookShelf(book, newShelf)
              }
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
