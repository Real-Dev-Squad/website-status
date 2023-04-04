import task from "../interfaces/task.type";

const beautifyTaskStatus = (tasks: Array<task>) => {
	let taskList: Array<task> = [];
	taskList = tasks.map((task) => {
		const beautifiedTaskStatus = task.status
			.toLowerCase()
			.split("_")
			.map((item) => item.charAt(0).toUpperCase() + item.slice(1))
			.join(" ");
		task.status = beautifiedTaskStatus;
		return task;
	});
	return taskList;
};

export default beautifyTaskStatus;
