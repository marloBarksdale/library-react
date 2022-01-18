import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { useEffect, useReducer, useState } from 'react';
import { db } from '../firebase/config';

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'ADDED':
      return {
        document: action.payload,
        pending: false,
        error: false,
        success: true,
      };
    case 'DELETED':
      return { document: null, pending: false, error: false, success: true };
    case 'PENDING':
      return { document: null, pending: true, success: false, error: null };
    case 'ERROR':
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
export const useFireStore = (_collection) => {
  const [canceled, setCanceled] = useState(false);
  const [state, dispatch] = useReducer(firestoreReducer, {
    document: null,
    pending: false,
    error: false,
    success: false,
  });

  const checkCanceled = (action) => {
    if (!canceled) {
      dispatch(action);
    }
  };
  const ref = collection(db, _collection);
  const addDocument = async (doc) => {
    checkCanceled({ type: 'PENDING', payload: true });

    try {
      const createdAt = Timestamp.fromDate(new Date());
      let addedDoc = await addDoc(ref, { ...doc, createdAt });

      checkCanceled({ type: 'ADDED', payload: addedDoc });
    } catch (error) {
      checkCanceled({ type: 'ERROR', payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    checkCanceled({ type: 'PENDING' });

    try {
      await deleteDoc(doc(ref, id));
      checkCanceled({ type: 'DELETED' });
    } catch (err) {
      checkCanceled({ type: 'ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    return () => setCanceled(true);
  }, []);
  return { addDocument, ...state, deleteDocument };
};
