import { DataItem } from "@/interfaces/navbar.type";

const NavbarLinks = ({ data }: { data: DataItem[] }) => {
  return (
    <>
      {data.map((item: DataItem) => {
        return (
          <li className={item.tabStyle ? item.tabStyle : ""} key={item.id}>
            <a
              className={`navBarLink ${item.linkStyle ? item.linkStyle : ""}`}
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
