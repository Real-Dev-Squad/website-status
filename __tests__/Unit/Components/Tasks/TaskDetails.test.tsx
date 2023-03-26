import { render, screen, waitFor } from '@testing-library/react';
import TaskDetails from '@/components/taskDetails/index';
import { url } from 'inspector';

const details = {
  url: 'https://realdevsquad.com/learn-site',
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
  type: 'string',
  startedOn: 1618790410,
  featureUrl: 'string',
  completionAward: {
    neelam: 0,
    dinero: 110,
  },
};

describe('TaskDetails Page', () => {
  test('Should show loading text when data is loading', () => {
    render(<TaskDetails {...details} />);
    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
  });
});
