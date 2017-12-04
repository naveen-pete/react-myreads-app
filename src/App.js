import React from 'react';
import { Route } from 'react-router-dom';

// import * as BooksAPI from './BooksAPI';
import './App.css';

import BookList from './components/book-list';
import SearchBooks from './components/search-books';

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookList} />
        <Route path="/search" component={SearchBooks} />
      </div>
    );
  }
}

export default BooksApp;
