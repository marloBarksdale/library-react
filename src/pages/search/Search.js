import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BookList from '../../components/BookList';
import useFetch from '../../hooks/useFetch';
import Book from '../book/Book';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q'));
  const [myData, setData] = useState([]);

  useEffect(() => {
    console.log(searchParams.get('q'));
    setSearch(searchParams.get('q'));
  }, [searchParams]);

  const { data } = useFetch(`http://10.0.0.124:5002/books?q=${search}`);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  return <div>{data && <BookList books={data} />}</div>;
};

export default Search;
