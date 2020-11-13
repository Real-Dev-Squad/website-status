import { FunctionComponent } from 'react';
import classNames from './navbar.module.scss';
import Link from 'next/link';

type NavbarProps = {
  page: string;
};

const Navbar: FunctionComponent<NavbarProps> = ({ page }) => {
  const navBarContent = (title: string, refUrl: string) => {
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

export default Navbar;
