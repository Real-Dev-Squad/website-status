import { store } from '@/app/store';
import TaskList from '@/components/tasks/TaskList/TaskList';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { screen } from '@testing-library/react';
import { TASK, tasks } from '../../../../__mocks__/db/tasks';
import { Provider } from 'react-redux';

describe('TaskList', function () {
    it('Should render TaskList', function () {
        renderWithRouter(
            <Provider store={store()}>
                <TaskList tasks={tasks} />
            </Provider>
        );

        const _tasks = screen.queryAllByText(TASK.title);

        expect(_tasks).toHaveLength(10);
        expect(_tasks[0]).toBeInTheDocument();
        expect(_tasks[0]).toHaveTextContent(TASK.title);
    });
});
