import task from '@/interfaces/task.type';

const groupTasksByStatus = (tasks: task[]) => {
    const taskMap: any = [];
    tasks.forEach((item) => {
        if (item.status in taskMap) {
            taskMap[item.status] = [...taskMap[item.status], item];
        } else {
            taskMap[item.status] = [item];
        }
    });

    return taskMap;
};

export default groupTasksByStatus;
