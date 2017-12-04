import React from 'react';
import { Link } from 'react-router-dom';

import BookShelf from './book-shelf';

const BookList = props => {
  const shelves = [
    { title: 'Currently Reading', books: [] },
    { title: 'Want to Read', books: [] },
    { title: 'Read', books: [] }
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf, index) => (
            <BookShelf key={index} title={shelf.title} books={shelf.books} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BookList;
