import { LOGOUT_URL, USER_PROFILE_URL } from '../constants/url';
import styles from '@/components/Dropdown/dropdown.module.scss';


const Dropdown = () => {

  const logout = () => {
    fetch(LOGOUT_URL, {
      method: 'GET',
      credentials: 'include',
    }).then(() => {
      location.reload();
    });
  }

  return (
    <div className={styles.dropdown}>
      <ul className={styles.dropdownList}>
        <a href={USER_PROFILE_URL} className={styles.dropdownLink}>
          <li className={styles.dropdownItem}>
            My Profile
          </li>
        </a>
        <hr className={styles.line} />
        <li className={styles.dropdownItem} onClick={logout}>
          Sign out
        </li>
      </ul>
    </div>
  )
}

export default Dropdown;
