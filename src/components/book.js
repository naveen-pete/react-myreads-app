import React from 'react';
import BookShelfChanger from './book-shelf-changer';

// This component represents a book. It displays book information.
// It receives the following props from the parent component
// (a) book object
// (b) on book shelf change callback function
const Book = ({ book, onBookShelfChange }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url("${
                book.imageLinks ? book.imageLinks.thumbnail : ''
              }")`
            }}
          />
          <BookShelfChanger
            currentBookShelf={book.shelf}
            onBookShelfChange={newShelf => onBookShelfChange(book, newShelf)}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join() : ''}
        </div>
      </div>
    </li>
  );
};

export default Book;
