export const parseDependencyValue = (value: string) => {
    return value.split(',').map((taskId: string) => taskId.trim());
};
