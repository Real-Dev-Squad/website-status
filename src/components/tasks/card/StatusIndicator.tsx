import { SavedCheckmark } from './SavedCheckmark';
import { ShowError } from './ShowError';
import { SmallSpinner } from './SmallSpinner';
import { PENDING, SAVED, ERROR_STATUS } from '../constants';

type StatusIndicatorProps = {
    status: string;
};

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
    if (status === PENDING) {
        return <SmallSpinner />;
    } else if (status === SAVED) {
        return <SavedCheckmark />;
    } else if (status === ERROR_STATUS) {
        return <ShowError />;
    } else {
        return null;
    }
};
