import { TASK_STATUS } from '@/interfaces/task-status';
import task from '@/interfaces/task.type';

const TASK = {
  id: 'firestoreDocumentId123',
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
  assignee: 'shmbajaj',
  startedOn: '1618790400',
  isNoteworthy: true,
  title: 'Testing and Determinsitic State',
  purpose: 'string',
  percentCompleted: 0,
  endsOn: 1618790400,
  status: 'progress',
  featureUrl: 'progress',
  type: 'feature',
  createdBy: 'shmbajaj',
  priority:'TBD'
  
};
const tasks: task[] = Array.from({ length: 10 }).map((_, index) => ({
  ...TASK,
  id: TASK.id + index,
}));

const TaskDependencyIds = ['6KhcLU3yr45dzjQIVm0J', 'taskid-2'];

const PAGINATED_TASKS = {
  tasks: [
    {
      id: 'yVC1KqYuUTZdkUFqF9NY',
      percentCompleted: 0,
      isNoteworthy: false,
      createdBy: 'sahsi',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'AVAILABLE',
      title: 'Design and develop an online booking system',
      dependsOn: []
    },
    {
      id: 'ei2hlGV2BSJ3bRDAbkty',
      percentCompleted: 0,
      isNoteworthy: false,
      createdBy: 'sahsi',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'AVAILABLE',
      title: 'Develop a mobile game using Unity',
      dependsOn: []
    },
    {
      id: 'tCLdKbDDW0Bl9NVv3bRa',
      percentCompleted: 0,
      isNoteworthy: false,
      createdBy: 'sahsi',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'AVAILABLE',
      title: 'Implement a content management system (CMS)',
      dependsOn: []
    },
    {
      id: '8ygXLYcsCORg2JEHiSgr',
      percentCompleted: 0,
      isNoteworthy: false,
      createdBy: 'sahsi',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'AVAILABLE',
      title: 'Implement a search functionality for a product catalog',
      dependsOn: []
    },
    {
      id: 'P86Y1hVrS0zR5ZcVPwLZ',
      percentCompleted: 0,
      isNoteworthy: false,
      createdBy: 'sahsi',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'AVAILABLE',
      title: 'Implement user authentication and authorization',
      dependsOn: []
    },
    {
      id: 'AB6Y1hVrS0zR5ZcVPwYZ',
      percentCompleted: 100,
      isNoteworthy: false,
      createdBy: 'sahsi',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'DONE',
      title: 'Depreciate task status AVAILABLE and COMPLETED',
      dependsOn: []
    }
  ],
  prev: '/tasks?status=AVAILABLE&dev=true&size=5&prev=ARn1G8IxUt1zrfMdTyfn',
  next: '/tasks?status=AVAILABLE&dev=true&size=5&next=abc123'
};

const NEXT_PAGINATED_TASKS = {
  tasks: [
    {
      id: 'abc123',
      percentCompleted: 0,
      isNoteworthy: false,
      createdBy: 'John',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'AVAILABLE',
      title: 'Design and develop a social media platform',
      dependsOn: []
    },
    {
      id: 'def456',
      percentCompleted: 0,
      isNoteworthy: false,
      createdBy: 'Emily',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'AVAILABLE',
      title: 'Build a website for an e-commerce store',
      dependsOn: []
    },
    {
      id: 'ghi789',
      percentCompleted: 0,
      isNoteworthy: false,
      createdBy: 'David',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'AVAILABLE',
      title: 'Develop a mobile app for fitness tracking',
      dependsOn: []
    },
    {
      id: 'jkl012',
      percentCompleted: 0,
      isNoteworthy: false,
      createdBy: 'Sophia',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'AVAILABLE',
      title: 'Create a web-based project management tool',
      dependsOn: []
    },
    {
      id: 'mno345',
      percentCompleted: 0,
      isNoteworthy: false,
      createdBy: 'Daniel',
      lossRate: {
        dinero: 100,
        neelam: 0
      },
      assignee: false,
      type: 'feature',
      priority: 'HIGH',
      completionAward: {
        dinero: 1000,
        neelam: 0
      },
      status: 'AVAILABLE',
      title: 'Design and implement a chat application',
      dependsOn: []
    }
  ],
  prev: '/tasks?status=AVAILABLE&dev=true&size=5&prev=P86Y1hVrS0zR5ZcVPwLZ',
  next: '/tasks?status=AVAILABLE&dev=true&size=5&next=aZAxHchprtpuMGsTOqqo'

};

const MINE_TASKS = [
  {
    id: 'BMc4Bgy7FD7BOEa0NZzP',
    percentCompleted: 20,
    endsOn: 1690243200,
    github: {
      issue: {
        id: 1806764661,
        assignee: 'sahsisunny',
        status: 'open'
      }
    },
    createdBy: 'ankush',
    assignee: 'sunny-s',
    title: 'Sync Discord User to RDS backend ',
    type: 'feature',
    priority: 'TBD',
    startedOn: 1689553319.9,
    status: 'IN_PROGRESS'
  },
  {
    id: 'CyGNTPGoA7Cgi3bbb3Mt',
    percentCompleted: 100,
    endsOn: 1684900256,
    isNoteworthy: true,
    createdBy: 'ankush',
    lossRate: {
      dinero: 200,
      neelam: 0
    },
    assignee: 'sunny-s',
    title: 'Collapse non-interesting tasks or PRs in member details page',
    type: 'feature',
    priority: 'MEDIUM',
    completionAward: {
      dinero: 3000,
      neelam: 0
    },
    startedOn: 1680397446.1,
    status: 'VERIFIED'
  },
  {
    id: 'F2A6XVGgM3IshzEd5niL',
    percentCompleted: 100,
    endsOn: 1688445662,
    isNoteworthy: false,
    createdBy: 'ankush',
    lossRate: {
      dinero: 100,
      neelam: 0
    },
    assignee: 'sunny-s',
    title: 'Status site should use cloudinary images',
    type: 'feature',
    priority: 'HIGH',
    completionAward: {
      dinero: 1000,
      neelam: 0
    },
    startedOn: 1680398131.277,
    status: 'VERIFIED'
  }
];

const CONTENT = [
    {
        id: 'OxYqJgf6Tyl90uci1mzs`',
        title: 'Evaluate availability panel feature',
        purpose: 'Try out the feature created by Pavan',
        featureUrl: 'https://dev.realdevsquad.com/task/create.html',
        type: 'feature',
        links: ['this-needs-to-be-fixed'],
        endsOn: 1692988200000,
        startedOn: '1692580330711',
        status: 'BLOCKED',
        assignee: 'mahima',
        percentCompleted: 0,
        dependsOn: [],
        participants: ['mahima'],
        completionAward: { dinero: 100, neelam: 0 },
        lossRate: { dinero: 0, neelam: 0 },
        isNoteworthy: false,
        createdBy: 'mahima',
        github: {
            issue: {
                id: 1814970348,
                assignee: 'mahima',
                status: 'open',
                closedAt: '1692988200000',
                assigneeRdsInfo: {
                    firstName: 'mahima',
                    lastName: 'kumar',
                    username: 'mahima',
                },
            },
        },
    },
    {
        id: 'OxYqJgf6Tyl90uci1mzs`',
        title: 'Evaluate availability panel feature',
        purpose: 'Try out the feature created by Pavan',
        featureUrl: 'https://dev.realdevsquad.com/task/create.html',
        type: 'feature',
        links: ['this-needs-to-be-fixed'],
        endsOn: 1692988200000,
        startedOn: '1692580330711',
        status: 'BLOCKED',
        assignee: '',
        percentCompleted: 0,
        dependsOn: [],
        participants: [],
        completionAward: { dinero: 100, neelam: 0 },
        lossRate: { dinero: 0, neelam: 0 },
        isNoteworthy: false,
        createdBy: '',
        github: {
            issue: {
                id: 1814970348,
                assignee: '',
                status: 'open',
                closedAt: '1692988200000',
                assigneeRdsInfo: {
                    firstName: 'mahima',
                    lastName: 'kumar',
                    username: 'mahima',
                },
            },
        },
    },
    {
      id: 'OxYqJgf6Tyl90uci1mzs`',
      title: 'Evaluate availability panel feature',
      purpose: 'Try out the feature created by Pavan',
      featureUrl: 'https://dev.realdevsquad.com/task/create.html',
      type: 'feature',
      links: ['this-needs-to-be-fixed'],
      endsOn: 1692988200000,
      startedOn: '1618790400',
      status: TASK_STATUS.ASSIGNED,
      assignee: 'mahima',
      percentCompleted: 0,
      dependsOn: [],
      participants: ['mahima'],
      completionAward: { dinero: 100, neelam: 0 },
      lossRate: { dinero: 0, neelam: 0 },
      isNoteworthy: false,
      createdBy: 'mahima',
      github: {
          issue: {
              id: 1814970348,
              assignee: 'mahima',
              status: 'open',
              closedAt: '1692988200000',
              assigneeRdsInfo: {
                  firstName: 'mahima',
                  lastName: 'kumar',
                  username: 'mahima',
              },
          },
      },
  },
  {
    id: 'OxYqJgf6Tyl90uci1mzs`',
    title: 'Evaluate availability panel feature',
    purpose: 'Try out the feature created by Pavan',
    featureUrl: 'https://dev.realdevsquad.com/task/create.html',
    type: 'feature',
    links: ['this-needs-to-be-fixed'],
    endsOn: 1692988200000,
    startedOn: '1692580330711',
    status: TASK_STATUS.AVAILABLE,
    assignee: 'mahima',
    percentCompleted: 0,
    dependsOn: [],
    participants: ['mahima'],
    completionAward: { dinero: 100, neelam: 0 },
    lossRate: { dinero: 0, neelam: 0 },
    isNoteworthy: false,
    createdBy: 'mahima',
    github: {
        issue: {
            id: 1814970348,
            assignee: 'mahima',
            status: 'open',
            closedAt: '1692988200000',
            assigneeRdsInfo: {
                firstName: 'mahima',
                lastName: 'kumar',
                username: 'mahima',
            },
        },
    },
}
];

export { tasks, TASK, TaskDependencyIds, PAGINATED_TASKS, NEXT_PAGINATED_TASKS, MINE_TASKS, CONTENT };
