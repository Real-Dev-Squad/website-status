import task from "@/interfaces/task.type";

export type dragDropProps = {
    idleMembers: Array<string>;
    unAssignedTasks: Array<task>;
    refreshData: any;
};

export type droppableComponent = {
    droppableId: string;
    idleMembers: Array<string>;
    unAssignedTasks: Array<task>;
    isTaskOnDrag: boolean;
};

export type draggableProps = {
    draggableId: string;
    index: number;
    title?: string;
};
