import React, { useState, useEffect } from 'react';
import BookList from '../../components/BookList';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await fetch(' http://10.0.0.124:5002/books');
      const books = await result.json();
      setBooks(books);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <BookList books={books} />
    </div>
  );
};

export default Home;
