import { FC } from 'react';
import styles from '@/components/Card/card.module.scss';
import Image from 'next/image';

const DUMMY_PROFILE_PICTURE = 'dummyProfile.png';

export type Props = {
    title: {
        text: string;
        link?: string;
    };
    data: {
        key: string;
        value: string;
    }[];
    assignee?: {
        userName: string;
        imgUrl: string;
        onError: () => void;
    };
    participants?: {
        firstName: string;
        lastName: string;
        userName: string;
        imgUrl: string;
    }[];
    button?: {
        text: string;
        link?: string;
        onClick?: () => void;
    };
};

const Card: FC<Props> = ({
    title,
    data,
    assignee = undefined,
    participants = undefined,
    button = undefined,
}) => {
    const { text: tileText } = title;

    const informationElement = (key: string, value: string) => (
        <span className={styles.statusElement}>
            <span className={styles.statusLable}>{`${key}: `}</span>
            <strong>{value}</strong>
        </span>
    );

    return (
        <div
            className={`
        ${styles.card}
        ${title.link && styles.links}
      `}
            onClick={() => {
                if (title.link) {
                    window.open(title.link, '_blank');
                }
            }}
            onKeyDown={() => {
                if (title.link) {
                    window.open(title.link, '_blank');
                }
            }}
            role="button"
            tabIndex={0}
        >
            <span className={styles.title} title={tileText}>
                {tileText}
            </span>

            <div>
                {data.map((pair) => (
                    <div key={pair.key}>
                        {informationElement(pair.key, pair.value)}
                    </div>
                ))}
            </div>

            {assignee && (
                <div className={styles.cardFooter}>
                    <div className={styles.profilePicture}>
                        <Image
                            src={assignee.imgUrl}
                            alt={assignee.userName}
                            onError={assignee.onError}
                        />
                        <strong>{assignee.userName || 'No contributor'}</strong>
                    </div>
                </div>
            )}

            {participants && (
                <div className={styles.Center}>
                    <ul className={styles.participantsLists}>
                        {participants.map((participant) => (
                            <li
                                key={participant.userName}
                                className={styles.participantsList}
                            >
                                <Image
                                    src={participant.imgUrl}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            DUMMY_PROFILE_PICTURE;
                                    }}
                                    alt={`${participant.firstName} ${participant.lastName}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {button && (
                <div className={styles.Center}>
                    <a
                        href={button?.link}
                        className={styles.links}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button
                            type="button"
                            onClick={button?.onClick}
                            className={styles.activeBtn}
                        >
                            {button.text}
                        </button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default Card;
