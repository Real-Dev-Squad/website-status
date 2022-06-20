import Image from "next/image";
import { HOME_PAGE_LINK, RDS_LOGO, REAL_DEV_SQUAD } from "../constants/navbar";

const Logo = () => {
  return (
    <a href={HOME_PAGE_LINK}>
      <Image src={RDS_LOGO} alt={REAL_DEV_SQUAD} height={50} width={50} />
    </a>
  );
};

export default Logo;
