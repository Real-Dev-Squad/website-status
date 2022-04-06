import { FC } from 'react';
import classNames from '@/components/Card/card.module.scss';
import Image from 'next/image';

const DUMMY_PROFILE_PICTURE = 'dummyProfile.png';

export type Props = {
  darkMode?: boolean,
  title: {
    text: string,
    link?: string
  },
  data: {
    key: string,
    value: string
  }[],
  assignee?:
  {
    userName: string,
    imgUrl: string,
    onError: () => void
  },
  participants?:
  {
    firstName: string,
    lastName: string,
    userName: string,
    imgUrl: string,
  }[],
  button?: {
    text: string,
    link?: string,
    onClick?: () => void
  };
};

const Card: FC<Props> = ({
  title, data, darkMode=false, assignee = undefined, participants = undefined, button = undefined,
}) => {
  const { text: tileText } = title;

  const informationElement = (key: string, value: string) => (
    <span className={classNames.statusElement}>
      <span className={classNames.statusLable}>{`${key}: `}</span>
      <strong className={classNames.infoElement}>{value}</strong>
    </span>
  );

  return (
    <div className={darkMode ? classNames.darkTheme : classNames.lightTheme}>
      <div
        className={`
          ${classNames.card}
          ${title.link && classNames.links}
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

        <span className={classNames.title} title={tileText}>{tileText}</span>

        <div>
          {data.map((pair) => (
            <div key={pair.key}>
              {informationElement(pair.key, pair.value)}
            </div>
          ))}
        </div>

      {
        (assignee) && (
          <div className={classNames.cardFooter}>
            <div className={classNames.profilePicture}>
              <Image
                src={assignee.imgUrl}
                alt={assignee.userName}
                onError={assignee.onError}
              />
              <strong>{assignee.userName || 'No contributor'}</strong>
            </div>
          </div>
        )
      }

      {
        (participants) && (
          <div className={classNames.Center}>
            <ul className={classNames.participantsLists}>
              {
                participants.map((participant) => (
                  <li key={participant.userName} className={classNames.participantsList}>
                    <Image
                      src={participant.imgUrl}
                      onError={
                        (e) => { (e.target as HTMLImageElement).src = DUMMY_PROFILE_PICTURE; }
                      }
                      alt={`${participant.firstName} ${participant.lastName}`}
                    />
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }

        {
          (button) && (
            <div className={classNames.Center}>
              <a
                href={button?.link}
                className={classNames.links}
                target="_blank"
                rel="noreferrer"
              >
                <button type="button" onClick={button?.onClick} className={classNames.activeBtn}>
                  {button.text}
                </button>
              </a>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Card;
