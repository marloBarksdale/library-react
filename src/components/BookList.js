import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase/config';
import * as FaIcons from 'react-icons/fa';
import './BookList.css';
import { useTheme } from '../hooks/useTheme';
const BookList = ({ books }) => {
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const { mode } = useTheme();

  // const { data, deleteData } = useFetch(
  //   'http://10.0.0.124:5002/books',
  //   'DELETE',
  // );

  useEffect(() => {
    if (id) {
      // deleteData(id);
      deleteDoc(doc(db, 'books', id));
    }
  }, [id]);

  // useEffect(() => {
  //   if (data) {
  //     navigate(0);
  //   }
  // }, [data]);

  return (
    <div className='book-list'>
      {books &&
        books.map((book, index) => (
          <div key={index} className={`card ${mode}`}>
            <span
              className='delete'
              onClick={() => {
                setId(book.id);
              }}
            >
              <FaIcons.FaTrash />
            </span>
            <h3>{book.title}</h3>

            <p>{book.year}</p>
            <div>{book.authors.join(', ')}</div>
            <div>{book.pages} pages</div>
            <Link to={`books/${book.id}`}>More</Link>
          </div>
        ))}
    </div>
  );
};

export default BookList;
