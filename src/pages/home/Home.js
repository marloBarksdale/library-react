import React, { useState, useEffect } from 'react';
import BookList from '../../components/BookList';
import useFetch from '../../hooks/useFetch';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { onSnapshot, doc } from 'firebase/firestore';
const Home = () => {
  const [myCollection, setMyCollection] = useState([]);
  const { data } = useFetch('http://10.0.0.124:5002/books');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'books'), (snapshot) => {
      let results = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setMyCollection(results);
    });
  }, []);
  return <div>{myCollection && <BookList books={myCollection} />}</div>;
};

export default Home;
