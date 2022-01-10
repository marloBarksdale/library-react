import React from 'react';
import { useTheme } from '../hooks/useTheme';
const Footer = () => {
  const { color } = useTheme();
  return (
    <footer className='footer' style={{ backgroundColor: color }}></footer>
  );
};

export default Footer;
