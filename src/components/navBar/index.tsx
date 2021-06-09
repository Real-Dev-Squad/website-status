import React from 'react';
import style from '@/components/navBar/navBar.module.scss';

const NavBar = () => (
  <div>
    <nav className={style.navBar}>
      <ul>
        <li>
          <a style={{ padding: '7px' }} href="https://realdevsquad.com">
            <img
              src="/RDSLogo.png"
              alt="home nav logo"
              width="42"
            />
          </a>
        </li>
        <li><a href="https://realdevsquad.com">Home</a></li>
        <li><a href="https://welcome.realdevsquad.com/">Welcome</a></li>
        <li><a href="./events.html">Events</a></li>
        <li><a href="https://members.realdevsquad.com/">Members</a></li>
        <li><a href="https://crypto.realdevsquad.com/">Crypto</a></li>
        <li><a style={{ color: '#87d870' }} href="https://status.realdevsquad.com/">Status</a></li>
      </ul>
    </nav>
  </div>
);

export default NavBar;
