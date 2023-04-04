import task from "../interfaces/task.type";

const updateTasksStatus = (tasks: Array<task>) => {
	const taskList: Array<task> = [];

	tasks.forEach((taskItem, index) => {
		taskList.push(taskItem);
		if (
			taskList[index].status === "active" ||
            taskList[index].status === "pending"
		) {
			taskList[index].status = "IN_PROGRESS";
		} else if (taskList[index].status === "assigned") {
			taskList[index].status = "ASSIGNED";
		} else if (taskList[index].status === "unassigned") {
			taskList[index].status = "AVAILABLE";
		} else if (taskList[index].status === "completed") {
			taskList[index].status = "COMPLETED";
		} else if (taskList[index].status === "blocked") {
			taskList[index].status = "BLOCKED";
		}
	});
	return tasks;
};

export default updateTasksStatus;
