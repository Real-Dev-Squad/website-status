import { FC, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "@/components/footer";
import styles from "@/components/Layout/Layout.module.scss";
import NavBar from "@/components/navBar";

interface Props {
  children?: ReactNode;
}

const navBarContent = (
  title: string,
  refUrl: string,
  isActive: boolean = false
) => {
  const linkClasses = `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <Link href={refUrl} passHref>
      <button type="button" tabIndex={0} className={linkClasses}>
        {title}
      </button>
    </Link>
  );
};

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();

  // Dev feature toggle
  const { query } = router;
  const dev = !!query.dev;

  return (
    <div className={styles.layout}>
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <button className="but">
            {navBarContent("Tasks", "/", router.pathname === "/")}
          </button>
          <button className="but">
            {navBarContent("Mine", "/mine", router.pathname === "/mine")}
          </button>
          <button className="but">
            {navBarContent(
              "DS",
              "/challenges",
              router.pathname === "/challenges"
            )}
          </button>

          <button className="but ">
            {navBarContent(
              "Open PRs",
              "/openPRs",
              router.pathname === "/openPRs"
            )}
          </button>
          <button className="but">
            {navBarContent(
              "Stale PRs",
              "/stale-pr",
              router.pathname === "/stale-pr"
            )}
          </button>
          <button className="but">
            {navBarContent(
              "Idle Members",
              "/idle-members",
              router.pathname === "/idle-members"
            )}
          </button>
          {dev && (
            <>|{navBarContent("Availability Panel", "/availability-panel")}</>
          )}
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
