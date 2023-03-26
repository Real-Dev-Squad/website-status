import taskHandlers from "./handlers/tasks.handler";
import selfHandler from "./handlers/self.handler";
import idleUserHandler from './handlers/idle-users.handler';
import tagsHandler from './handlers/tags.handler';
import levelsHandler from './handlers/levels.handler'
import taskDetailsHandler from './handlers/task-details.handler';

const handlers = [...taskHandlers, ...selfHandler, ...idleUserHandler, ...tagsHandler, ...levelsHandler, ...taskDetailsHandler];

export default handlers;
