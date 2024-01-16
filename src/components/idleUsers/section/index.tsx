import { FC } from 'react';
import Card from '@/components/idleUsers/card';
import styles from '@/components/idleUsers/section/section.module.scss';
import { UserStatusArray, UserStatus } from '@/interfaces/userStatus.type';

function renderCards(content: UserStatus[]) {
    return content.map((idleUser) => (
        <Card user={idleUser} key={idleUser.id} />
    ));
}

const Section: FC<UserStatusArray> = ({
    heading,
    content,
    error,
    isLoading,
}) => (
    <div className={styles.section}>
        <div className={styles.heading}>{heading}</div>
        {!!error && (
            <span className={styles.statusMessage}>
                Something went wrong, please contact admin!
            </span>
        )}
        {isLoading ? (
            <span className={styles.statusMessage}>Loading...</span>
        ) : (
            <div className={styles.cardContainer}>{renderCards(content)}</div>
        )}
    </div>
);

export default Section;
