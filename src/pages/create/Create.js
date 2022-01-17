import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import './Create.css';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const Create = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [pages, setPages] = useState('');
  const [year, setYear] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const navigate = useNavigate();
  const { color } = useTheme();
  const authorInput = useRef(null);
  const { user } = useAuth();

  // const { data, postData } = useFetch('http://10.0.0.124:5002/books', 'POST');

  const handleAdd = (e) => {
    const newA = newAuthor.trim();
    setNewAuthor('');
    e.preventDefault();

    if (authors.includes(newA) || newA.length === 0) {
      return;
    }

    setAuthors((prevAuthors) => {
      return [...prevAuthors, newA];
    });

    authorInput.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newBook = { title, authors, pages, year, uid: user.uid };

    await addDoc(collection(db, 'books'), newBook).then((data) =>
      navigate('/'),
    );

    // postData(newBook);
  };

  // useEffect(() => {
  //   if (data) {
  //     navigate('/');
  //   }
  // }, [data]);

  return (
    <div className='create'>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input
            type='text'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>{' '}
        <label>
          <span> Authors</span>
          <div className='authors'>
            <input
              type='text'
              value={newAuthor}
              onChange={(e) => {
                setNewAuthor(e.target.value);
              }}
              ref={authorInput}
            />
            <p>{authors && authors.map((i) => <em key={i}>{i}, </em>)}</p>

            <button
              style={{ backgroundColor: color }}
              onClick={(e) => {
                handleAdd(e);
              }}
            >
              Add Author
            </button>
          </div>
        </label>{' '}
        <label>
          <span>Year Published</span>
          <input
            type='text'
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
        </label>{' '}
        <label>
          <span> Pages</span>
          <input
            type='text'
            value={pages}
            onChange={(e) => {
              setPages(e.target.value);
            }}
          />
        </label>
        <button type='submit' style={{ backgroundColor: color }}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Create;
