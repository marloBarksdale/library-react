import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { useTheme } from '../../hooks/useTheme';
import './Book.css';
const Book = () => {
  const { id } = useParams();
  const { mode } = useTheme();
  // const { data: book } = useFetch(`http://10.0.0.124:5002/books/${id}`);
  const [book, setBook] = useState(null);
  useEffect(() => {
    let getData = async () => {
      await getDoc(doc(db, 'books', id)).then((data) => {
        console.log(data.data());
        setBook(data.data());
      });
    };

    if (id) {
      getData();
    }
  }, [id]);

  return (
    <>
      {book && (
        <div className={`book ${mode}`}>
          <h2 className='page-title'>{book.title}</h2>
          <ul>
            {book.authors.map((author) => (
              <li key={author}>{author}</li>
            ))}
          </ul>
          <p className='method'>{book.pages}</p>
        </div>
      )}
    </>
  );
};

export default Book;
