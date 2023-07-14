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

export { tasks, TASK };

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
    next: '/tasks?status=AVAILABLE&dev=true&size=5&next=aZAxHchprtpuMGsTOqqo'
};

export { PAGINATED_TASKS };