import React, { useState, useEffect } from 'react';
import BookList from '../../components/BookList';
import useFetch from '../../hooks/useFetch';

const Home = () => {
  const { data } = useFetch('http://10.0.0.124:5002/books');

  return <div>{data && <BookList books={data} />}</div>;
};

export default Home;
