import taskHandlers from './handlers/tasks.handler';
import selfHandler from './handlers/self.handler';
import userStatusHandler from './handlers/users-status.handler';
import tagsHandler from './handlers/tags.handler';
import levelsHandler from './handlers/levels.handler';
import usersHandler from './handlers/users.handler';
import taskTagsHandler from './handlers/taskTags.handler';
import taskDetailsHandler from './handlers/task-details.handler';

const handlers = [
    ...taskHandlers,
    ...selfHandler,
    ...userStatusHandler,
    ...tagsHandler,
    ...levelsHandler,
    ...usersHandler,
    ...taskTagsHandler,
    ...taskDetailsHandler,
];

export default handlers;
