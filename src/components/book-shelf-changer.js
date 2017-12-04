import React from 'react';

import shelves from '../utils/shelves';

// This component represents the menu that displays the list of shelves.
// This component is attached to <Book /> component.
// It receives the following props from the parent component
// (a) current shelf of the book. If the book does not belong to any shelf,
//     'None' is shown by default
// (b) on book shelf change callback function
const BookShelfChanger = ({ currentBookShelf, onBookShelfChange }) => {
  return (
    <div className="book-shelf-changer">
      <select
        defaultValue={currentBookShelf ? currentBookShelf : 'none'}
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
