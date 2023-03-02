import taskHandlers from "./handlers/tasks.handler";
import selfHandler from "./handlers/self.handler";
import idleUserHandler from './handlers/idle-users.handler';

const handlers = [...taskHandlers, ...selfHandler, ...idleUserHandler];

export default handlers;
