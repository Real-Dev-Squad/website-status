import task, { Tab } from '@/interfaces/task.type';

export default function getFilteredTasks(
    tasks: task[],
    status: Tab,
    title: string
) {
    let filteredTasks = tasks;

    if (status !== Tab.ALL)
        filteredTasks = filteredTasks.filter((task) => task.status === status);
    if (title !== '')
        filteredTasks = filteredTasks.filter((task) => task.title === title);

    return filteredTasks;
}
