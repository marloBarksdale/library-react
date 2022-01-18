import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import BookList from '../../components/BookList';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import { useCollection } from '../../hooks/useCollection';
import './Home.css';
const Home = () => {
  const [myCollection, setMyCollection] = useState([]);
  const { user } = useAuth();
  // const { data } = useFetch('http://10.0.0.124:5002/books');
  const { documents } = useCollection(
    'books',
    ['uid', '==', user.uid],
    ['createdAt', 'desc'],
  );

  return <div>{documents && <BookList books={documents} />}</div>;
};

export default Home;
