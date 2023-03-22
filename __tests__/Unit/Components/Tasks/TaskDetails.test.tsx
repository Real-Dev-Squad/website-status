// IMPORTS:

import TaskDetails from '@/components/taskDetails/index';
import { render, screen } from '@testing-library/react';

// SAMPLE-DATA FOR TESTING:

const DEFAULT_PROPS = {
  url: 'https://realdevsquad.com/learn-site',
  taskID: 'firestoreDocumentId123',
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
    assignee: 'ankur',
    startedOn: '1618790400',
    isNoteworthy: true,
    title: 'Task workflow verification',
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

// MAIN-TESTING-STARTS-HERE:

describe('TaskDetails', () => {
  test('Should render Task Title', () => {
    render(<TaskDetails {...DEFAULT_PROPS} />);
    const sampleElement = screen.getByText(/text/i);
    expect(sampleElement).toBeInTheDocument();
  });
});
