import React, { FC, ReactNode } from "react";
import classNames from "./task-details.module.scss";
import Image from "next/image";

const iconWidth: string = "25px";
const iconHeight: string = "25px";

type Props = {
  children?: ReactNode;
  title: string;
  hasImg: boolean;
  src?: string;
};

const TaskContainer: FC<Props> = ({ children, title, hasImg, src = "" }) => {
  return (
    <>
      {!hasImg ? (
        <section className={classNames["details_section_parent_container"]}>
          <p className={classNames["section_heading"]}>{title}</p>
          {children}
        </section>
      ) : (
        <section className={classNames["details_section_parent_container"]}>
          <div className={classNames["details_container_with_header_image"]}>
            <Image src={src} alt="logo" width={iconWidth} height={iconHeight} />
            <span className={classNames["section_heading"]}>{title}</span>
          </div>
          <div className={classNames["sub_details_flex_container"]}>
            {children}
          </div>
        </section>
      )}
    </>
  );
};
export default TaskContainer;
