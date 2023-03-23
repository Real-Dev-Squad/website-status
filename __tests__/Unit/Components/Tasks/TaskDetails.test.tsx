import { render, screen } from '@testing-library/react';
import TaskDetails from '@/components/taskDetails/index';

const DEFAULT_PROPS = {
  url: 'https://realdevsquad.com/learn-site',
  taskID: '0CZnoSLruyIihibT1F6m',
  content: {
    lossRate: {
      dinero: 10,
      neelam: 5,
    },
    links: ['https://realdevsquad.com/learn-site'],
    completionAward: {
      dinero: 110,
      neelam: 10,
    },
    dependsOn: [],
    assignee: 'shreya',
    startedOn: '1618790400',
    isNoteworthy: true,
    title: 'Mobile app SignIn GitHub deeplinking',
    purpose: 'string',
    percentCompleted: 0,
    endsOn: '1618790400',
    status: 'assigned',
    featureUrl: 'string',
    type: 'feature',
    createdBy: 'ankush',
  },
  shouldEdit: false,
  onContentChange: jest.fn(),
};

describe('TaskDetails Page', () => {
  test('Should render Task details', () => {
    render(<TaskDetails {...DEFAULT_PROPS} />);
  });
});
