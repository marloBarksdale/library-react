import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Book = () => {
  const { id } = useParams();
  const { data: book } = useFetch(`http://10.0.0.124:5002/books/${id}`);

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
