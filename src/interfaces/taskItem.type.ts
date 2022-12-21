type taskItem = {
    itemId?: string
    itemType?: 'TASK'
    levelId: string
    levelName: string
    levelValue: number
    tagId: string
    tagName: string
    tagType: 'SKILL'
}

export type taskItemPayload = {
    itemId: string
    itemType?: 'TASK'
    tagPayload?: {
                    levelId: string
                    tagId: string
                 }[]
    tagId?: string
}

export default taskItem;