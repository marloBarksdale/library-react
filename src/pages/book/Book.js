import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://10.0.0.124:5002/books/${id}`);
      const data = await result.json();
      setBook(data);
      console.log(data);
    };
    fetchData();
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
