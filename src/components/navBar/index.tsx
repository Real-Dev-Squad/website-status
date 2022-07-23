import Image from 'next/image';
import styles from '@/components/navBar/navBar.module.scss';
import { useEffect, useState } from 'react';
const RDSLogo = '/RDSLogo.png';
const edit = '/pencil.webp';

function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): (args: A) => Promise<R> {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
      new Promise((resolve) => {
          if (timer) {
              clearTimeout(timer);
          }

          timer = setTimeout(() => {
              resolve(fn(args));
          }, ms);
      });

  return debouncedFunc
}


const NavBar = () => {
  const [isEditVisible, setIsEditVisible] = useState(false);

  

  useEffect(() => {
    function handleKeyDown(event:any) {
      //alt key's keycode is 18
      if(event.keyCode == 18){
        setIsEditVisible(true);
      }
    }
    document.addEventListener('keydown', debounce(handleKeyDown, 300));
    
      return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);


  return (
  <nav className={styles.navBar}>
    <a className={styles.logo} href="https://realdevsquad.com"><Image width="45px" height="45px" src={RDSLogo} alt="real-dev squad" /></a>
    <a href="https://welcome.realdevsquad.com/">Welcome</a>
    <a href="https://www.realdevsquad.com/events.html">Events</a>
    <a href="https://members.realdevsquad.com/">Members</a>
    <a href="https://crypto.realdevsquad.com/">Crypto</a>
    <a className={styles.active} href="https://status.realdevsquad.com/">Status</a>
    
    {isEditVisible && <a className={styles.pencil} href="/?edit=true"><Image width="35px" height="35px" src={edit} alt="edit icon" /></a>}
  </nav>
);}

export default NavBar;

