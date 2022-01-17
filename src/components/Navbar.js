import React from 'react';
import * as Si from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css';

const Navbar = () => {
  const { color } = useTheme();
  const { user } = useAuth();
  const { logout } = useLogout();
  console.log(user);
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
          <div className='nav-links'>
            {!user && (
              <>
                <Link to='login'>Login</Link>
                <Link to='signup'>Signup</Link>
              </>
            )}

            {user && (
              <>
                {' '}
                <p>Hello, {user.displayName}</p>
                <Link to='/' onClick={logout}>
                  Logout
                </Link>
                <Link to='/create'>Create Book</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
