const index = (content: any) => {
	const taskData = {
		Level: content.level,
		Challenge_Started: content.start_date,
		Challenge_Ends: content.end_date,
		Active_Participants: content.participants.length,
	};

	const task: any[] = [];
	const getTask = () => {
		Object.entries(taskData).forEach(([key, value]) => {
			task.push({ key, value });
		});
		return task;
	};
	return getTask();
};

export default index;
