type taskItem = {
    itemid?: string
    itemtype: "TASK" | "task"
    levelid: string
    levelname: "1" | "2" | "3" | "4" | "5"
    tagid: string
    tagname: string
    tagtype: string
}

export default taskItem;