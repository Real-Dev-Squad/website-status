import taskHandlers from "./handlers/tasks.handler";
import membersHandlers from "./handlers/members.handler";
import idleUserHandler from './handlers/idle-users.handler';

const handlers = [...taskHandlers, ...membersHandlers, ...idleUserHandler];

export default handlers;
