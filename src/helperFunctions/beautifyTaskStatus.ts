import task from '../interfaces/task.type';

const beautifyTaskStatus = (tasks: Array<task>) => {
  const taskList: Array<task> = [];
  tasks.forEach((taskItem: task, taskIndex) => {
    taskList.push(taskItem);
    const splitedStringArray = taskItem.status.split('_');
    splitedStringArray.forEach((subString, index) => {
      splitedStringArray[index] = subString.toLowerCase();
    });
    splitedStringArray.forEach((string, index) => {
      splitedStringArray[index] = string.charAt(0).toUpperCase() + string.slice(1);
    });
    taskList[taskIndex].status = splitedStringArray.join(' ');
  });
  return taskList;
};

export default beautifyTaskStatus;
