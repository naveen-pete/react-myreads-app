// Reusable array of shelves. It is used to:
// (a) categorize books in <BooksApp /> component
// (b) generate drop down list options witin <BookShelfChanger /> component
const shelves = [
  { code: 'currentlyReading', title: 'Currently Reading' },
  { code: 'wantToRead', title: 'Want to Read' },
  { code: 'read', title: 'Read' }
];

export default shelves;
