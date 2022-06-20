import { DataItem } from "@/interfaces/navbar.type";
import styles from "@/components/navBar/navBar.module.scss";

const NavbarLinks = ({ data }: { data: DataItem[] }) => {
  return (
    <>
      {data.map((item: DataItem) => {
        return (
          <li key={item.id} className={styles.navBarListItem}>
            <a
              className={item.linkStyle ? item.linkStyle : styles.navBarLink}
              href={item.link}
            >
              {item.name}
            </a>
          </li>
        );
      })}
    </>
  );
};

export default NavbarLinks;
