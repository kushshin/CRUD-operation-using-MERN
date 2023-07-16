import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    bookname: '',
    authorname: ''
  });
  const [editBookId, setEditBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:3001/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    console.log(e)
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    axios.post('http://localhost:3001/api/books', newBook)
      .then(response => {
        console.log(response.data);
        fetchBooks();
        setNewBook({ bookname: '', authorname: '' });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEditBook = (bookId) => {
    setEditBookId(bookId);
    const bookToEdit = books.find(book => book._id === bookId);
    setNewBook({ bookname: bookToEdit.bookname, authorname: bookToEdit.authorname });
  };

  const handleUpdateBook = () => {
    axios.patch(`http://localhost:3001/api/books/${editBookId}`, newBook)
      .then(response => {
        console.log(response.data);
        fetchBooks();
        setNewBook({ bookname: '', authorname: '' });
        setEditBookId(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteBook = (id) => {
    axios.delete(`http://localhost:3001/api/books/${id}`)
      .then(response => {
        console.log(response.data);
        fetchBooks();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>

      <h2>Add constructor and driver name</h2>
      <input
        type="text"
        name="bookname"
        placeholder="Contructor name"
        value={newBook.bookname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="authorname"
        placeholder="Driver name"
        value={newBook.authorname}
        onChange={handleInputChange}
      />
      <button onClick={handleAddBook}>Add constructor and driver name</button>

      <h1>constructor and driver names</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {editBookId === book._id ? (
              <div>
                <input
                  type="text"
                  name="bookname"
                  placeholder="bookname"
                  value={newBook.bookname}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="authorname"
                  placeholder="Authorname"
                  value={newBook.authorname}
                  onChange={handleInputChange}
                />
                <button onClick={handleUpdateBook}>Save</button>
              </div>
            ) : (
              <div>
                {book.bookname} by {book.authorname}
                <button onClick={() => handleEditBook(book._id)}>Edit</button>
                <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>

  );
}

export default App;
