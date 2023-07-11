import taskHandlers from './handlers/tasks.handler';
import selfHandler from './handlers/self.handler';
import userStatusHandler from './handlers/users-status.handler';
import tagsHandler from './handlers/tags.handler';
import levelsHandler from './handlers/levels.handler';
import usersHandler from './handlers/users.handler';
import taskTagsHandler from './handlers/taskTags.handler';
import { taskDetailsHandler, taskDetailsUpdateHandler } from './handlers/task-details.handler';
import userHandler from './handlers/user.handler';
import issuesHandler from './handlers/issues.handler';
import { prsHandler } from './handlers/pull-requests.handler';

const handlers = [
    ...taskHandlers,
    ...selfHandler,
    ...userStatusHandler,
    ...tagsHandler,
    ...levelsHandler,
    ...usersHandler,
    ...taskTagsHandler,
    ...taskDetailsHandler,
    ...taskDetailsUpdateHandler,
    ...userHandler,
    ...issuesHandler,
    ...prsHandler,
];

export default handlers;
