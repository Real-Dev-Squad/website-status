import styles from "@/components/navBar/navBar.module.scss";
import { DataItem } from "@/interfaces/navbar.type";

const links: DataItem[] = [
  {
    id: 1,
    name: "Home",
    link: "https://www.realdevsquad.com/",
    linkStyle: styles.homeLink,
  },
  {
    id: 2,
    name: "Welcome",
    link: "https://welcome.realdevsquad.com/",
  },
  {
    id: 3,
    name: "Events",
    link: "https://www.realdevsquad.com/events.html",
  },
  {
    id: 4,
    name: "Members",
    link: "https://members.realdevsquad.com/",
  },
  {
    id: 5,
    name: "Crypto",
    link: "https://crypto.realdevsquad.com/",
  },
  {
    id: 6,
    name: "Status",
    link: "https://status.realdevsquad.com/",
    linkStyle: styles.activeLink,
  },
];

export default links;
