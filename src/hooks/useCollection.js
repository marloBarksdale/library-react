import {
  collection as col,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/config';

export const useCollection = (collection, q, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const _query = useRef(q).current;
  const order = useRef(_orderBy).current;

  useEffect(() => {
    let ref = col(db, collection);

    if (order) {
      ref = query(ref, where(..._query), orderBy(...order));
    } else if (_query) {
      ref = query(ref, where(..._query));
    }

    let unsub = onSnapshot(
      ref,
      (snapshot) => {
        const res = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setDocuments(res);
        setError(null);
      },
      (error) => {
        setError('Could not fetch');
      },
    );

    return () => unsub();
  }, [collection, order, _query]);

  return { documents, error };
};
