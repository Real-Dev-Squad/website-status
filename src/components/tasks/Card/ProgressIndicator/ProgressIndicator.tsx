import { FC } from 'react';
import classNames from '@/components/tasks/Card/ProgressIndicator/ProgressIndicator.module.scss';

import task from '@/interfaces/task.type';
import moment from 'moment';

type Props = {
    content: task;
};

function inputParser(input: string) {
    const parsedDate = moment(new Date(parseInt(input, 10) * 1000));
    return parsedDate;
}

function getPercentageOfDaysLeft(startedOn: string, endsOn: string): number {
    const startDate = inputParser(startedOn);
    const endDate = inputParser(endsOn);

    // It provides us with total days that are there for the the project and number of days left
    const totalDays = endDate.diff(startDate, 'days');
    const daysLeft = endDate.diff(new Date(), 'days');

    // It provides the percentage of days left
    const percentageOfDaysLeft = (daysLeft / totalDays) * 100;
    return percentageOfDaysLeft;
}

function handleProgressColor(
    percentCompleted: number,
    startedOn: string,
    endsOn: string
): string {
    const percentageOfDaysLeft = getPercentageOfDaysLeft(startedOn, endsOn);
    const percentIncomplete = 100 - percentCompleted;
    if (percentCompleted === 100 || percentageOfDaysLeft >= percentIncomplete) {
        return classNames.progressGreen;
    }

    if (
        (percentageOfDaysLeft < 25 && percentIncomplete > 35) ||
        (percentageOfDaysLeft <= 0 && percentIncomplete > 0)
    ) {
        return classNames.progressRed;
    }

    if (percentageOfDaysLeft < 50 && percentIncomplete > 75) {
        return classNames.progressOrange;
    }

    return classNames.progressYellow;
}

export const ProgressIndicator: FC<Props> = ({ content }) => (
    <div className={classNames.progressIndicator}>
        <div
            className={`${handleProgressColor(
                content.percentCompleted,
                content.startedOn,
                content.endsOn
            )} ${classNames.progressStyle}`}
            style={{
                width: `${content.percentCompleted}%`,
            }}
        ></div>
    </div>
);
