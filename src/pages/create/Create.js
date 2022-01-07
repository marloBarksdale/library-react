import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const Create = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [pages, setPages] = useState('');
  const [year, setYear] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const navigate = useNavigate();

  const { data, postData } = useFetch('http://10.0.0.124:5002/books', 'POST');

  const handleAdd = (e) => {
    e.preventDefault();
    if (authors.includes(newAuthor.trim()) || newAuthor.trim().length === 0) {
      return;
    }

    setAuthors((prevAuthors) => {
      return [...prevAuthors, newAuthor.trim()];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newBook = { title, authors, pages, year };

    await addDoc(collection(db, 'books'), newBook);

    postData(newBook);
  };

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data]);

  return (
    <div className='create'>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type='text'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>{' '}
        <label>
          Authors
          <input
            type='text'
            value={newAuthor}
            onChange={(e) => {
              setNewAuthor(e.target.value);
            }}
          />
        </label>{' '}
        <button
          onClick={(e) => {
            handleAdd(e);
          }}
        >
          Add Author
        </button>
        <label>
          Year Published
          <input
            type='text'
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
        </label>{' '}
        <label>
          Pages
          <input
            type='text'
            value={pages}
            onChange={(e) => {
              setPages(e.target.value);
            }}
          />
        </label>
        <button type='submit'>Add Book</button>
      </form>
    </div>
  );
};

export default Create;
