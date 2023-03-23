import taskHandlers from "./handlers/tasks.handler";
import membersHandlers from "./handlers/members.handler";
import idleUserHandler from './handlers/idle-users.handler';
import taskDetailsHandler from "./handlers/task-details.handler";

const handlers = [...taskHandlers, ...membersHandlers, ...idleUserHandler, ...taskDetailsHandler];

export default handlers;
