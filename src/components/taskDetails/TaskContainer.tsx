import React, { FC, ReactNode } from 'react';
import Image from 'next/image';
import styles from './task-details.module.scss';

const ICON_SIZE = 25;

type Props = {
    children?: ReactNode;
    title: ReactNode;
    hasImg: boolean;
    src?: string;
};

const TaskContainer: FC<Props> = ({ children, title, hasImg, src = '' }) => {
    if (!hasImg) {
        return (
            <section className={styles['details_section_parent_container']}>
                <div className={styles.sectionHeading}>{title}</div>
                {children}
            </section>
        );
    }
    return (
        <section className={styles['details_section_parent_container']}>
            <div className={styles['details_container_with_header_image']}>
                <Image
                    src={src}
                    alt="logo"
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                />
                <span className={styles.sectionHeading}>{title}</span>
            </div>
            <div className={styles['sub_details_flex_container']}>
                {children}
            </div>
        </section>
    );
};
export default TaskContainer;
