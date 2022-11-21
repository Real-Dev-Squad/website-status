import React, { FC } from 'react';
import classNames from './task-details.module.scss';

function setDetailsColor(value: string = '') {
  switch (value) {
    case 'HIGH':
      return 'red';
    case 'MEDIUM':
      return 'orange';
    case 'LOW':
      return 'green';
    default:
      return 'black';
  }
}

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
        style={{ color: setDetailsColor(value) }}
      >
        {value ? value : 'N/A'}
      </span>
    </div>
  );
};

export default Details;
