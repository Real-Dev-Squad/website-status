import classNames from './menu.module.scss';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Menu = ({ page }) => {
  return (
    <div className={classNames.header}>
      <Link href='/'>
        <a className={page == 'Index' ? classNames.active : ''}>Tasks</a>
      </Link>{' '}
      |
      <Link href='/mine'>
        <a className={page == 'Mine' ? classNames.active : ''}>Mine</a>
      </Link>{' '}
      |
      <Link href='/challenges'>
        <a className={page == 'DS' ? classNames.active : ''}>DS</a>
      </Link>{' '}
      |
      <Link href='/all'>
        <a className={page == 'All' ? classNames.active : ''}>ALL</a>
      </Link>
    </div>
  );
};

Menu.prototype = {
  page: PropTypes.string,
};

Menu.defaultProps = {
  page: 'Index',
};

export default Menu;
