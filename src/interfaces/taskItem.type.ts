type taskItem = {
    itemid?: string
    itemtype?: 'TASK'
    levelid: string
    levelname: string
    tagid: string
    tagname: string
    tagtype: 'SKILL'
}

export type taskItemPayload = {
    itemid: string
    itemType?: 'TASK'
    tagPayload?: {
                    levelid: string
                    tagid: string
                 }[]
    tagid?: string
}

export default taskItem;