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

export { tasks, TASK, TaskDependencyIds };