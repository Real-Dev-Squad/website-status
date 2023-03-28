import {
  fireEvent,
  logRoles,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
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
  test('Edit button is hidden when a user is viewing', () => {
    render(<TaskDetails url={details.url} taskID={details.taskID} />);
    const editButtonElement = screen.queryByRole('button', { name: 'Edit' });
    expect(editButtonElement).not.toBeInTheDocument();
  });
  const { container } = render(
    <TaskDetails url={details.url} taskID={details.taskID} />
  );
  logRoles(container);
  // test('shouldrender task title', async () => {
  //   render(<TaskDetails url={details.url} taskID={details.taskID} />);

  //   const samplElement = await screen.findByText(
  //     /test 1 for drag and drop/i,
  //     {},
  //     { timeout: 3000 }
  //   );
  //   expect(samplElement).toBeInTheDocument();
  // });
  test('task title rendered', () => {
    render(<TaskDetails url={details.url} taskID={details.taskID} />);
    const titleElement = screen.getByTestId('task-title');
    expect(titleElement).toBeInTheDocument();
  });
});
