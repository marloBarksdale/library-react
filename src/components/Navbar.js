import React from 'react';
import * as Si from 'react-icons/si';
import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useTheme } from '../hooks/useTheme';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  const { color, changeColor } = useTheme();
  return (
    <>
      <div className='navbar' style={{ background: color }}>
        <nav>
          <Link to='/' className='site-name'>
            <h1>
              Library on Firebase <Si.SiFirebase />
            </h1>
          </Link>
          {/* <Searchbar /> */}
          <Link to='/create'>Create Book</Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
