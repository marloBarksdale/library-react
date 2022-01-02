import React from 'react';

const Searchbar = () => {
  return (
    <div className='searchbar'>
      <form>
        <label htmlFor='search'>
          Search:
          <input type='search' name='' id='search' />
        </label>
      </form>
    </div>
  );
};

export default Searchbar;
