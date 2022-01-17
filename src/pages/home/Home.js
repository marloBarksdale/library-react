import React, { useState, useEffect } from 'react';
import BookList from '../../components/BookList';
import useFetch from '../../hooks/useFetch';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { onSnapshot, doc, query } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import './Home.css';
const Home = () => {
  const [myCollection, setMyCollection] = useState([]);
  const { user } = useAuth();
  // const { data } = useFetch('http://10.0.0.124:5002/books');
  console.log(user.uid);
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'books'), where('uid', '==', user.uid)),

      (snapshot) => {
        let results = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        setMyCollection(results);
      },
    );

    return () => unsub();
  }, []);

  return <div>{myCollection && <BookList books={myCollection} />}</div>;
};

export default Home;
