import React from 'react';
import './BookList.css';
import { useNavigate, Link } from 'react-router-dom';

const BookList = ({ books }) => {
  const navigate = useNavigate();
  const handleDelete = (id) => {
    const deleteData = async () => {
      const respone = await fetch(`http://10.0.0.124:5002/books/${id}`, {
        method: 'DELETE',
      });

      return await respone.json();
    };

    deleteData().then((data) => console.log(data));
  };
  return (
    <div className='book-list'>
      {books &&
        books.map((book, index) => (
          <div key={index} className='card book'>
            <h2>{book.title}</h2>
            <p>{book.year}</p>
            <p>{book.authors.join(', ')}</p>
            <p>{book.pages} pages</p>
            <button
              onClick={() => {
                handleDelete(book.id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                navigate(`books/${book.id}`);
              }}
            >
              More
            </button>
          </div>
        ))}
    </div>
  );
};

export default BookList;
