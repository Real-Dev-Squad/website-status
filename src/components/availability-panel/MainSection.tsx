/* eslint-disable quotes */
import React, { FC } from 'react';
import classNames from '@/components/availability-panel/MainSection.module.scss';
import DragDropcontext from './drag-drop-context';

type Props = {
  heading: string;
  unAssignedTasks: Array<object>;
  taskIsLoading: boolean;
  taskError: string | null;

  idleMembers: Array<string>;
  isLoading: boolean;
  error: string | null;
};

const MainSection: FC<Props> = ({
  heading,
  idleMembers,
  isLoading,
  error,
  taskError,
  taskIsLoading,
  unAssignedTasks,
}) => (
  <div>
    <div className={classNames.heading}>{heading}</div>
    {
      // eslint-disable-next-line no-nested-ternary
      !!error || !!taskError ? (
        <span className={classNames.statusMessage}>
          Something went wrong, please contact admin!
        </span>
      ) : isLoading || taskIsLoading ? (
        <span className={classNames.statusMessage}>Loading...</span>
      ) : (
        <div>
          <DragDropcontext
            idleMembers={idleMembers}
            unAssignedTasks={unAssignedTasks}
          />
        </div>
      )
    }
  </div>
);

export default MainSection;
