import { render, screen } from '@testing-library/react';
import TaskDetails from '../../../../src/components/taskDetails/index';

const details = {
  url: 'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details',
  taskID: '6KhcLU3yr45dzjQIVm0J',
  isNoteworthy: true,
  lossRate: {
    dinero: 0,
    neelam: 0,
  },
  purpose: 'string',
  endsOn: 1618790400,
  title: 'test 1 for drag and drop',
  status: 'assigned',
  assignee: 'ankur',
  links: ['null'],
  dependsOn: ['null'],
  percentCompleted: 0,
  type: 'feature',
  startedOn: 1618790410,
  featureUrl: 'string',
  completionAward: {
    neelam: 0,
    dinero: 110,
  },
};

describe('TaskDetails Page', () => {
  test('Loading text rendered when loading', () => {
    render(<TaskDetails url={details.url} taskID={details.taskID} />);
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });
  test('Task title is not rendered when Editing', () => {
    render(<TaskDetails url={details.url} taskID={details.taskID} />);

    const titleElement = screen.queryByTestId('task-title');
    expect(titleElement).not.toBeInTheDocument();
  });
  test('Edit button is not rendered when Editing', () => {
    render(<TaskDetails url={details.url} taskID={details.taskID} />);

    const editButtonElement = screen.queryByRole('button', { name: 'Edit' });
    expect(editButtonElement).not.toBeInTheDocument();
  });
  test('Task Descriprion is not rendered when Editing', () => {
    render(<TaskDetails url={details.url} taskID={details.taskID} />);

    const descriptionElement = screen.queryByText(/No description available/i);
    expect(descriptionElement).not.toBeInTheDocument();
  });
});
