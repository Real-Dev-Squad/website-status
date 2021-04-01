/* eslint-disable jsx-a11y/no-static-element-interactions */
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
  button?: {
    text: string,
    link: string | undefined,
    onClick?: () => void
  };
};

const Card: FC<Props> = ({ title, data, button = undefined }) => {
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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={classNames.card}
      onClick={() => {
        if (title.link !== undefined) {
          // eslint-disable-next-line no-restricted-globals
          location.href = title.link;
        }
      }}
    >

      <span className={classNames.prTitle}>{tileText}</span>

      <div>
        {data.map((pair) => (
          <div>
            {informationElement(pair.key, pair.value)}
          </div>
        ))}
      </div>

      <div className={classNames.Center}>
        <a
          href={button?.link}
          className={classNames.links}
          target="_blank"
          rel="noreferrer"
        >
          <button type="button" className={classNames.activeBtn}>
            {button?.text}
          </button>
        </a>
      </div>

    </div>
  );
};

export default Card;
