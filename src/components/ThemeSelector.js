import './ThemeSelector.css';
import * as MdIcons from 'react-icons/md';
import { useTheme } from '../hooks/useTheme';

export default function ThemeSelector() {
  const { mode, color, changeColor, changeMode } = useTheme();

  const randomColor = () => {
    const num = Math.floor(Math.random() * 16777216);
    const toHex = (num) => num.toString(16).toUpperCase();

    changeColor('#' + toHex(num));
  };

  const toggleMode = () => {
    mode === 'dark' ? changeMode('light') : changeMode('dark');
    console.log(mode);
  };

  // const myColors = ['#58249c'];

  return (
    <div className='theme-selector'>
      <div className='mode-toggle' onClick={toggleMode}>
        {' '}
        <MdIcons.MdOutlineBrightness6
          style={{ filter: mode === 'dark' ? 'invert(70%)' : 'invert(20%)' }}
        />
      </div>
      <div className='theme-buttons'>
        <div
          key={color}
          style={{ background: color }}
          onClick={() => {
            randomColor();
          }}
        ></div>
      </div>
    </div>
  );
}
