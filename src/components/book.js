import React, { Component } from 'react';
import BookShelfChanger from './book-shelf-changer';

import * as BooksAPI from '../utils/BooksAPI';

class Book extends Component {
  updateShelf(newShelf) {
    const { book } = this.props;
    BooksAPI.update(book, newShelf)
      .then(data => {
        this.props.onBookShelfChange();
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
    const { book } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 192,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
              }}
            />
            <BookShelfChanger
              currentBookShelf={book.shelf}
              onBookShelfChange={newShelf => this.updateShelf(newShelf)}
            />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors.join()}</div>
        </div>
      </li>
    );
  }
}

export default Book;
