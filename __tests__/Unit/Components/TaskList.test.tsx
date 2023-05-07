import { store } from '@/app/store';
import TaskList from '@/components/tasks/TaskList/TaskList';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { screen, fireEvent } from '@testing-library/react';
import { TASK, tasks } from '../../../__mocks__/db/tasks';
import { Provider } from 'react-redux';

describe('TaskList', function () {
    it('Should render TaskList', function () {
        renderWithRouter(
            <Provider store={store()}>
                <TaskList tasks={tasks} updateTask={jest.fn()} />
            </Provider>
        );

        const _tasks = screen.queryAllByText(TASK.title);

        expect(_tasks).toHaveLength(10);
        expect(_tasks[0]).toBeInTheDocument();
        expect(_tasks[0]).toHaveTextContent(TASK.title);
    });

    it('Should render see more button', function () {
        renderWithRouter(
            <Provider store={store()}>
                <TaskList
                    tasks={tasks}
                    hasLimit={true}
                    updateTask={jest.fn()}
                />
            </Provider>
        );

        const seeMore = screen.getByRole('button', { name: /see more/i });

        expect(seeMore).toBeInTheDocument();
    });

    it('Should render 3 tasks intially and then render more 5 tasks after click event', function () {
        renderWithRouter(
            <Provider store={store()}>
                <TaskList
                    tasks={tasks}
                    hasLimit={true}
                    updateTask={jest.fn()}
                />
            </Provider>
        );

        const _tasks = screen.queryAllByText(TASK.title);
        const seeMore = screen.getByRole('button', { name: /see more/i });

        expect(_tasks).toHaveLength(3);
        fireEvent.click(seeMore);
        expect(screen.queryAllByText(TASK.title)).toHaveLength(8);
    });

    it('Should not render see more button after all tasks are loaded and rendered', function () {
        renderWithRouter(
            <Provider store={store()}>
                <TaskList
                    tasks={tasks}
                    hasLimit={true}
                    updateTask={jest.fn()}
                />
            </Provider>
        );

        const _tasks = screen.queryAllByText(TASK.title);
        const seeMore = screen.getByRole('button', { name: /see more/i });

        expect(_tasks).toHaveLength(3);
        fireEvent.click(seeMore);
        fireEvent.click(seeMore);
        expect(screen.queryAllByText(TASK.title)).toHaveLength(10);
        expect(seeMore).not.toBeInTheDocument();
    });
});
