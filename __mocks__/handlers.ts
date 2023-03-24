import taskHandlers from "./handlers/tasks.handler";
import selfHandler from "./handlers/self.handler";
import idleUserHandler from './handlers/users-status.handler';
import tagsHandler from './handlers/tags.handler';
import levelsHandler from './handlers/levels.handler'

const handlers = [...taskHandlers, ...selfHandler, ...idleUserHandler, ...tagsHandler, ...levelsHandler];

export default handlers;
