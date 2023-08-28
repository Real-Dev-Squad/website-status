import React from 'react';
import { render } from '@testing-library/react';
import { StatusIndicator } from '@/components/tasks/card/StatusIndicator'; // Import the component
import { PENDING, SAVED, ERROR_STATUS } from '@/components/tasks/constants';

describe('StatusIndicator', () => {
    it('renders SmallSpinner when status is PENDING', () => {
        const { getByTestId } = render(<StatusIndicator status={PENDING} />);
        expect(getByTestId('small-spinner')).toBeInTheDocument();
    });

    it('renders SavedCheckmark when status is SAVED', () => {
        const { getByTestId } = render(<StatusIndicator status={SAVED} />);
        expect(getByTestId('checkmark')).toBeInTheDocument();
    });

    it('renders ShowError when status is ERROR_STATUS', () => {
        const { getByTestId } = render(
            <StatusIndicator status={ERROR_STATUS} />
        );
        expect(getByTestId('error')).toBeInTheDocument();
    });

    it('renders nothing when status is unknown', () => {
        const { container } = render(<StatusIndicator status="" />);
        expect(container.firstChild).toBeNull();
    });
});
