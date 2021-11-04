let icon = '/sun.png';

const iconDisplay = () => {
  if (icon === '/sun.png') icon = '/moon.png';
  else icon = '/sun.png';
  return icon;
};

const Toggle = ({ themeMode, style }) => (
  <input type="image" onClick={themeMode} src={iconDisplay()} className={style} alt="toggle icon" />
);

export default Toggle;
