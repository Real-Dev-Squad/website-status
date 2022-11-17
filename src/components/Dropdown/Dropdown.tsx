import Link from 'next/link'
import React from 'react'
import styles from '@/components/Dropdown/dropdown.module.scss';
import { USER_PROFILE_URL } from '../constants/url';


const Dropdown = () => {

  const logout = () => {
    fetch('https://api.realdevsquad.com/auth/signout', {
      method: 'GET',
      credentials: 'include',
    }).then(() => {
      location.reload();
    });
  }

  return (
    <div className={styles.dropdown}>
      <ul className={styles.dropdownList}>
        <li className={styles.dropdownItem}>
          <Link href={USER_PROFILE_URL}>
            <a className={styles.dropdownLink}>
              My Profile
            </a>
          </Link>
        </li>
        <hr className={styles.line} />
        <li className={styles.dropdownItem} onClick={() => logout()}>
          Sign out
        </li>
      </ul>
    </div>
  )
}

export default Dropdown;