import { FC } from 'react';
import styles from '@/components/dark-theme/toggle/toggler.module.scss';

interface Props {
  themeMode?: any
}

let icon = '/sun.png';

const iconDisplay = () => {
  if (icon === '/sun.png') icon = '/moon.png';
  else icon = '/sun.png';
  return icon;
};

const Toggle: FC<Props> = ({ themeMode }) => (
  <div className={styles.cornerIcon}>
    <input type="image" onClick={themeMode} src={iconDisplay()} className={styles.iconImage} alt="toggle icon" />
  </div>
);

export default Toggle;
