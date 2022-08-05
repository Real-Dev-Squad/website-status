import taskHandlers from "./handlers/tasks.handler";
import membersHandlers from "./handlers/members.handler";

const handlers = [...taskHandlers, ...membersHandlers];

export default handlers;
