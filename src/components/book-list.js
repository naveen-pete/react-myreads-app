import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import shelves from '../utils/shelves';
import * as BooksAPI from '../utils/BooksAPI';
import BookShelf from './book-shelf';

class BookList extends Component {
  constructor() {
    super();

    this.state = {
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
      .then(books => {
        const categorizedBooks = this.state.categorizedBooks;
        for (let key in categorizedBooks) {
          let category = categorizedBooks[key];
          category.books = books.filter(
            book => book.shelf === category.shelf.code
          );
        }
        this.setState({ categorizedBooks });
      })
      .catch(error =>
        console.log('ERROR: Unable to retrieve books from the server.', error)
      );
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(this.state.categorizedBooks).map(key => {
              let category = this.state.categorizedBooks[key];
              return (
                <BookShelf
                  key={category.shelf.code}
                  shelf={category.shelf}
                  books={category.books}
                  onBookShelfChange={() => this.getBooks()}
                />
              );
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList;
