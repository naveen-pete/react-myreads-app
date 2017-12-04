import React from 'react';
import { Link } from 'react-router-dom';

import BookShelf from './book-shelf';

// This component shows the list of books for user in three shelves.
// It receives the following props from the parent component
// (a) categorized books object
// (b) on book shelf change callback function
const BookList = props => {
  const { categorizedBooks, onBookShelfChange } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(categorizedBooks).map(key => {
            let category = categorizedBooks[key];
            return (
              <BookShelf
                key={category.shelf.code}
                shelf={category.shelf}
                books={category.books}
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
