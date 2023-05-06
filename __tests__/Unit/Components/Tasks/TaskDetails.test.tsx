import { render, screen } from '@testing-library/react';
import TaskDetails from '@/components/taskDetails';

const details = {
    url: 'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details',
    taskID: '6KhcLU3yr45dzjQIVm0J',
};

describe('TaskDetails Page', () => {
    test('Loading text rendered when loading', () => {
        render(<TaskDetails url={details.url} taskID={details.taskID} />);
        const loadingElement = screen.getByText(/Loading.../i);
        expect(loadingElement).toBeInTheDocument();
    });
    test('Task title is Editable in Editing mode ', () => {
        render(<TaskDetails url={details.url} taskID={details.taskID} />);

        const titleElement = screen.queryByTestId('task-title');
        expect(titleElement).not.toBeInTheDocument();
    });
    test('Edit button is not rendered when Editing', () => {
        render(<TaskDetails url={details.url} taskID={details.taskID} />);

        const editButtonElement = screen.queryByRole('button', {
            name: 'Edit',
        });
        expect(editButtonElement).not.toBeInTheDocument();
    });
    test('Task Description is Editable in Editing mode', () => {
        render(<TaskDetails url={details.url} taskID={details.taskID} />);

        const descriptionElement = screen.queryByText(
            /No description available/i
        );
        expect(descriptionElement).not.toBeInTheDocument();
    });
});
