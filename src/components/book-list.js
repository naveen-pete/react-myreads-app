import React from 'react';
import { Link } from 'react-router-dom';

import shelves from '../utils/shelves';
import BookShelf from './book-shelf';

// This component shows the list of books for user in three shelves.
// It receives the following props from the parent component
// (a) categorized books object
// (b) on book shelf change callback function
const BookList = ({ allBooks, onBookShelfChange }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(shelf => {
            let shelfBooks = allBooks.filter(book => book.shelf === shelf.code);
            return (
              <BookShelf
                key={shelf.code}
                shelf={shelf}
                books={shelfBooks}
                onBookShelfChange={onBookShelfChange}
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
};

export default BookList;
