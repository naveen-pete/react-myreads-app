import React from 'react';

import shelves from '../utils/shelves';

const BookShelfChanger = ({ currentBookShelf, onBookShelfChange }) => {
  return (
    <div className="book-shelf-changer">
      <select
        defaultValue={currentBookShelf}
        onChange={e => onBookShelfChange(e.target.value)}
      >
        <option value="none" disabled>
          Move to...
        </option>
        {shelves.map(shelf => (
          <option key={shelf.code} value={shelf.code}>
            {shelf.title}
          </option>
        ))}
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
