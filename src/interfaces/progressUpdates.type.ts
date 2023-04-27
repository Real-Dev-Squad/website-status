type getProgress = {
    timestamp: string,
    userId: string,
    taskId: string,
    progress: string,
    plan: string,
    blockers: string
}

type saveProgress = {
    id: string,
    message: string
}

export type { getProgress, saveProgress };