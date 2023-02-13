import { render, screen } from '@testing-library/react';
import Tabs from '@/components/Tabs/Tabs';
import getTaskMap from '@/helperFunctions/getTaskMap';

const tasksArray = [
  {
    id: "11j5xXrQ15MarlPQuE4g",
    isNoteworthy: false,
    startedOn: "1628726400",
    links: [
      "this-needs-to-be-fixed"
    ],
    featureUrl: "https://dev.realdevsquad.com/task/create.html",
    completionAward: {
      dinero: 100,
      neelam: 0
    },
    type: "feature",
    percentCompleted: 100,
    title: "Evaluate availability panel feature",
    status: "COMPLETED",
    endsOn: "1628899200",
    createdBy: "ankush",
    lossRate: {
      dinero: 0,
      neelam: 0
    },
    purpose: "Try out the feature created by Pavan",
    assignee: "ankush",
    dependsOn: [],
  },
  {
    id: "11j5xXrQ15MarlPQuE4g",
    isNoteworthy: false,
    startedOn: "1628726400",
    links: [
      "this-needs-to-be-fixed"
    ],
    featureUrl: "https://dev.realdevsquad.com/task/create.html",
    completionAward: {
      dinero: 100,
      neelam: 0
    },
    type: "feature",
    percentCompleted: 100,
    title: "Evaluate availability panel feature",
    status: "IN_PROGRESS",
    endsOn: "1628899200",
    createdBy: "ankush",
    lossRate: {
      dinero: 0,
      neelam: 0
    },
    dependsOn: [],
    purpose: "Try out the feature created by Pavan",
    assignee: "ankush"
  }
]

const taskMap = getTaskMap(tasksArray);

const DEFAULT_PROPS = {
  title : 'Tasks',
  filteredTasks: taskMap
}

describe("Tabs", function(){

  it('should render Tabs', function(){
    render(<Tabs {...DEFAULT_PROPS} />);
    
  })

})