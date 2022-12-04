import React, { FC, ReactNode } from 'react';
import Image from 'next/image';
import classNames from './task-details.module.scss';

const iconSize: string = '25px';

type Props = {
  children?: ReactNode;
  title: string;
  hasImg: boolean;
  src?: string;
};

const TaskContainer: FC<Props> = ({ children, title, hasImg, src = '' }) => {
  if (!hasImg) {
    return (
      <section className={classNames['details_section_parent_container']}>
        <p className={classNames.sectionHeading}>{title}</p>
        {children}
      </section>
    );
  }
  return (
    <section className={classNames['details_section_parent_container']}>
      <div className={classNames['details_container_with_header_image']}>
        <Image src={src} alt="logo" width={iconSize} height={iconSize} />
        <span className={classNames.sectionHeading}>{title}</span>
      </div>
      <div className={classNames['sub_details_flex_container']}>{children}</div>
    </section>
  );
};
export default TaskContainer;
