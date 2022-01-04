import React, { useEffect, useState } from 'react';
import './BookList.css';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const BookList = ({ books }) => {
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  const { data, deleteData } = useFetch(
    'http://10.0.0.124:5002/books',
    'DELETE',
  );

  useEffect(() => {
    if (id) {
      deleteData(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      navigate(0);
    }
  }, [data]);

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
                setId(book.id);
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
