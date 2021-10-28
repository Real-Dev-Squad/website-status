import React from 'react';

let Icon = '/moon.png';

const iconDisplay = () => {
  if (Icon === '/moon.png') Icon = '/sun.png';
  else Icon = '/moon.png';
  return Icon;
};

const Toggle = ({ toggleTheme, style }) => (
  <input type="image" onClick={toggleTheme} src={iconDisplay()} className={style} alt="toggle icon" />
);
export default Toggle;
