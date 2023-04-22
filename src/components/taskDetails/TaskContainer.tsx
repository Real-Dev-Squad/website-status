import React, { FC, ReactNode } from 'react';
import Image from 'next/image';
import classNames from './task-details.module.scss';

const ICON_SIZE = 25;

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
        <Image src={src} alt="logo" width={ICON_SIZE} height={ICON_SIZE} />
        <span className={classNames.sectionHeading}>{title}</span>
      </div>
      <div className={classNames['sub_details_flex_container']}>{children}</div>
    </section>
  );
};
export default TaskContainer;
