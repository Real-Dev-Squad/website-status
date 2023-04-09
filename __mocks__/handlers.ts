import taskHandlers from './handlers/tasks.handler';
import selfHandler from './handlers/self.handler';
import userStatusHandler from './handlers/users-status.handler';
import tagsHandler from './handlers/tags.handler';
import levelsHandler from './handlers/levels.handler';
import usersHandler from './handlers/users.handler';

const handlers = [...taskHandlers, ...selfHandler, ...userStatusHandler, ...tagsHandler, ...levelsHandler, ...usersHandler];

export default handlers;
