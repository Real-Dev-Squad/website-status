import React from 'react';

let icon = '/sun.png';

const iconDisplay = () => {
  if (icon === '/sun.png') icon = '/moon.png';
  else icon = '/sun.png';
  return icon;
};

const Toggle = ({ toggleTheme, style }) => (
  <input type="image" onClick={toggleTheme} src={iconDisplay()} className={style} alt="toggle icon" />
);
export default Toggle;
