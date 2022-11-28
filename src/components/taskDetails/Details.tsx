import React, { FC } from 'react';
import setColor from './DetailsColor';
import classNames from './task-details.module.scss';

type Props = {
  detailType: string;
  value: string;
};

const Details: FC<Props> = ({ detailType, value }) => {
  return (
    <div>
      <span className={classNames['detail_type']}>{detailType}:</span>
      <span
        className={classNames['detail_value']}
        style={{ color: setColor[value] ?? 'black' }}
      >
        {value ?? 'N/A'}
      </span>
    </div>
  );
};

export default Details;
