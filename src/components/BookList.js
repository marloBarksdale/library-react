import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useFireStore } from '../hooks/useFirestore';
import { useTheme } from '../hooks/useTheme';
import './BookList.css';
const BookList = ({ books }) => {
  // const [id, setId] = useState(null);

  const { mode } = useTheme();
  const { deleteDocument } = useFireStore('books');

  return (
    <div className='book-list'>
      {books &&
        books.map((book, index) => (
          <div key={index} className={`card ${mode}`}>
            <span
              className='delete'
              onClick={() => {
                deleteDocument(book.id);
              }}
            >
              <FaIcons.FaTrash />
            </span>
            <h3>{book.title}</h3>

            <p>{book.year}</p>
            <div>{book.authors.join(', ')}</div>
            <div>{book.pages} pages</div>
            <Link to={`books/${book.id}`}>More</Link>
          </div>
        ))}
    </div>
  );
};

export default BookList;
