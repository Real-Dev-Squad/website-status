import classNames from './navbar.module.scss';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Navbar = ({ page }) => {
  const navBarContent = (title, refUrl) => {
    const navBarText = title === 'Tasks' ? 'Index' : title;
    return (
      <Link href={refUrl}>
        <a className={page === navBarText ? classNames.active : ''}>{title}</a>
      </Link>
    );
  };
  return (
    <div className={classNames.header}>
      {navBarContent('Tasks', '/')} | {navBarContent('Mine', '/mine')} |{' '}
      {navBarContent('DS', '/challenges')} | {navBarContent('ALL', '/all')}
    </div>
  );
};

Navbar.prototype = {
  page: PropTypes.string,
};

Navbar.defaultProps = {
  page: 'Index',
};

export default Navbar;
