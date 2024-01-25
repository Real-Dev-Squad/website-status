import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserStatus } from '@/interfaces/userStatus.type';
import getIdleSinceText from '@/helperFunctions/getIdleSinceText';
import styles from '@/components/idleUsers/card/card.module.scss';
import { DUMMY_PROFILE } from '@/constants/display-sections';
import { USER_MANAGEMENT_URL } from '@/constants/url';

type Props = {
    user: UserStatus;
};

const Card: FC<Props> = ({ user }) => {
    const userImg = user?.picture?.url;
    const idleSinceText = getIdleSinceText(user.currentStatus.from);
    const profileUrl = `${USER_MANAGEMENT_URL}/?username=${user.username}`;

    return (
        <Link
            data-testid="profile-card"
            className={styles.card}
            href={profileUrl}
        >
            <Image
                src={userImg || DUMMY_PROFILE}
                alt={user.full_name}
                width={150}
                height={150}
                data-testid="user-image"
            />
            <p className={styles.name}>{user.full_name}</p>
            <span data-testid="idle-since">{idleSinceText}</span>
        </Link>
    );
};

export default Card;
