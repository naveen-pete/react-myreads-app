import React from 'react';

import Book from './book';

// This component represents a book shelf. It displays book objects.
// It receives the following props from the parent component
// (a) shelf object (contains shelf code and title properties)
// (b) list of books belonging to the shelf
// (c) on book shelf change callback function
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
