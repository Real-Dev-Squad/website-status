import React, { FC, ReactNode } from 'react';
import classNames from './task-details.module.scss';
import Image from 'next/image';

const iconWidth: string = '25px';
const iconHeight: string = '25px';

type Props = {
  children?: ReactNode;
  block_title: string;
  hasImg: boolean;
  src?: string;
};

const TaskContainer: FC<Props> = ({
  children,
  block_title,
  hasImg,
  src = '',
}) => {
  return (
    <>
      {!hasImg ? (
        <div className={classNames['block']}>
          <h5 className={classNames['block_heading']}>{block_title}</h5>
          {children}
        </div>
      ) : (
        <div className={classNames['block']}>
          <div className={classNames['right_container_details_header']}>
            <Image src={src} alt="logo" width={iconWidth} height={iconHeight} />
            <span className={classNames['right_container_details_heading']}>
              {block_title}
            </span>
          </div>
          <div className={classNames['right_container_details_sub_container']}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default TaskContainer;
