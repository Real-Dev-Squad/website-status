import ActionForm from '@/components/issues/ActionForm';
import { renderWithProviders } from '@/test-utils/renderWithProvider';
import * as tasksApi from '@/app/services/tasksApi';
import { fireEvent, waitFor } from '@testing-library/react';

describe('Issues Action Form Component', () => {
    let updateTaskSpy: any;
    beforeEach(() => {
        updateTaskSpy = jest.spyOn(tasksApi, 'useUpdateTaskMutation');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('calls updateTaskMutation on clicking assigned button', () => {
        const screen = renderWithProviders(<ActionForm taskId="123" />);
        const submitButton = screen.getByRole('button', {
            name: /Assign Task/i,
        });
        fireEvent.click(submitButton);
        expect(updateTaskSpy).toBeCalled();
    });

    test('Should render form properly', () => {
        const screen = renderWithProviders(<ActionForm taskId="123" />);
        const submitButton = screen.getByRole('button', {
            name: /Assign Task/i,
        });
        const assignee = screen.getByPlaceholderText('Assignee');
        const endsOn = screen.getByLabelText(/Ends on:/);
        const status = screen.getByLabelText(/Status:/);
        const options = screen.getAllByRole('option');
        expect(submitButton).toBeInTheDocument();
        expect(assignee).toBeInTheDocument();
        expect(endsOn).toBeInTheDocument();
        expect(status).toBeInTheDocument();
        expect(options).toHaveLength(15);
    });

    test('changes the state when value is entered', () => {
        const screen = renderWithProviders(<ActionForm taskId="123" />);
        const assignee = screen.getByPlaceholderText(
            'Assignee'
        ) as HTMLInputElement;
        const status = screen.getByLabelText(/Status:/) as HTMLSelectElement;
        const options = screen.getAllByRole(
            'option'
        ) as Array<HTMLOptionElement>;
        const endsOn = screen.getByLabelText(/Ends on:/) as HTMLInputElement;

        expect(assignee.value).toBe('');
        expect(status.value).toBe('ASSIGNED');

        fireEvent.change(assignee, { target: { value: 123 } });
        expect(assignee.value).toBe('123');

        fireEvent.change(status, { target: { value: options[2].value } });
        expect(status.value).toBe('IN_PROGRESS');

        fireEvent.change(endsOn, { target: { value: '2020-05-12' } });
        expect(endsOn.value).toBe('2020-05-12');
    });

    test('Should show Suggestion box when username is entered', async () => {
        const screen = renderWithProviders(<ActionForm taskId="123" />);
        const assignee = screen.getByPlaceholderText(
            'Assignee'
        ) as HTMLInputElement;
        let notFoundTextNode = null;
        fireEvent.change(assignee, { target: { value: 123 } });
        await waitFor(() => {
            screen.findByText('User not found!');
        });
        notFoundTextNode = screen.getByTestId('user_not_found');
        expect(notFoundTextNode).toBeInTheDocument();
    });
});
