import React from 'react';

import Book from './book';

const BookShelf = ({ shelf, books, onBookShelfChange }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book
              key={book.id}
              book={book}
              onBookShelfChange={onBookShelfChange}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
