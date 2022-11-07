import React, { FC } from 'react';
import classNames from './task-details.module.scss';

function setDetailsColor(value: any) {
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
  value: any;
};

const Details: FC<Props> = ({ detailType, value }) => {
  return (
    <div>
      <span className={classNames['block_content_detail_type']}>
        {detailType}:
      </span>
      <span
        className={classNames['block_content_value']}
        style={{ color: setDetailsColor(value) }}
      >
        {value ? value : 'N/A'}
      </span>
    </div>
  );
};

export default Details;
