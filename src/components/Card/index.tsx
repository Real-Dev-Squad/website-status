import { FC } from 'react';
import classNames from '@/components/Card/card.module.scss';

type Props = {
  title: {
    text: string,
    link?: string
  },
  data: {
    key: string,
    value: string
  }[],
  participants?:
  {
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
  title, data, participants = undefined, button = undefined,
}) => {
  const { text: tileText } = title;

  function informationElement(key: string, value: string) {
    return (
      <span className={classNames.statusElement}>
        <span className={classNames.statusLable}>{`${key}: `}</span>
        <strong>{value}</strong>
      </span>
    );
  }

  return (
    <div
      className={classNames.card}
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

      <span className={classNames.prTitle}>{tileText}</span>

      <div>
        {data.map((pair) => (
          <div key={pair.key}>
            {informationElement(pair.key, pair.value)}
          </div>
        ))}
      </div>

      {
        (participants) && (
          <div className={classNames.Center}>
            <ul className={classNames.participantsLists}>
              {
                participants.map((participant) => (
                  <li key={participant.userName} className={classNames.participantsList}>
                    <img
                      src={participant.imgUrl}
                      alt={participant.userName}
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
  );
};

export default Card;
