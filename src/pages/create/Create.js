import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [pages, setPages] = useState('');
  const [year, setYear] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    if (authors.includes(newAuthor.trim()) || newAuthor.trim().length === 0) {
      return;
    }

    setAuthors((prevAuthors) => {
      return [...prevAuthors, newAuthor.trim()];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newBook = { title, authors, pages, year };

    const postData = async (data = {}) => {
      const response = await fetch('http://10.0.0.124:5002/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      return response.json();
    };

    postData(newBook).then(() => navigate('/'));
  };

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
