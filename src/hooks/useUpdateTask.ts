import task from "@/interfaces/task.type";

/**
 *
 * @param filteredTask - state of tasks
 * @param setFilteredTask - update function to update tasks state
 * @returns function that can be called to update task with taskId and details that will be updated
 */

const useUpdateTask = (
	filteredTask: any[],
	setFilteredTask: (tasks: any[]) => void
) => {
	const updateTask = (
		taskId: string,
		details: {
			status?: string;
			assignee?: string;
		}
	) => {
		const tasks: any = [];

		for (const taskStatus in filteredTask) {
			const taskList: task[] = filteredTask[taskStatus];

			taskList.forEach((task: task) => {
				if (task.id === taskId) {
					const newTask = {
						...task,
						...details,
					};
					let newStatus = details.status;
					if (!newStatus) {
						newStatus = taskStatus;
					}
					if (newStatus in tasks) {
						tasks[newStatus] = [...tasks[newStatus], newTask];
					} else {
						tasks[newStatus] = [newTask];
					}
				} else {
					if (taskStatus in tasks) {
						tasks[taskStatus] = [...tasks[taskStatus], task];
					} else {
						tasks[taskStatus] = [task];
					}
				}
			});
		}

		setFilteredTask(tasks);
	};

	return updateTask;
};

export default useUpdateTask;
