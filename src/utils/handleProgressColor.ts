import styles from '@/components/tasks/card/card.module.scss';
import getPercentageOfDaysLeft from './getPercentageOfDaysLeft';

const handleProgressColor = (
    percentCompleted: number,
    startedOn: string,
    endsOn: string
): string => {
    const percentageOfDaysLeft = getPercentageOfDaysLeft(startedOn, endsOn);
    const percentIncomplete = 100 - percentCompleted;
    if (percentCompleted === 100 || percentageOfDaysLeft >= percentIncomplete) {
        return styles.progressGreen;
    }

    if (
        (percentageOfDaysLeft < 25 && percentIncomplete > 35) ||
        (percentageOfDaysLeft <= 0 && percentIncomplete > 0)
    ) {
        return styles.progressRed;
    }

    if (percentageOfDaysLeft < 50 && percentIncomplete > 75) {
        return styles.progressOrange;
    }

    return styles.progressYellow;
};

export default handleProgressColor;
