import classNames from '@/components/tasks/card/card.module.scss';
import getPercentageOfDaysLeft from './getPercentageOfDaysLeft';

const handleProgressColor = (
    percentCompleted: number,
    startedOn: string,
    endsOn: string
): string => {
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
};

export default handleProgressColor;
