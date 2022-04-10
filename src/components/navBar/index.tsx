import Image from 'next/image';
import styles from '@/components/navBar/navBar.module.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_SELF } from '../constants/url'

const RDSLogo = '/RDSLogo.png';
const GitHubLogo = '/gitHubLogo.svg'
const hamburgerLogo = '/hamburger.svg';
const DEFAULT_AVATAR = '/dummyProfile.png'
const SIGN_IN_WITH_GITHUB = 'Sign In With GitHub'
const SIGN_IN = 'Sign In'

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData ] = useState({})
  const [userisLoggedIn, setUserisLoggedIn] = useState(false)

  useEffect(()=>{
    (async function(){
      try{
        const { data, status, statusText, incompleteUserDetails } = await axios.get(USER_SELF,{withCredentials:true})
        console.log
        if(status !== 200){
          throw new Error(`${status} (${statusText})`);
        }else if(incompleteUserDetails){
          window.open(
            'https://my.realdevsquad.com/signup',
            '_blank',
            'noopener'
          );
        }

        setUserisLoggedIn(true)
        setUserData({
          userName: data.username,
          firstName:data.first_name,
          profilePicture:data.picture?.url ?? DEFAULT_AVATAR
        })
      }catch(e){
        console.log(e.message)
      }

    })()
  },[])

  const UserSignIn=({btnText})=>{
    return !userisLoggedIn ?  <a
            className={styles.btnLogin}
            href="https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97"
          >
            <button className={styles.btnLoginText}>
              {btnText}
              <img
                className={styles.githubLogo}
                src={GitHubLogo}
                alt="GitHub Icon"
                height="15px"
                width="15px"
              />
            </button>
          </a>:
          <div className={styles.userGreet}>
            <div className={styles.userGreetMsg}>Hello, {userData.firstName ? userData.firstName:`User`}!</div>
            <img className={styles.userProfilePic} src={userData.profilePicture}/>
          </div>
  }


  return (
  <div className={styles.wrapper}>
    
    <nav className={styles.navBar}>
      <div className={styles.hamburger} onClick={() => setToggle(!toggle)} >
        <Image src={hamburgerLogo} alt="hamburger-icon" width="25" height="30" />
      </div>

      <ul className={ toggle ? `${styles.navBarMenu} 
        ${styles.active}` : 
        styles.navBarMenu }
      >
        <li className={styles.navBarLogoLi}>
          <a href="https://www.realdevsquad.com/">
            <img src={RDSLogo} alt="realdevsquad-icon" height="50px" width="50px" />
          </a>
        </li>
        <li className={styles.homeTab}>
          <a href="https://www.realdevsquad.com/"> Home </a>
        </li>
        <li>
          <a href="https://welcome.realdevsquad.com/"> Welcome </a>
        </li>
        <li>
          <a href="https://www.realdevsquad.com/events.html"> Events </a>
        </li>
        <li>
          <a href="https://members.realdevsquad.com/"> Members </a>
        </li>
        <li>
          <a href="https://crypto.realdevsquad.com/"> Crypto </a>
        </li>
        <li>
          <a className={styles.activeTab} href="https://status.realdevsquad.com/"> Status </a>
        </li>
        <li className={styles.navBarLoginLi}>
          <UserSignIn btnText={SIGN_IN_WITH_GITHUB} />
        </li>
      </ul>
      <div className={styles.m_login_btn}>
        <UserSignIn btnText={SIGN_IN}/>
      </div>
    </nav>
  </div>
)};

export default NavBar;
