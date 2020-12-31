import { FC } from 'react';
import Link from 'next/link';
import classNames from './navbar.module.scss';

type NavbarProps = {
  page: string;
};

const Navbar: FC<NavbarProps> = ({ page }) => {
  const navBarContent = (title: string, refUrl: string) => {
    const linkClasses = `${classNames.link} ${page === title ? classNames.active : ''}`;
    return (
      <Link href={refUrl}>
        <div className={linkClasses}>{title}</div>
      </Link>
    );
  };
  return (
    <div className={classNames.header}>
      {navBarContent('Tasks', '/')}
      {' '}
      |
      {navBarContent('Mine', '/mine')}
      {' '}
      |
      {' '}
      {navBarContent('DS', '/challenges')}
      {' '}
      |
      {navBarContent('ALL', '/all')}
    </div>
  );
};

export default Navbar;
