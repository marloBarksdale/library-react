import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { db } from '../../firebase/config';

const Book = () => {
  const { id } = useParams();
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
        <div className='card book'>
          <h1>{book.title}</h1>
          <p>{book.authors.join(', ')}</p>
        </div>
      )}
    </>
  );
};

export default Book;
