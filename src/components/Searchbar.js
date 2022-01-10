import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Searchbar.css';

const Searchbar = () => {
  const [searchTerm, setTerm] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?q=${searchTerm}`);
    setTerm('');
    navigate(0);
  };

  const string = useLocation().search;

  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>
          Search:
          <input
            type='search'
            name=''
            id='search'
            value={searchTerm}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
        </label>
      </form>
    </div>
  );
};

export default Searchbar;
