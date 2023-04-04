import { FC, Fragment } from "react";
import Image from "next/image";
import styles from "@/components/storyCard/storyCard.module.scss";

interface TaskProps {
    id: string;
    title: string;
    status: string;
}

type Owner = {
    name: string;
    img: string;
};

export type Props = {
    data: {
        title: string;
        description: string;
        subtasks: TaskProps[];
        status: string;
        started: string;
        dueDate: string;
        owners: {
            backend?: Owner;
            frontend?: Owner;
            feature?: Owner;
        };
    };
};

const Task: FC<TaskProps> = ({ id, title, status }) => (
	<div key={id} className={styles.subtask}>
		<span className={styles.subtaskTitle}>{title}</span>
		<span className={styles.subtaskStatus}>{status}</span>
	</div>
);

const ownerInfo = (type: string, owner?: Owner) => {
	let ownerEl = (
		<div className={styles.toBeDecided}>
			<p>TBD</p>
		</div>
	);

	if (owner) {
		ownerEl = (
			<Image src={owner.img} alt={owner.name} width={50} height={50} />
		);
	}

	return (
		<div className={styles.ownerInfo}>
			<p>{`${type} Engineer:`}</p>
			{ownerEl}
		</div>
	);
};

const StoryCard: FC<Props> = ({ data }) => {
	const { title, description, subtasks, status, owners, started, dueDate } =
        data;

	return (
		<div className={styles.container}>
			<div className={styles.taskInfo}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{description}</div>
				<div className={styles.subtasks}>
					{subtasks.map((task) => (
						<Fragment key={task.id}>
							<Task
								id={task.id}
								title={task.title}
								status={task.status}
							/>
						</Fragment>
					))}
				</div>
				<div className={styles.dateInfo}>
					<div className={styles.taskStarted}>
                        Started
						{started}
					</div>
					<div className={styles.taskDue}>
						<Image
							src="/calendar-icon.png"
							alt="calendar-icon"
							width="25"
							height="25"
						/>
                        Due Date
						<span className={styles.dueDate}>{dueDate}</span>
					</div>
				</div>
			</div>
			<div className={styles.taskStatus}>
				<div className={styles.statusInfo}>
                    Status:
					{status === "Active" ? (
						<span className={styles.subtaskStatus}>{status}</span>
					) : (
						<Image
							src="/lock-solid.svg"
							alt="lock-icon"
							width="25"
							height="30"
						/>
					)}
				</div>
				<div>
					{ownerInfo("Feature", owners.feature)}
					{ownerInfo("Backend", owners.backend)}
					{ownerInfo("Frontend", owners.frontend)}
				</div>
			</div>
		</div>
	);
};

export default StoryCard;
