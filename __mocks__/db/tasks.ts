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
    endsOn: '1618790400',
    status: 'progress',
    featureUrl: 'progress',
    type: 'feature',
    createdBy: 'shmbajaj',
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

export { tasks, TASK, TaskDependencyIds, PAGINATED_TASKS, NEXT_PAGINATED_TASKS };
